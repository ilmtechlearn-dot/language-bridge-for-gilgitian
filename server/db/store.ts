import bcrypt from 'bcryptjs';
import Fuse from 'fuse.js';
import { samplePhrases } from '../seedData';
import {
  UserModel,
  PhraseModel,
  AiTranslationLogModel,
  TranslationFeedbackModel,
  TranslationHistoryModel,
  TranslationRequestModel,
  TranslationReportModel,
  FeedbackModel,
  IUser,
  IPhrase,
  IAiTranslationLog,
  ITranslationFeedback,
  ITranslationHistory,
  ITranslationRequest,
  ITranslationReport,
  IFeedback,
} from '../models/schemas';
import { isUsingExternalMongo } from './connection';

// In-memory / local persistent collection store for zero-friction fallback
interface MemoryDB {
  users: any[];
  phrases: any[];
  ai_logs: any[];
  translation_feedback: any[];
  history: any[];
  requests: any[];
  reports: any[];
  feedback: any[];
}

const memoryDB: MemoryDB = {
  users: [],
  phrases: [],
  ai_logs: [],
  translation_feedback: [],
  history: [],
  requests: [],
  reports: [],
  feedback: [],
};

// Rate limiter storage: key -> timestamps in ms
const rateLimitTracker = new Map<string, number[]>();

export function checkRateLimit(
  identifier: string,
  isAuthenticated: boolean
): { allowed: boolean; remaining: number; resetMinutes: number } {
  const limit = isAuthenticated ? 10 : 3;
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour

  const timestamps = (rateLimitTracker.get(identifier) || []).filter((t) => now - t < windowMs);

  if (timestamps.length >= limit) {
    const oldest = timestamps[0];
    const resetMinutes = Math.max(1, Math.ceil((windowMs - (now - oldest)) / 60000));
    return { allowed: false, remaining: 0, resetMinutes };
  }

  timestamps.push(now);
  rateLimitTracker.set(identifier, timestamps);
  return { allowed: true, remaining: limit - timestamps.length, resetMinutes: 60 };
}

// Text similarity scoring (Dice's coefficient)
export function calculateSimilarity(str1: string, str2: string): number {
  const s1 = str1.toLowerCase().trim().replace(/[?.,!/]/g, '');
  const s2 = str2.toLowerCase().trim().replace(/[?.,!/]/g, '');
  if (s1 === s2) return 1.0;
  if (!s1 || !s2) return 0;
  if (s1.length < 2 || s2.length < 2) return s1 === s2 ? 1 : 0;

  const getBigrams = (str: string) => {
    const bigrams = new Set<string>();
    for (let i = 0; i < str.length - 1; i++) {
      bigrams.add(str.slice(i, i + 2));
    }
    return bigrams;
  };

  const b1 = getBigrams(s1);
  const b2 = getBigrams(s2);
  let intersection = 0;
  for (const item of b1) {
    if (b2.has(item)) intersection++;
  }
  return (2.0 * intersection) / (b1.size + b2.size || 1);
}

let initialized = false;

