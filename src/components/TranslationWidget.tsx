import React, { useState } from 'react';
import {
  ArrowLeftRight,
  Volume2,
  Copy,
  Bookmark,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle,
  Sparkles,
  Check,
  Search,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  Edit3,
  Bot,
  Info
} from 'lucide-react';
import { LANGUAGES, LanguageKey, TranslationResult } from '../types';
import { api, useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { speakPhrase } from '../utils/speech';
import { ReportModal } from './ReportModal';
import { RequestPhraseModal } from './RequestPhraseModal';
import { CorrectionModal } from './CorrectionModal';

interface TranslationWidgetProps {
  initialPhrase?: string;
  initialSource?: LanguageKey;
  initialTarget?: LanguageKey;
  compact?: boolean;
}

const COMMON_QUICK_PHRASES = [
  'How are you?',
  'Where is the hospital?',
  'I need help',
  'What is the price?',
  'Where is the bus stop?',
  'I need a hotel room',
  'Thank you very much',
  'Can you guide me?',
];

export const TranslationWidget: React.FC<TranslationWidgetProps> = ({
  initialPhrase = '',
  initialSource = 'english',
  initialTarget = 'shina',
  compact = false,
}) => {
  const [sourceLang, setSourceLang] = useState<LanguageKey>(initialSource);
  const [targetLang, setTargetLang] = useState<LanguageKey>(initialTarget);
  const [inputText, setInputText] = useState(initialPhrase);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<'accurate' | 'needs_correction' | null>(null);

  // Modals
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [correctionModalOpen, setCorrectionModalOpen] = useState(false);

  const { showToast } = useToast();
  const { toggleFavourite, favourites, isAuthenticated } = useAuth();

  const handleSwapLanguages = () => {
    const nextSource = targetLang;
    const nextTarget = sourceLang;
    setSourceLang(nextSource);
    setTargetLang(nextTarget);

    if (result?.translatedText) {
      setInputText(result.translatedText.replace(/\([^)]*\)/g, '').trim());
      setResult(null);
    }
  };

  const executeTranslation = async (textToTranslate?: string, forceAI = false) => {
    const text = (textToTranslate !== undefined ? textToTranslate : inputText).trim();

    if (!text) {
      showToast('Please enter text to translate.', 'info');
      return;
    }

    if (text.length > 500) {
      showToast('Text length exceeds maximum of 500 characters.', 'error');
      return;
    }

    setLoading(true);
    setFeedbackSubmitted(null);

    try {
      const res = await api.post('/api/translate', {
        sourceText: text,
        sourceLanguage: sourceLang,
        targetLanguage: targetLang,
        forceAI,
      });

      setResult(res.data);
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.error ||
        'Translation service is temporarily unavailable. This language pair needs a verified community translation.';
      showToast(errorMsg, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text?: string) => {
    const content = text || result?.translatedText;
    if (!content) return;

    navigator.clipboard.writeText(content);
    setCopied(true);
    showToast('Copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = (text?: string, langKey?: string, pronunciation?: string) => {
    const phrase = text || result?.translatedText;
    const l = langKey || targetLang;
    const pron = pronunciation || result?.pronunciation || result?.romanized_translation;
    if (!phrase) return;

    setSpeaking(true);
    speakPhrase(phrase, l, pron);
    setTimeout(() => setSpeaking(false), 1800);
  };

  const handleToggleFav = async () => {
    if (!result?.translatedText) return;

    if (!isAuthenticated) {
      showToast('Sign in to permanently sync saved phrases across devices.', 'info');
    }

    const phraseId = result.phraseId || `fav_${encodeURIComponent(result.sourceText || '')}`;
    const isFav = await toggleFavourite(phraseId);
    showToast(isFav ? 'Saved to favourites!' : 'Removed from favourites.', 'info');
  };

  // Feedback handler (Accurate / Needs correction)
  const handleFeedbackRating = async (rating: 'accurate' | 'needs_correction') => {
    if (rating === 'accurate') {
      try {
        await api.post('/api/feedback/translation', {
          translationLogId: result?.logId,
          phraseId: result?.phraseId,
          rating: 'accurate',
        });
        setFeedbackSubmitted('accurate');
        showToast('Thank you for confirming translation accuracy!', 'success');
      } catch (e) {
        showToast('Failed to record feedback.', 'error');
      }
    } else {
      setFeedbackSubmitted('needs_correction');
      setCorrectionModalOpen(true);
    }
  };

  const isCurrentFav = result?.phraseId
    ? favourites.includes(result.phraseId)
    : false;

  const currentTargetObj = LANGUAGES.find((l) => l.key === targetLang);
  const currentSourceObj = LANGUAGES.find((l) => l.key === sourceLang);
  const isRegionalTarget = ['shina', 'balti', 'burushaski'].includes(targetLang);

  // Render Badge based on translation source & verification
  const renderBadge = () => {
    if (!result) return null;

    if (result.badgeType === 'verified' || result.source === 'dictionary') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Verified Community Translation</span>
        </span>
      );
    }

    if (result.badgeType === 'ai-high') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 dark:bg-sky-950/80 dark:text-sky-300 border border-sky-300 dark:border-sky-800">
          <Bot className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
          <span>AI Translation (High Confidence)</span>
        </span>
      );
    }

    if (result.badgeType === 'ai-review' || result.needs_human_review) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span>AI Translation (Experimental) — Needs Review</span>
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
        <Info className="w-3.5 h-3.5 text-slate-500" />
        <span>Translation Not Available Yet</span>
      </span>
    );
  };

  // Render Confidence Meter (High, Medium, Low)
  const renderConfidenceMeter = () => {
    if (!result || !result.translatedText) return null;

    const isVerified = result.source === 'dictionary' || result.verified;
    const confidence = isVerified ? 'high' : (result.confidence || 'medium');

    let filledBars = 3;
    let label = 'High (Verified Community Data)';
    let barColor = 'bg-emerald-500';
    let textColor = 'text-emerald-700 dark:text-emerald-400';

    if (!isVerified) {
      if (confidence === 'high' && !result.needs_human_review) {
        filledBars = 3;
        label = 'High (AI Estimate)';
        barColor = 'bg-sky-500';
        textColor = 'text-sky-700 dark:text-sky-400';
      } else if (confidence === 'medium') {
        filledBars = 2;
        label = 'Medium (AI Synthesized)';
        barColor = 'bg-amber-500';
        textColor = 'text-amber-700 dark:text-amber-400';
      } else {
        filledBars = 1;
        label = 'Low (Needs Native Review)';
        barColor = 'bg-rose-500';
        textColor = 'text-rose-700 dark:text-rose-400';
      }
    }

    return (
      <div className="flex items-center gap-2 text-xs">
        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Confidence:</span>
        <div className="flex items-center gap-1" title={label}>
          {[1, 2, 3].map((barIndex) => (
            <div
              key={barIndex}
              className={`w-3.5 h-1.5 rounded-full transition-colors ${
                barIndex <= filledBars
                  ? barColor
                  : 'bg-slate-200 dark:bg-slate-700'
              }`}
            />
          ))}
        </div>
        <span className={`text-[11px] font-bold ${textColor}`}>
          {label}
        </span>
      </div>
    );
  };

  return (
    <div
      className={`w-full bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 transition-all ${
        compact ? 'max-w-xl mx-auto' : ''
      }`}
    >
      {/* 1. Language Selector Row */}
      <div className="flex items-center justify-between gap-3 pb-5 mb-5 border-b border-slate-200 dark:border-slate-800">
        {/* Source Language */}
        <div className="flex-1 min-w-0">
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Source Language
          </label>
          <select
            value={sourceLang}
            onChange={(e) => {
              setSourceLang(e.target.value as LanguageKey);
              setResult(null);
            }}
            className="w-full font-semibold text-sm sm:text-base text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
          >
            {LANGUAGES.map((l) => (
              <option key={l.key} value={l.key}>
                {l.name} {l.key !== 'english' ? `(${l.nativeName})` : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Swap Button */}
        <div className="pt-6 shrink-0">
          <button
            onClick={handleSwapLanguages}
            title="Swap source and target languages"
            className="p-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors shadow-sm"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>
        </div>

        {/* Target Language */}
        <div className="flex-1 min-w-0">
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Target Language
          </label>
          <select
            value={targetLang}
            onChange={(e) => {
              setTargetLang(e.target.value as LanguageKey);
              setResult(null);
            }}
            className="w-full font-semibold text-sm sm:text-base text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0E9F8D]"
          >
            {LANGUAGES.map((l) => (
              <option key={l.key} value={l.key}>
                {l.name} {l.key !== 'english' ? `(${l.nativeName})` : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 2. Large Input Text Box with Live Character Count */}
      <div className="relative mb-3">
        <textarea
          rows={3}
          maxLength={500}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              executeTranslation();
            }
          }}
          placeholder={`Enter phrase in ${currentSourceObj?.name}... (e.g. "Where is the nearest medical clinic?")`}
          className={`w-full p-4 rounded-2xl text-base sm:text-lg border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C81] focus:bg-white dark:focus:bg-slate-800 transition-all resize-none ${
            currentSourceObj?.isRTL ? 'font-urdu text-right text-xl' : ''
          }`}
        />

        {/* Character count & clear button */}
        <div className="flex items-center justify-between text-xs text-slate-500 mt-1 px-1">
          <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
            {inputText.length} / 500 characters
          </span>

          {inputText && (
            <button
              onClick={() => {
                setInputText('');
                setResult(null);
              }}
              className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 underline"
            >
              Clear input
            </button>
          )}
        </div>
      </div>

      {/* Quick Common Phrases Selector */}
      <div className="mb-5">
        <span className="text-xs font-semibold text-slate-500 block mb-2">
          Or try a common regional expression:
        </span>
        <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
          {COMMON_QUICK_PHRASES.map((phrase) => (
            <button
              key={phrase}
              onClick={() => {
                setInputText(phrase);
                executeTranslation(phrase);
              }}
              className="text-xs px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-[#0E9F8D] hover:text-[#0E9F8D] transition-colors whitespace-nowrap"
            >
              {phrase}
            </button>
          ))}
        </div>
      </div>

      {/* Action Bar: Translate Button */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-slate-500 hidden sm:inline">
          Priority: 1. Verified Dictionary → 2. Similar Matches → 3. Secure AI Fallback
        </span>

        <button
          onClick={() => executeTranslation()}
          disabled={loading || !inputText.trim()}
          className="w-full sm:w-auto ml-auto px-7 py-3 rounded-2xl font-semibold text-sm text-white bg-[#0F4C81] hover:bg-[#0c3e6a] shadow-md hover:shadow-lg disabled:opacity-50 transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Translating securely…</span>
            </>
          ) : (
            <>
              <Search className="w-4 h-4" />
              <span>Translate to {currentTargetObj?.name}</span>
            </>
          )}
        </button>
      </div>

      {/* 3. STEP 2: SIMILAR PHRASE MATCHES (>= 80% similarity detected) */}
      {result && !result.found && result.hasSimilar && result.similarPhrases && result.similarPhrases.length > 0 && (
        <div className="mt-5 p-5 bg-amber-50/90 dark:bg-slate-800/90 rounded-2xl border border-amber-300 dark:border-amber-900/40 animate-fade-in space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Similar Verified Phrases Found
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Exact dictionary match was missing, but our verified repository includes these close phrases:
                </p>
              </div>
            </div>

            {/* Translate with AI instead button */}
            <button
              onClick={() => executeTranslation(undefined, true)}
              disabled={loading}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#0F4C81] text-white hover:bg-[#0c3e6a] transition-all shadow-sm shrink-0 flex items-center gap-1.5"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Translate with AI instead</span>
            </button>
          </div>

          <div className="space-y-2.5 pt-1">
            {result.similarPhrases.map((sug) => (
              <div
                key={sug.id}
                className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900 dark:text-white text-sm">
                      {sug.sourceValue || sug.sourceText}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 font-semibold">
                      {sug.similarity}% match
                    </span>
                  </div>

                  <p className={`text-base font-bold text-[#0F4C81] dark:text-sky-400 ${currentTargetObj?.isRTL ? 'font-urdu text-lg' : ''}`}>
                    {sug.targetValue}
                  </p>

                  {sug.pronunciation && (
                    <p className="text-[11px] font-mono text-slate-500">
                      Pronunciation: {sug.pronunciation}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                  <button
                    onClick={() => handleSpeak(sug.targetValue, targetLang, sug.pronunciation)}
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    title="Pronounce"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleCopy(sug.targetValue)}
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    title="Copy"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      setInputText(sug.sourceValue || sug.sourceText);
                      executeTranslation(sug.sourceValue || sug.sourceText);
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-200"
                  >
                    <span>Use Phrase</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. TRANSLATION RESULT CARD (Verified or AI Fallback) */}
      {result && (result.found || result.source === 'ai') && (
        <div className="mt-5 pt-5 border-t border-slate-200 dark:border-slate-800 animate-fade-in">
          <div className="bg-slate-50 dark:bg-slate-800/80 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700">
            {/* Top Bar: Verification / Confidence Badge + Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex flex-wrap items-center gap-3">
                {renderBadge()}
                {renderConfidenceMeter()}
              </div>

              <div className="flex items-center gap-1.5">
                {/* Pronounce audio button */}
                <button
                  onClick={() => handleSpeak()}
                  title="Listen to pronunciation"
                  className={`p-2 rounded-xl border border-slate-300 dark:border-slate-600 transition-colors ${
                    speaking
                      ? 'bg-[#0E9F8D] text-white animate-pulse'
                      : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                </button>

                {/* Copy button */}
                <button
                  onClick={() => handleCopy()}
                  title="Copy translation"
                  className="p-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>

                {/* Save to Favourites */}
                <button
                  onClick={handleToggleFav}
                  title={isCurrentFav ? 'Remove favourite' : 'Save to favourites'}
                  className={`p-2 rounded-xl border border-slate-300 dark:border-slate-600 transition-colors ${
                    isCurrentFav
                      ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 border-amber-400'
                      : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isCurrentFav ? 'fill-amber-500' : ''}`} />
                </button>
              </div>
            </div>

            {/* Translated Output Text */}
            <div className="mb-4">
              <p
                className={`text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-relaxed ${
                  currentTargetObj?.isRTL ? 'font-urdu text-right text-3xl sm:text-4xl' : ''
                }`}
              >
                {result.translatedText || 'Translation unavailable.'}
              </p>
            </div>

            {/* Romanized Pronunciation Guide */}
            {(result.romanized_translation || result.pronunciation) && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 mb-4 border border-slate-200 dark:border-slate-700/80 text-xs">
                <span className="font-semibold text-slate-500 text-[11px] uppercase tracking-wider block mb-1">
                  Romanized Pronunciation
                </span>
                <p className="font-mono text-slate-800 dark:text-slate-200 text-sm">
                  {result.romanized_translation || result.pronunciation}
                </p>
                {result.notes && (
                  <p className="text-[11px] text-slate-500 mt-1 italic">
                    Linguistic Note: {result.notes}
                  </p>
                )}
              </div>
            )}

            {/* AI Regional Language Notice */}
            {result.source === 'ai' && (
              <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/40 text-amber-800 dark:text-amber-300 text-xs mb-4">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
                <span>
                  Regional-language AI translation is an experimental estimate for low-resource languages. Native speakers are encouraged to report inaccuracies or submit corrected phrases.
                </span>
              </div>
            )}

            {/* "Was this useful?" Section */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-slate-700 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-600 dark:text-slate-300">Was this useful?</span>
                <button
                  onClick={() => handleFeedbackRating('accurate')}
                  disabled={feedbackSubmitted !== null}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-colors ${
                    feedbackSubmitted === 'accurate'
                      ? 'bg-emerald-100 dark:bg-emerald-950 border-emerald-400 text-emerald-800 dark:text-emerald-300 font-semibold'
                      : 'bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Accurate</span>
                </button>

                <button
                  onClick={() => handleFeedbackRating('needs_correction')}
                  disabled={feedbackSubmitted === 'needs_correction'}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-colors ${
                    feedbackSubmitted === 'needs_correction'
                      ? 'bg-rose-100 dark:bg-rose-950 border-rose-400 text-rose-800 dark:text-rose-300 font-semibold'
                      : 'bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <ThumbsDown className="w-3.5 h-3.5" />
                  <span>Needs correction</span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCorrectionModalOpen(true)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#0E9F8D] hover:underline"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Submit corrected translation</span>
                </button>

                <button
                  onClick={() => setReportModalOpen(true)}
                  className="text-slate-500 hover:text-amber-600 dark:hover:text-amber-400"
                  title="Report dialect issue"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <ReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        originalPhrase={result?.sourceText || inputText}
        currentTranslation={result?.translatedText || ''}
        sourceLanguage={sourceLang}
        targetLanguage={targetLang}
        phraseId={result?.phraseId}
      />

      <CorrectionModal
        isOpen={correctionModalOpen}
        onClose={() => setCorrectionModalOpen(false)}
        sourceText={result?.sourceText || inputText}
        sourceLanguage={sourceLang}
        targetLanguage={targetLang}
        currentTranslation={result?.translatedText || ''}
        translationLogId={result?.logId}
        phraseId={result?.phraseId}
        onSubmitted={() => setFeedbackSubmitted('needs_correction')}
      />

      <RequestPhraseModal
        isOpen={requestModalOpen}
        onClose={() => setRequestModalOpen(false)}
        defaultPhrase={inputText}
        defaultSourceLang={sourceLang}
        defaultTargetLang={targetLang}
      />
    </div>
  );
};
