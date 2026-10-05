export type LanguageKey = 'english' | 'urdu' | 'shina' | 'balti' | 'burushaski';

export interface LanguageInfo {
  key: LanguageKey;
  name: string;
  nativeName: string;
  region: string;
  family: string;
  isRTL: boolean;
  script: string;
}

export const LANGUAGES: LanguageInfo[] = [
  {
    key: 'english',
    name: 'English',
    nativeName: 'English',
    region: 'International & Administrative',
    family: 'Indo-European (Germanic)',
    isRTL: false,
    script: 'Latin'
  },
  {
    key: 'urdu',
    name: 'Urdu',
    nativeName: 'اردو',
    region: 'National Language / Northern Pakistan',
    family: 'Indo-Aryan',
    isRTL: true,
    script: 'Nastaliq'
  },
  {
    key: 'shina',
    name: 'Shina',
    nativeName: 'شینا',
    region: 'Gilgit, Diamer, Astore, Ghizer',
    family: 'Dardic (Indo-Aryan)',
    isRTL: true,
    script: 'Perso-Arabic (Shina)'
  },
  {
    key: 'balti',
    name: 'Balti',
    nativeName: 'بلتی',
    region: 'Skardu, Shigar, Kharmang, Ghanche',
    family: 'Tibetic (Sino-Tibetan)',
    isRTL: true,
    script: 'Perso-Arabic / Yige'
  },
  {
    key: 'burushaski',
    name: 'Burushaski',
    nativeName: 'بروشسکی',
    region: 'Hunza, Nagar, Yasin (Gilgit)',
    family: 'Language Isolate (Unique World Heritage)',
    isRTL: true,
    script: 'Perso-Arabic (Burushaski)'
  },
];

export interface PhraseTranslations {
  english: string;
  urdu: string;
  shina: string;
  balti: string;
  burushaski: string;
}

export interface PhrasePronunciations {
  english?: string;
  urdu?: string;
  shina?: string;
  balti?: string;
  burushaski?: string;
}

export interface Phrase {
  _id: string;
  id?: string;
  sourceText: string;
  sourceLanguage: string;
  targetLanguage?: string;
  translatedText?: string;
  romanizedTranslation?: string;
  translations: PhraseTranslations;
  category: string;
  pronunciations?: PhrasePronunciations;
  pronunciationText?: string;
  verified: boolean;
  approvedBy?: string;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type BadgeType = 'verified' | 'ai-high' | 'ai-review' | 'unavailable';

export interface SimilarPhraseItem {
  id: string;
  sourceText: string;
  sourceValue: string;
  targetValue: string;
  category: string;
  pronunciation?: string;
  similarity: number;
}

export interface TranslationResult {
  source?: 'dictionary' | 'ai';
  found: boolean;
  sourceText?: string;
  sourceLanguage?: string;
  targetLanguage?: string;
  translatedText?: string;
  romanized_translation?: string;
  pronunciation?: string;
  category?: string;
  phraseId?: string;
  phrase?: Phrase;
  verified?: boolean;
  confidence?: 'high' | 'medium' | 'low';
  badge?: string;
  badgeType?: BadgeType;
  notes?: string;
  needs_human_review?: boolean;
  provider?: 'gemini' | 'openai';
  logId?: string;
  remainingAiQuota?: number;
  hasSimilar?: boolean;
  hasHighSimilarity?: boolean;
  similarPhrases?: SimilarPhraseItem[];
  canTranslateAI?: boolean;
  message?: string;
}

export interface User {
  id: string;
  _id?: string;
  name: string;
  email: string;
  city?: string;
  role: 'user' | 'admin';
  favourites?: string[];
  createdAt?: string;
}

export interface TranslationHistoryItem {
  _id: string;
  user: string;
  sourceText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  badge?: string;
  createdAt: string;
}

export interface AiTranslationLogItem {
  _id: string;
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
  createdAt: string;
}

export interface TranslationFeedbackItem {
  _id: string;
  translationLogId?: string;
  phraseId?: string;
  userId?: string;
  userName?: string;
  rating: 'accurate' | 'needs_correction';
  suggestedTranslation?: string;
  feedbackNote?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface TranslationRequestItem {
  _id: string;
  requestedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  user: string;
  userEmail?: string;
  status: 'pending' | 'approved' | 'rejected';
  adminNote?: string;
  createdAt: string;
}

export interface TranslationReportItem {
  _id: string;
  phrase?: string;
  originalPhrase: string;
  currentTranslation: string;
  sourceLanguage: string;
  targetLanguage: string;
  user: string;
  issueDescription: string;
  status: 'pending' | 'reviewed' | 'resolved';
  createdAt: string;
}

export interface FeedbackItem {
  _id: string;
  user: string;
  userEmail?: string;
  message: string;
  rating: number;
  createdAt: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalPhrases: number;
  totalTranslations: number;
  pendingRequests: number;
  pendingReports: number;
  pendingAiLogs?: number;
  pendingFeedback?: number;
  recentActivity: TranslationHistoryItem[];
  recentAiLogs?: AiTranslationLogItem[];
  recentFeedback?: TranslationFeedbackItem[];
  categoryDistribution: Record<string, number>;
}