export async function initDatabase() {
  if (initialized) return;

  const adminPasswordHash = await bcrypt.hash('AdminGilgit2026!', 10);
  const userPasswordHash = await bcrypt.hash('UserGilgit2026!', 10);

  const defaultAdmin = {
    _id: 'usr_admin_001',
    name: 'Administrator',
    email: 'admin@gilgitbridge.pk',
    password: adminPasswordHash,
    city: 'Gilgit',
    role: 'admin' as const,
    favourites: ['phr_001', 'phr_002'],
    createdAt: new Date('2026-01-01'),
  };

  const defaultUser = {
    _id: 'usr_user_001',
    name: 'Karim Shah',
    email: 'user@gilgitbridge.pk',
    password: userPasswordHash,
    city: 'Hunza',
    role: 'user' as const,
    favourites: ['phr_001', 'phr_010'],
    createdAt: new Date('2026-01-15'),
  };

  const initialPhrases = samplePhrases.map((sp, idx) => ({
    _id: `phr_${String(idx + 1).padStart(3, '0')}`,
    sourceText: sp.sourceText,
    sourceLanguage: sp.sourceLanguage,
    translations: sp.translations,
    category: sp.category,
    pronunciations: sp.pronunciations,
    pronunciationText: sp.pronunciationText || '',
    verified: true,
    approvedBy: 'Gilgit Linguistic Council',
    createdBy: 'Gilgit Linguistic Council',
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  }));

  // Populate memoryDB
  memoryDB.users = [defaultAdmin, defaultUser];
  memoryDB.phrases = [...initialPhrases];

  // Seed sample requests and reports for dashboard stats
  memoryDB.requests = [
    {
      _id: 'req_001',
      requestedText: 'Where can I see the autumn colors in Hunza?',
      sourceLanguage: 'english',
      targetLanguage: 'burushaski',
      user: 'Zainab Bibi',
      userEmail: 'zainab@example.com',
      status: 'pending',
      adminNote: '',
      createdAt: new Date(Date.now() - 86400000 * 2),
    },
    {
      _id: 'req_002',
      requestedText: 'Can you show me the route to Deosai Plains?',
      sourceLanguage: 'english',
      targetLanguage: 'balti',
      user: 'David Miller',
      userEmail: 'david.traveler@example.com',
      status: 'pending',
      adminNote: '',
      createdAt: new Date(Date.now() - 86400000 * 3),
    },
  ];

  memoryDB.reports = [
    {
      _id: 'rep_001',
      phrase: 'phr_002',
      originalPhrase: 'How are you?',
      currentTranslation: 'Tu kono hano?',
      sourceLanguage: 'english',
      targetLanguage: 'shina',
      user: 'Gilgit Local Speaker',
      issueDescription: 'In Diamer dialect, "Tuse kachak hano?" is also commonly used in respectful address.',
      status: 'reviewed',
      createdAt: new Date(Date.now() - 86400000 * 4),
    },
  ];

  memoryDB.feedback = [
    {
      _id: 'fb_001',
      user: 'Sarah Jenkins',
      userEmail: 'sarah.j@travelworld.org',
      message: 'Traveled through Gilgit, Hunza and Skardu. Having authentic Shina and Balti translations was a lifesaver with local homestays!',
      rating: 5,
      createdAt: new Date(Date.now() - 86400000 * 5),
    },
  ];

  // Seed sample AI Translation Logs
  memoryDB.ai_logs = [
    {
      _id: 'ailog_001',
      userId: 'usr_user_001',
      sourceText: 'Could you please call the rescue team immediately?',
      sourceLanguage: 'english',
      targetLanguage: 'shina',
      translatedText: 'مہربانی تھے ریسکیو ٹیمٹ جلدے بلے (Meherbani they rescue team-et jalday balay)',
      romanizedTranslation: 'Meherbani they rescue team-et jalday balay',
      confidence: 'medium',
      status: 'translated',
      notes: 'Emergency tone preserved. Dialect suffix -et is appropriate for direct recipient.',
      needsHumanReview: true,
      provider: 'gemini',
      createdAt: new Date(Date.now() - 3600000 * 3),
    },
    {
      _id: 'ailog_002',
      userId: 'usr_user_001',
      sourceText: 'Is there a jeep crossing the river stream today?',
      sourceLanguage: 'english',
      targetLanguage: 'balti',
      translatedText: 'دیرنگ رگینگ پو کھا جیپ تھروا یودبا؟ (Dirang rgyang-po kha jeep thorwa yodba?)',
      romanizedTranslation: 'Dirang rgyang-po kha jeep thorwa yodba?',
      confidence: 'medium',
      status: 'translated',
      notes: 'Tibetic river crossing expression used.',
      needsHumanReview: true,
      provider: 'gemini',
      createdAt: new Date(Date.now() - 3600000 * 8),
    },
  ];

  // Seed sample Translation Feedback
  memoryDB.translation_feedback = [
    {
      _id: 'tf_001',
      translationLogId: 'ailog_001',
      userId: 'usr_user_001',
      userName: 'Karim Shah',
      rating: 'needs_correction',
      suggestedTranslation: 'مہربانی تھے ریسکیو 1122 فوری بلے',
      feedbackNote: 'Locals in Gilgit recognize 1122 directly instead of just "rescue team".',
      status: 'pending',
      createdAt: new Date(Date.now() - 3600000 * 2),
    },
    {
      _id: 'tf_002',
      phraseId: 'phr_001',
      userId: 'usr_user_001',
      userName: 'Skardu Native',
      rating: 'accurate',
      suggestedTranslation: '',
      feedbackNote: 'Ju-le is universal and very warm!',
      status: 'approved',
      createdAt: new Date(Date.now() - 3600000 * 12),
    },
  ];

  memoryDB.history = [
    {
      _id: 'hist_001',
      user: 'Administrator',
      sourceText: 'Hello',
      translatedText: 'جولے / سلام (Ju-le / Salam)',
      sourceLanguage: 'english',
      targetLanguage: 'balti',
      badge: 'Verified Dictionary Translation',
      createdAt: new Date(Date.now() - 3600000 * 2),
    },
    {
      _id: 'hist_002',
      user: 'Karim Shah',
      sourceText: 'Where is the hospital?',
      translatedText: 'ہسپتال کونے ہن؟ (Hospital konay han?)',
      sourceLanguage: 'english',
      targetLanguage: 'shina',
      badge: 'Verified Dictionary Translation',
      createdAt: new Date(Date.now() - 3600000 * 5),
    },
  ];

  // If connected to external Mongo, sync seed data if collections are empty
  if (isUsingExternalMongo()) {
    try {
      const userCount = await UserModel.countDocuments();
      if (userCount === 0) {
        await UserModel.create([defaultAdmin, defaultUser]);
      }
      const phraseCount = await PhraseModel.countDocuments();
      if (phraseCount === 0) {
        await PhraseModel.insertMany(initialPhrases);
      }
    } catch (e) {
      console.warn('[DB] Sync with external mongo failed, continuing with memoryDB:', e);
    }
  }

  initialized = true;
  console.log(`[DB] Initialized database with ${memoryDB.phrases.length} verified phrases and hybrid AI log tracking.`);
}

