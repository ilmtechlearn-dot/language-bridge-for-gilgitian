import React, { useState } from 'react';
import { TranslationWidget } from '../components/TranslationWidget';
import { LanguageKey } from '../types';
import { BookOpen, Sparkles, MessageCircle } from 'lucide-react';

interface TranslatePageProps {
  navigate: (page: string, params?: any) => void;
  initialParams?: any;
}

export const TranslatePage: React.FC<TranslatePageProps> = ({ navigate, initialParams }) => {
  const [sourceLang, setSourceLang] = useState<LanguageKey>(initialParams?.source || 'english');
  const [targetLang, setTargetLang] = useState<LanguageKey>(initialParams?.target || 'shina');
  const [initialText] = useState<string>(initialParams?.phrase || '');

  const PAIR_PRESETS: { label: string; src: LanguageKey; tgt: LanguageKey }[] = [
    { label: 'English → Shina', src: 'english', tgt: 'shina' },
    { label: 'English → Balti', src: 'english', tgt: 'balti' },
    { label: 'English → Burushaski', src: 'english', tgt: 'burushaski' },
    { label: 'Urdu → Shina', src: 'urdu', tgt: 'shina' },
    { label: 'Urdu → Balti', src: 'urdu', tgt: 'balti' },
    { label: 'Urdu → Burushaski', src: 'urdu', tgt: 'burushaski' },
  ];

  return (
    <div className="py-8 sm:py-12 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#0F4C81] dark:text-sky-400 uppercase tracking-wider mb-2">
            <span>Verified Language Portal</span>
            <span aria-hidden="true">·</span>
            <span>Accurate Regional Translations</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Translation Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-lg mx-auto">
            Grounded in a verified phrase dictionary. Dialect nuances verified by native northern speakers.
          </p>
        </div>

        {/* Pairing Presets */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <span className="text-xs text-slate-500 mr-1 hidden sm:inline">Popular pairs:</span>
          {PAIR_PRESETS.map((pair) => {
            const active = sourceLang === pair.src && targetLang === pair.tgt;
            return (
              <button
                key={pair.label}
                onClick={() => {
                  setSourceLang(pair.src);
                  setTargetLang(pair.tgt);
                }}
                className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                  active
                    ? 'bg-[#0F4C81] text-white border-[#0F4C81]'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                {pair.label}
              </button>
            );
          })}
        </div>

        {/* Primary Translation Widget */}
        <TranslationWidget
          key={`${sourceLang}-${targetLang}-${initialText}`}
          initialPhrase={initialText}
          initialSource={sourceLang}
          initialTarget={targetLang}
        />

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
            <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white mb-1">
              <BookOpen className="w-4 h-4 text-[#0F4C81] dark:text-sky-400" />
              <span>Dictionary Grounded</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              We do not fabricate low-resource translations. If an exact term is not in the DB, similar verified phrases are suggested.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
            <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white mb-1">
              <Sparkles className="w-4 h-4 text-[#0E9F8D]" />
              <span>Phonetic Audio</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              Each entry includes pronunciation transliteration and synthesized speech to practice native tonal delivery.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
            <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white mb-1">
              <MessageCircle className="w-4 h-4 text-amber-500" />
              <span>Community Moderation</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              Notice a regional dialect difference in Skardu or Hunza? Click "Report" to submit corrections for admin approval.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
