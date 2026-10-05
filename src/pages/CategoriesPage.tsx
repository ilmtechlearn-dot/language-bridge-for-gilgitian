import React, { useState, useEffect } from 'react';
import { api, useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Phrase, LANGUAGES, LanguageKey } from '../types';
import { speakPhrase } from '../utils/speech';
import {
  Search,
  Volume2,
  Copy,
  Bookmark,
  Check,
  ArrowRight,
  Filter,
  CheckCircle2
} from 'lucide-react';

interface CategoriesPageProps {
  navigate: (page: string, params?: any) => void;
  initialParams?: any;
}

const CATEGORIES = [
  'All',
  'Greetings',
  'Travel',
  'Food',
  'Hotel',
  'Emergency',
  'Healthcare',
  'Shopping',
  'Education',
  'Family',
  'Daily conversation',
  'Tourist communication',
];

export const CategoriesPage: React.FC<CategoriesPageProps> = ({ navigate, initialParams }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialParams?.category || 'All');
  const [targetLang, setTargetLang] = useState<LanguageKey>('shina');
  const [searchQuery, setSearchQuery] = useState('');
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const { showToast } = useToast();
  const { toggleFavourite, favourites } = useAuth();

  useEffect(() => {
    async function loadPhrases() {
      setLoading(true);
      try {
        const params: any = {};
        if (selectedCategory !== 'All') params.category = selectedCategory;
        if (searchQuery.trim()) params.search = searchQuery.trim();

        const res = await api.get('/api/phrases', { params });
        setPhrases(res.data?.phrases || []);
      } catch (err) {
        console.error('Error fetching phrases directory:', err);
        showToast('Failed to load phrases from dictionary.', 'error');
      } finally {
        setLoading(false);
      }
    }
    loadPhrases();
  }, [selectedCategory, searchQuery]);

  const handleCopy = (phraseId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(phraseId);
    showToast('Copied to clipboard!', 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (phraseId: string, text: string, pronunciation?: string) => {
    setSpeakingId(phraseId);
    speakPhrase(text, targetLang, pronunciation);
    setTimeout(() => setSpeakingId(null), 1800);
  };

  const handleToggleFav = async (phraseId: string) => {
    const isFav = await toggleFavourite(phraseId);
    showToast(isFav ? 'Phrase saved to favourites!' : 'Removed from favourites.', 'info');
  };

  const currentTargetObj = LANGUAGES.find((l) => l.key === targetLang);

  return (
    <div className="py-8 sm:py-12 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#0F4C81] dark:text-sky-400 uppercase tracking-wider mb-1">
              <span>Verified Northern Dictionary</span>
              <span aria-hidden="true">·</span>
              <span>100+ Authentic Entries</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Phrase Directory
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              Browse common sentences across 11 daily topics with audio pronunciation and regional dialect notes.
            </p>
          </div>

          {/* Target Language Switcher for Directory */}
          <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 self-start md:self-auto">
            <span className="text-xs font-semibold text-slate-500 px-2 hidden sm:inline">Translate to:</span>
            {LANGUAGES.filter((l) => l.key !== 'english').map((l) => (
              <button
                key={l.key}
                onClick={() => setTargetLang(l.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  targetLang === l.key
                    ? 'bg-[#0F4C81] text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {l.name}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar & Category Filter Tabs */}
        <div className="space-y-4 mb-8">
          {/* Live Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search phrases in English, Urdu, Shina, Balti, or Burushaski..."
              className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 px-2 py-1 rounded bg-slate-100 dark:bg-slate-800"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors border ${
                    active
                      ? 'bg-[#0E9F8D] text-white border-[#0E9F8D] shadow-sm'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Phrases Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-44 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 animate-pulse p-5" />
            ))}
          </div>
        ) : phrases.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
            <Filter className="w-8 h-8 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">No phrases found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              No dictionary matches for "{searchQuery}" in this category. You can request it in the Translation Studio.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-[#0F4C81] rounded-xl hover:bg-[#0c3e6a]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {phrases.map((phrase) => {
              const phraseId = phrase._id || phrase.id || '';
              const targetTranslation = phrase.translations[targetLang];
              const pronunciation = phrase.pronunciations?.[targetLang] || phrase.pronunciationText;
              const isFav = favourites.includes(phraseId);
              const isSpeaking = speakingId === phraseId;
              const isCopied = copiedId === phraseId;

              return (
                <div
                  key={phraseId}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Unboxed Metadata Header (Section 1.A zero-pill) */}
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-[#0E9F8D]">{phrase.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="w-3 h-3" /> Verified
                        </span>
                      </div>

                      <button
                        onClick={() => handleToggleFav(phraseId)}
                        title={isFav ? 'Remove favourite' : 'Save favourite'}
                        className={`p-1 rounded-md transition-colors ${
                          isFav ? 'text-amber-500' : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isFav ? 'fill-amber-500' : ''}`} />
                      </button>
                    </div>

                    {/* Source English & Urdu */}
                    <div className="mb-3">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                        {phrase.sourceText}
                      </h3>
                      <p className="text-xs font-urdu text-slate-500 dark:text-slate-400 mt-0.5">
                        {phrase.translations.urdu}
                      </p>
                    </div>

                    {/* Target Translation Display */}
                    <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3 mb-3 border border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                        {currentTargetObj?.name}
                      </span>
                      <p
                        className={`text-lg font-bold text-[#0F4C81] dark:text-sky-400 leading-snug ${
                          currentTargetObj?.isRTL ? 'font-urdu text-xl' : ''
                        }`}
                      >
                        {targetTranslation}
                      </p>
                      {pronunciation && (
                        <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-1">
                          {pronunciation}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleSpeak(phraseId, targetTranslation, pronunciation)}
                        title="Listen to pronunciation"
                        className={`p-1.5 rounded-lg transition-colors ${
                          isSpeaking
                            ? 'bg-[#0E9F8D] text-white'
                            : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleCopy(phraseId, targetTranslation)}
                        title="Copy phrase"
                        className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>

                    <button
                      onClick={() =>
                        navigate('translate', {
                          phrase: phrase.sourceText,
                          source: 'english',
                          target: targetLang,
                        })
                      }
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0F4C81] dark:text-sky-400 hover:underline"
                    >
                      <span>Studio</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
