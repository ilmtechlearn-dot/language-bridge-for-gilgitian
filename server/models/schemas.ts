import mongoose, { Schema, Document } from 'mongoose';

// User Schema
export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  city?: string;
  role: 'user' | 'admin';
  favourites: string[];
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  city: { type: String, default: 'Gilgit' },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  favourites: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

// Phrase Schema
export interface IPhraseTranslations {
  urdu: string;
  english: string;
  shina: string;
  balti: string;
  burushaski: string;
}

export interface IPhrasePronunciations {
  urdu?: string;
  english?: string;
  shina?: string;
  balti?: string;
  burushaski?: string;
}

export interface IPhrase extends Document {
  sourceText: string;
  sourceLanguage: string;
  targetLanguage?: string;
  translatedText?: string;
  romanizedTranslation?: string;
  translations: IPhraseTranslations;
  category: string;
  pronunciationText?: string;
  pronunciations?: IPhrasePronunciations;
  verified: boolean;
  approvedBy?: string;
  createdBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PhraseSchema = new Schema<IPhrase>({
  sourceText: { type: String, required: true, index: true },
  sourceLanguage: { type: String, default: 'english' },
  targetLanguage: { type: String },
  translatedText: { type: String },
  romanizedTranslation: { type: String, default: '' },
  translations: {
    urdu: { type: String, default: '' },
    english: { type: String, default: '' },
    shina: { type: String, default: '' },
    balti: { type: String, default: '' },
    burushaski: { type: String, default: '' },
  },
  category: {
    type: String,
    default: 'Daily conversation',
    index: true,
  },
  pronunciationText: { type: String, default: '' },
  pronunciations: {
    urdu: { type: String, default: '' },
    english: { type: String, default: '' },
    shina: { type: String, default: '' },
    balti: { type: String, default: '' },
    burushaski: { type: String, default: '' },
  },
  verified: { type: Boolean, default: true, index: true },
  approvedBy: { type: String, default: '' },
  createdBy: { type: String, default: 'System' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// AI Translation Logs Schema
export interface IAiTranslationLog extends Document {
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
  createdAt: Date;
}

const AiTranslationLogSchema = new Schema<IAiTranslationLog>({
  userId: { type: String },
  sourceText: { type: String, required: true },
  sourceLanguage: { type: String, required: true },
  targetLanguage: { type: String, required: true },
  translatedText: { type: String, required: true },
  romanizedTranslation: { type: String, default: '' },
  confidence: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' },
  status: { type: String, enum: ['translated', 'uncertain', 'unsupported'], default: 'translated' },
  notes: { type: String, default: '' },
  needsHumanReview: { type: Boolean, default: true },
  provider: { type: String, default: 'gemini' },
  createdAt: { type: Date, default: Date.now },
});

// Translation Feedback Schema
export interface ITranslationFeedback extends Document {
  translationLogId?: string;
  phraseId?: string;
  userId?: string;
  userName?: string;
  rating: 'accurate' | 'needs_correction';
  suggestedTranslation?: string;
  feedbackNote?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}

const TranslationFeedbackSchema = new Schema<ITranslationFeedback>({
  translationLogId: { type: String },
  phraseId: { type: String },
  userId: { type: String },
  userName: { type: String, default: 'Community Member' },
  rating: { type: String, enum: ['accurate', 'needs_correction'], required: true },
  suggestedTranslation: { type: String, default: '' },
  feedbackNote: { type: String, default: '' },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

// TranslationHistory Schema
export interface ITranslationHistory extends Document {
  user?: string;
  sourceText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  badge?: string;
  createdAt: Date;
}

const TranslationHistorySchema = new Schema<ITranslationHistory>({
  user: { type: String, default: 'Guest' },
  sourceText: { type: String, required: true },
  translatedText: { type: String, required: true },
  sourceLanguage: { type: String, required: true },
  targetLanguage: { type: String, required: true },
  badge: { type: String, default: 'Verified' },
  createdAt: { type: Date, default: Date.now },
});

// TranslationRequest Schema
export interface ITranslationRequest extends Document {
  requestedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  user?: string;
  userEmail?: string;
  status: 'pending' | 'approved' | 'rejected';
  adminNote?: string;
  createdAt: Date;
}

const TranslationRequestSchema = new Schema<ITranslationRequest>({
  requestedText: { type: String, required: true },
  sourceLanguage: { type: String, required: true },
  targetLanguage: { type: String, required: true },
  user: { type: String, default: 'Guest' },
  userEmail: { type: String, default: '' },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  adminNote: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

// TranslationReport Schema
export interface ITranslationReport extends Document {
  phrase?: string;
  originalPhrase: string;
  currentTranslation: string;
  sourceLanguage: string;
  targetLanguage: string;
  user?: string;
  issueDescription: string;
  status: 'pending' | 'reviewed' | 'resolved';
  createdAt: Date;
}

const TranslationReportSchema = new Schema<ITranslationReport>({
  phrase: { type: String },
  originalPhrase: { type: String, required: true },
  currentTranslation: { type: String, required: true },
  sourceLanguage: { type: String, required: true },
  targetLanguage: { type: String, required: true },
  user: { type: String, default: 'Guest' },
  issueDescription: { type: String, required: true },
  status: { type: String, enum: ['pending', 'reviewed', 'resolved'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

// Feedback Schema
export interface IFeedback extends Document {
  user: string;
  userEmail?: string;
  message: string;
  rating: number;
  createdAt: Date;
}

const FeedbackSchema = new Schema<IFeedback>({
  user: { type: String, required: true },
  userEmail: { type: String, default: '' },
  message: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  createdAt: { type: Date, default: Date.now },
});

// Compile models safe for hot reloading
export const UserModel = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export const PhraseModel = mongoose.models.Phrase || mongoose.model<IPhrase>('Phrase', PhraseSchema);
export const AiTranslationLogModel = mongoose.models.AiTranslationLog || mongoose.model<IAiTranslationLog>('AiTranslationLog', AiTranslationLogSchema);
export const TranslationFeedbackModel = mongoose.models.TranslationFeedback || mongoose.model<ITranslationFeedback>('TranslationFeedback', TranslationFeedbackSchema);
export const TranslationHistoryModel = mongoose.models.TranslationHistory || mongoose.model<ITranslationHistory>('TranslationHistory', TranslationHistorySchema);
export const TranslationRequestModel = mongoose.models.TranslationRequest || mongoose.model<ITranslationRequest>('TranslationRequest', TranslationRequestSchema);
export const TranslationReportModel = mongoose.models.TranslationReport || mongoose.model<ITranslationReport>('TranslationReport', TranslationReportSchema);
export const FeedbackModel = mongoose.models.Feedback || mongoose.model<IFeedback>('Feedback', FeedbackSchema);