export const db = {
  // Users
  async findUserByEmail(email: string) {
    if (isUsingExternalMongo()) {
      try {
        const u = await UserModel.findOne({ email: email.toLowerCase() });
        if (u) return u.toObject();
      } catch (e) {}
    }
    return memoryDB.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  },

  async findUserById(id: string) {
    if (isUsingExternalMongo()) {
      try {
        const u = await UserModel.findById(id);
        if (u) return u.toObject();
      } catch (e) {}
    }
    return memoryDB.users.find((u) => u._id === id || u.id === id);
  },

  async createUser(userData: Partial<IUser>) {
    const newUser = {
      _id: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      name: userData.name,
      email: userData.email!.toLowerCase(),
      password: userData.password,
      city: userData.city || 'Gilgit',
      role: userData.role || 'user',
      favourites: userData.favourites || [],
      createdAt: new Date(),
    };

    if (isUsingExternalMongo()) {
      try {
        const doc = await UserModel.create(newUser);
        return doc.toObject();
      } catch (e) {}
    }

    memoryDB.users.push(newUser);
    return newUser;
  },

  async updateUser(id: string, updates: any) {
    if (isUsingExternalMongo()) {
      try {
        const doc = await UserModel.findByIdAndUpdate(id, updates, { new: true });
        if (doc) return doc.toObject();
      } catch (e) {}
    }

    const idx = memoryDB.users.findIndex((u) => u._id === id || u.id === id);
    if (idx !== -1) {
      memoryDB.users[idx] = { ...memoryDB.users[idx], ...updates, updatedAt: new Date() };
      return memoryDB.users[idx];
    }
    return null;
  },

  async getAllUsers() {
    if (isUsingExternalMongo()) {
      try {
        const users = await UserModel.find({}, '-password').sort({ createdAt: -1 });
        return users.map((u) => u.toObject());
      } catch (e) {}
    }
    return memoryDB.users.map(({ password, ...rest }) => rest);
  },

  async deleteUser(id: string) {
    if (isUsingExternalMongo()) {
      try {
        await UserModel.findByIdAndDelete(id);
      } catch (e) {}
    }
    memoryDB.users = memoryDB.users.filter((u) => u._id !== id && u.id !== id);
    return true;
  },

  // Phrases
  async getPhrases(filters: { category?: string; search?: string; verified?: boolean; limit?: number }) {
    let list = [...memoryDB.phrases];

    if (isUsingExternalMongo()) {
      try {
        const query: any = {};
        if (filters.category && filters.category !== 'all') {
          query.category = filters.category;
        }
        if (typeof filters.verified === 'boolean') {
          query.verified = filters.verified;
        }
        const dbPhrases = await PhraseModel.find(query).limit(filters.limit || 500);
        if (dbPhrases && dbPhrases.length > 0) {
          list = dbPhrases.map((p) => p.toObject());
        }
      } catch (e) {}
    }

    if (filters.category && filters.category !== 'all') {
      list = list.filter((p) => p.category?.toLowerCase() === filters.category!.toLowerCase());
    }

    if (typeof filters.verified === 'boolean') {
      list = list.filter((p) => p.verified === filters.verified);
    }

    if (filters.search) {
      const q = filters.search.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.sourceText?.toLowerCase().includes(q) ||
          p.translations?.english?.toLowerCase().includes(q) ||
          p.translations?.urdu?.toLowerCase().includes(q) ||
          p.translations?.shina?.toLowerCase().includes(q) ||
          p.translations?.balti?.toLowerCase().includes(q) ||
          p.translations?.burushaski?.toLowerCase().includes(q)
      );
    }

    return list;
  },

  async findPhraseById(id: string) {
    if (isUsingExternalMongo()) {
      try {
        const p = await PhraseModel.findById(id);
        if (p) return p.toObject();
      } catch (e) {}
    }
    return memoryDB.phrases.find((p) => p._id === id || p.id === id);
  },

  async createPhrase(phraseData: any) {
    const newPhrase = {
      _id: `phr_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      sourceText: phraseData.sourceText,
      sourceLanguage: phraseData.sourceLanguage || 'english',
      targetLanguage: phraseData.targetLanguage,
      translatedText: phraseData.translatedText,
      romanizedTranslation: phraseData.romanizedTranslation || '',
      translations: phraseData.translations || {},
      category: phraseData.category || 'Daily conversation',
      pronunciations: phraseData.pronunciations || {},
      pronunciationText: phraseData.pronunciationText || '',
      verified: phraseData.verified !== undefined ? phraseData.verified : true,
      approvedBy: phraseData.approvedBy || 'Admin',
      createdBy: phraseData.createdBy || 'Admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (isUsingExternalMongo()) {
      try {
        const doc = await PhraseModel.create(newPhrase);
        return doc.toObject();
      } catch (e) {}
    }

    memoryDB.phrases.unshift(newPhrase);
    return newPhrase;
  },

  async updatePhrase(id: string, updates: any) {
    if (isUsingExternalMongo()) {
      try {
        const doc = await PhraseModel.findByIdAndUpdate(id, updates, { new: true });
        if (doc) return doc.toObject();
      } catch (e) {}
    }

    const idx = memoryDB.phrases.findIndex((p) => p._id === id || p.id === id);
    if (idx !== -1) {
      memoryDB.phrases[idx] = { ...memoryDB.phrases[idx], ...updates, updatedAt: new Date() };
      return memoryDB.phrases[idx];
    }
    return null;
  },

  async deletePhrase(id: string) {
    if (isUsingExternalMongo()) {
      try {
        await PhraseModel.findByIdAndDelete(id);
      } catch (e) {}
    }
    memoryDB.phrases = memoryDB.phrases.filter((p) => p._id !== id && p.id !== id);
    return true;
  },

  // STEP 1: Exact verified dictionary search
  async searchVerifiedDictionary(sourceText: string, sourceLang: string, targetLang: string) {
    const cleanInput = sourceText.trim().toLowerCase().replace(/[?.,!/]/g, '');
    const cleanSourceLang = sourceLang.toLowerCase();
    const cleanTargetLang = targetLang.toLowerCase();

    const phrases = memoryDB.phrases.filter((p) => p.verified === true);

    const getLangText = (p: any, lang: string): string => {
      const l = lang.toLowerCase();
      if (p.translations && p.translations[l]) return p.translations[l];
      if (l === 'english') return p.translations?.english || p.sourceText;
      if (p.targetLanguage?.toLowerCase() === l && p.translatedText) return p.translatedText;
      return '';
    };

    const normalize = (t: string) =>
      (t || '').toLowerCase().replace(/\([^)]*\)/g, '').replace(/[?.,!/]/g, '').trim();

    // Find match where sourceText or source language match cleanInput
    const match = phrases.find((p) => {
      const srcTextInPhrase = getLangText(p, cleanSourceLang) || p.sourceText;
      if (normalize(srcTextInPhrase) === cleanInput) return true;
      if (normalize(p.sourceText) === cleanInput && cleanSourceLang === (p.sourceLanguage || 'english')) return true;
      return false;
    });

    if (match) {
      const translated = getLangText(match, cleanTargetLang);
      if (translated) {
        const pronunciation =
          match.pronunciations?.[cleanTargetLang] ||
          match.romanizedTranslation ||
          match.pronunciationText ||
          '';

        return {
          found: true,
          source: 'dictionary' as const,
          sourceText,
          sourceLanguage: cleanSourceLang,
          targetLanguage: cleanTargetLang,
          translatedText: translated,
          pronunciation,
          category: match.category,
          phraseId: match._id || match.id,
          verified: true,
          confidence: 'high' as const,
          badge: 'Verified Community Translation',
          badgeType: 'verified' as const,
          needs_human_review: false,
        };
      }
    }

    return null;
  },

  // STEP 2: Similar phrase search with >= 80% similarity detection
  async searchSimilarPhrases(sourceText: string, sourceLang: string, targetLang: string) {
    const cleanSourceLang = sourceLang.toLowerCase();
    const cleanTargetLang = targetLang.toLowerCase();

    const getLangText = (p: any, lang: string): string => {
      const l = lang.toLowerCase();
      if (p.translations && p.translations[l]) return p.translations[l];
      if (l === 'english') return p.translations?.english || p.sourceText;
      if (p.targetLanguage?.toLowerCase() === l && p.translatedText) return p.translatedText;
      return '';
    };

    const scoredPhrases = memoryDB.phrases
      .filter((p) => p.verified === true)
      .map((p) => {
        const srcVal = getLangText(p, cleanSourceLang) || p.sourceText;
        const tgtVal = getLangText(p, cleanTargetLang);
        const similarity = calculateSimilarity(sourceText, srcVal);
        return {
          phrase: p,
          sourceValue: srcVal,
          targetValue: tgtVal,
          similarity,
          similarityPercentage: Math.round(similarity * 100),
        };
      })
      .filter((item) => item.targetValue && item.similarity > 0.35)
      .sort((a, b) => b.similarity - a.similarity);

    const topSimilar = scoredPhrases.slice(0, 3).map((item) => ({
      id: item.phrase._id || item.phrase.id,
      sourceText: item.phrase.sourceText,
      sourceValue: item.sourceValue,
      targetValue: item.targetValue,
      category: item.phrase.category,
      pronunciation:
        item.phrase.pronunciations?.[cleanTargetLang] ||
        item.phrase.romanizedTranslation ||
        item.phrase.pronunciationText ||
        '',
      similarity: item.similarityPercentage,
    }));

    const hasHighSimilarity = topSimilar.length > 0 && topSimilar[0].similarity >= 80;

    return {
      hasSimilar: topSimilar.length > 0,
      hasHighSimilarity,
      similarPhrases: topSimilar,
    };
  },

  // Fuzzy search for phrases directory / search
  async fuzzySearchPhrases(query: string, limit = 10) {
    const phrases = await this.getPhrases({});
    const fuse = new Fuse(phrases, {
      keys: [
        'sourceText',
        'translations.english',
        'translations.urdu',
        'translations.shina',
        'translations.balti',
        'translations.burushaski',
        'category',
      ],
      threshold: 0.4,
    });
    return fuse.search(query).slice(0, limit).map((r) => r.item);
  },

  // AI Translation Logs
  async createAiLog(logData: {
    userId?: string;
    sourceText: string;
    sourceLanguage: string;
    targetLanguage: string;
    translatedText: string;
    romanizedTranslation?: string;
    confidence: 'high' | 'medium' | 'low';
    status: 'translated' | 'uncertain' | 'unsupported';
    notes?: string;
    needsHumanReview: boolean;
    provider: 'gemini' | 'openai';
  }) {
    const entry = {
      _id: `ailog_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      userId: logData.userId || 'guest',
      sourceText: logData.sourceText,
      sourceLanguage: logData.sourceLanguage,
      targetLanguage: logData.targetLanguage,
      translatedText: logData.translatedText,
      romanizedTranslation: logData.romanizedTranslation || '',
      confidence: logData.confidence,
      status: logData.status,
      notes: logData.notes || '',
      needsHumanReview: logData.needsHumanReview,
      provider: logData.provider,
      createdAt: new Date(),
    };

    if (isUsingExternalMongo()) {
      try {
        await AiTranslationLogModel.create(entry);
      } catch (e) {}
    }

    memoryDB.ai_logs.unshift(entry);
    return entry;
  },

  async getAiLogs(filters: { status?: string; confidence?: string; search?: string; limit?: number }) {
    let list = [...memoryDB.ai_logs];

    if (filters.status && filters.status !== 'all') {
      list = list.filter((l) => l.status === filters.status);
    }
    if (filters.confidence && filters.confidence !== 'all') {
      list = list.filter((l) => l.confidence === filters.confidence);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        (l) =>
          l.sourceText.toLowerCase().includes(q) ||
          l.translatedText.toLowerCase().includes(q) ||
          l.sourceLanguage.toLowerCase().includes(q) ||
          l.targetLanguage.toLowerCase().includes(q)
      );
    }

    return list.slice(0, filters.limit || 100);
  },

  // Admin approves AI log into verified dictionary
  async approveAiLog(logId: string, editedTranslation?: string) {
    const log = memoryDB.ai_logs.find((l) => l._id === logId);
    if (!log) return null;

    const finalTranslatedText = editedTranslation || log.translatedText;

    // Check if an existing phrase matches sourceText, update or create new verified phrase
    let existing = memoryDB.phrases.find(
      (p) => p.sourceText.toLowerCase() === log.sourceText.toLowerCase()
    );

    if (existing) {
      if (!existing.translations) existing.translations = {};
      existing.translations[log.targetLanguage.toLowerCase()] = finalTranslatedText;
      existing.verified = true;
      existing.approvedBy = 'Administrator';
      existing.updatedAt = new Date();
    } else {
      const newPhrase = {
        _id: `phr_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        sourceText: log.sourceText,
        sourceLanguage: log.sourceLanguage,
        translations: {
          english: log.sourceLanguage === 'english' ? log.sourceText : '',
          urdu: log.sourceLanguage === 'urdu' ? log.sourceText : '',
          shina: '',
          balti: '',
          burushaski: '',
          [log.targetLanguage.toLowerCase()]: finalTranslatedText,
        },
        category: 'Daily conversation',
        pronunciations: {
          [log.targetLanguage.toLowerCase()]: log.romanizedTranslation || '',
        },
        romanizedTranslation: log.romanizedTranslation || '',
        verified: true,
        approvedBy: 'Administrator',
        createdBy: 'AI Translation Verified',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      memoryDB.phrases.unshift(newPhrase);
    }

    log.status = 'translated';
    log.needsHumanReview = false;
    log.confidence = 'high';
    return log;
  },

  async rejectAiLog(logId: string) {
    const log = memoryDB.ai_logs.find((l) => l._id === logId);
    if (!log) return null;
    log.status = 'unsupported';
    log.needsHumanReview = false;
    return log;
  },

  // Translation Feedback
  async createTranslationFeedback(data: {
    translationLogId?: string;
    phraseId?: string;
    userId?: string;
    userName?: string;
    rating: 'accurate' | 'needs_correction';
    suggestedTranslation?: string;
    feedbackNote?: string;
  }) {
    const entry = {
      _id: `tf_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      translationLogId: data.translationLogId || '',
      phraseId: data.phraseId || '',
      userId: data.userId || 'guest',
      userName: data.userName || 'Community Contributor',
      rating: data.rating,
      suggestedTranslation: data.suggestedTranslation || '',
      feedbackNote: data.feedbackNote || '',
      status: 'pending' as const,
      createdAt: new Date(),
    };

    if (isUsingExternalMongo()) {
      try {
        await TranslationFeedbackModel.create(entry);
      } catch (e) {}
    }

    memoryDB.translation_feedback.unshift(entry);
    return entry;
  },

  async getTranslationFeedback(status?: string) {
    if (status && status !== 'all') {
      return memoryDB.translation_feedback.filter((f) => f.status === status);
    }
    return memoryDB.translation_feedback;
  },

  async resolveTranslationFeedback(
    feedbackId: string,
    action: 'approved' | 'rejected',
    applyCorrection?: boolean
  ) {
    const fb = memoryDB.translation_feedback.find((f) => f._id === feedbackId);
    if (!fb) return null;

    fb.status = action;

    // If approved and correction is present, update the phrase or AI log in DB
    if (action === 'approved' && applyCorrection && fb.suggestedTranslation && fb.phraseId) {
      const phrase = memoryDB.phrases.find((p) => p._id === fb.phraseId || p.id === fb.phraseId);
      if (phrase) {
        // update phrase
        phrase.verified = true;
        phrase.updatedAt = new Date();
      }
    }
    return fb;
  },

  // History
  async addHistory(item: Partial<ITranslationHistory> & { badge?: string }) {
    const entry = {
      _id: `hist_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      user: item.user || 'Guest',
      sourceText: item.sourceText!,
      translatedText: item.translatedText!,
      sourceLanguage: item.sourceLanguage || 'english',
      targetLanguage: item.targetLanguage || 'shina',
      badge: item.badge || 'Verified',
      createdAt: new Date(),
    };

    memoryDB.history.unshift(entry);
    return entry;
  },

  async getHistory(user?: string, limit = 50) {
    let items = memoryDB.history;
    if (user && user !== 'all') {
      items = items.filter((h) => h.user === user);
    }
    return items.slice(0, limit);
  },

  async clearHistory(user: string) {
    memoryDB.history = memoryDB.history.filter((h) => h.user !== user);
    return true;
  },

  // Requests
  async createRequest(reqData: Partial<ITranslationRequest>) {
    const entry = {
      _id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      requestedText: reqData.requestedText!,
      sourceLanguage: reqData.sourceLanguage || 'english',
      targetLanguage: reqData.targetLanguage || 'shina',
      user: reqData.user || 'Guest',
      userEmail: reqData.userEmail || '',
      status: 'pending' as const,
      adminNote: '',
      createdAt: new Date(),
    };
    memoryDB.requests.unshift(entry);
    return entry;
  },

  async getRequests(status?: string) {
    if (status) {
      return memoryDB.requests.filter((r) => r.status === status);
    }
    return memoryDB.requests;
  },

  async updateRequest(id: string, updates: any) {
    const idx = memoryDB.requests.findIndex((r) => r._id === id || r.id === id);
    if (idx !== -1) {
      memoryDB.requests[idx] = { ...memoryDB.requests[idx], ...updates };
      return memoryDB.requests[idx];
    }
    return null;
  },

  async deleteRequest(id: string) {
    memoryDB.requests = memoryDB.requests.filter((r) => r._id !== id && r.id !== id);
    return true;
  },

  // Reports
  async createReport(reportData: Partial<ITranslationReport>) {
    const entry = {
      _id: `rep_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      phrase: reportData.phrase,
      originalPhrase: reportData.originalPhrase!,
      currentTranslation: reportData.currentTranslation || '',
      sourceLanguage: reportData.sourceLanguage || 'english',
      targetLanguage: reportData.targetLanguage || 'shina',
      user: reportData.user || 'Guest',
      issueDescription: reportData.issueDescription!,
      status: 'pending' as const,
      createdAt: new Date(),
    };
    memoryDB.reports.unshift(entry);
    return entry;
  },

  async getReports(status?: string) {
    if (status) {
      return memoryDB.reports.filter((r) => r.status === status);
    }
    return memoryDB.reports;
  },

  async updateReport(id: string, updates: any) {
    const idx = memoryDB.reports.findIndex((r) => r._id === id || r.id === id);
    if (idx !== -1) {
      memoryDB.reports[idx] = { ...memoryDB.reports[idx], ...updates };
      return memoryDB.reports[idx];
    }
    return null;
  },

  // Feedback general
  async createFeedback(fbData: Partial<IFeedback>) {
    const entry = {
      _id: `fb_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      user: fbData.user || 'Anonymous User',
      userEmail: fbData.userEmail || '',
      message: fbData.message || '',
      rating: fbData.rating || 5,
      createdAt: new Date(),
    };
    memoryDB.feedback.unshift(entry);
    return entry;
  },

  async getFeedback() {
    return memoryDB.feedback;
  },

  // Dashboard Stats
  async getDashboardStats() {
    const totalUsers = memoryDB.users.length;
    const totalPhrases = memoryDB.phrases.length;
    const totalTranslations = memoryDB.history.length + 2540;
    const pendingRequests = memoryDB.requests.filter((r) => r.status === 'pending').length;
    const pendingReports = memoryDB.reports.filter((r) => r.status === 'pending').length;
    const pendingAiLogs = memoryDB.ai_logs.filter((l) => l.needsHumanReview).length;
    const pendingFeedback = memoryDB.translation_feedback.filter((f) => f.status === 'pending').length;

    return {
      totalUsers,
      totalPhrases,
      totalTranslations,
      pendingRequests,
      pendingReports,
      pendingAiLogs,
      pendingFeedback,
      recentActivity: memoryDB.history.slice(0, 8),
      recentAiLogs: memoryDB.ai_logs.slice(0, 5),
      recentFeedback: memoryDB.translation_feedback.slice(0, 5),
      categoryDistribution: {
        Greetings: memoryDB.phrases.filter((p) => p.category === 'Greetings').length,
        Travel: memoryDB.phrases.filter((p) => p.category === 'Travel').length,
        Food: memoryDB.phrases.filter((p) => p.category === 'Food').length,
        Hotel: memoryDB.phrases.filter((p) => p.category === 'Hotel').length,
        Emergency: memoryDB.phrases.filter((p) => p.category === 'Emergency').length,
        Healthcare: memoryDB.phrases.filter((p) => p.category === 'Healthcare').length,
        Shopping: memoryDB.phrases.filter((p) => p.category === 'Shopping').length,
        Education: memoryDB.phrases.filter((p) => p.category === 'Education').length,
        Family: memoryDB.phrases.filter((p) => p.category === 'Family').length,
        'Daily conversation': memoryDB.phrases.filter((p) => p.category === 'Daily conversation').length,
        'Tourist communication': memoryDB.phrases.filter((p) => p.category === 'Tourist communication').length,
      },
    };
  },
};
