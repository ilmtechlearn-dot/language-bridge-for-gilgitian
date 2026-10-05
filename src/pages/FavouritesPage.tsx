import React, { useState, useEffect } from 'react';
import { api, useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Phrase, LANGUAGES, LanguageKey } from '../types';
import { speakPhrase } from '../utils/speech';
import { Bookmark, Volume2, Copy, Trash2, ArrowRight, Search, Check } from 'lucide-react';

interface FavouritesPageProps {
  navigate: (page: string, params?: any) => void;
}

export const FavouritesPage: React.FC<FavouritesPageProps> = ({ navigate }) => {
  const { favourites, toggleFavourite } = useAuth();
  const { showToast } = useToast();
  const [favPhrases, setFavPhrases] = useState<Phrase[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeLang, setActiveLang] = useState<LanguageKey>('shina');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    async function loadFavourites() {
      setLoading(true);
      try {
        const res = await api.get('/api/favourites');
        setFavPhrases(res.data?.favourites || []);
      } catch (err) {
        console.error('Error fetching favourites:', err);
      } finally {
        setLoading(false);
      }
    }
    loadFavourites();
  }, [favourites]);

  const handleRemove = async (id: string) => {
    await toggleFavourite(id);
    setFavPhrases((prev) => prev.filter((p) => p._id !== id && p.id !== id));
    showToast('Removed from favourites.', 'info');
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('Copied to clipboard!', 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (text: string, pronunciation?: string) => {
    speakPhrase(text, activeLang, pronunciation);
  };

  const filtered = favPhrases.filter((p) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      p.sourceText.toLowerCase().includes(q) ||
      p.translations.english.toLowerCase().includes(q) ||
      p.translations.urdu.toLowerCase().includes(q) ||
      p.translations[activeLang]?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="py-8 sm:py-12 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
              <Bookmark className="w-3.5 h-3.5 fill-current" />
              <span>Offline-Friendly Collection</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Saved Phrases
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Your quick access handbook of emergency phrases and greetings.
            </p>
          </div>

          {/* Target language selector */}
          <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 self-start sm:self-auto">
            {LANGUAGES.filter((l) => l.key !== 'english').map((l) => (
              <button
                key={l.key}
                onClick={() => setActiveLang(l.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeLang === l.key
                    ? 'bg-[#0F4C81] text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {l.name}
              </button>
            ))}
          </div>
        </div>

        {/* Search inside favourites */}
        {favPhrases.length > 0 && (
          <div className="relative mb-6">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter your saved phrases..."
              className="w-full pl-11 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C81] text-slate-900 dark:text-white"
            />
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-40 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
            <Bookmark className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {search ? 'No matching saved phrases' : 'No saved phrases yet'}
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Save everyday phrases for quick offline reference while traveling through Gilgit-Baltistan.
            </p>
            <button
              onClick={() => navigate('categories')}
              className="mt-4 px-5 py-2.5 text-xs font-semibold text-white bg-[#0F4C81] rounded-xl hover:bg-[#0c3e6a] transition-colors"
            >
              Browse Phrase Directory
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((phrase) => {
              const phraseId = phrase._id || phrase.id || '';
              const targetText = phrase.translations[activeLang];
              const pron = phrase.pronunciations?.[activeLang] || phrase.pronunciationText;

              return (
                <div
                  key={phraseId}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span className="font-semibold text-[#0E9F8D]">{phrase.category}</span>
                      <button
                        onClick={() => handleRemove(phraseId)}
                        title="Remove from saved"
                        className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                      {phrase.sourceText}
                    </h3>
                    <p className="text-xs font-urdu text-slate-500 mb-3">
                      {phrase.translations.urdu}
                    </p>

                    <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3 mb-3 border border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                        {LANGUAGES.find((l) => l.key === activeLang)?.name}
                      </span>
                      <p className="text-lg font-bold text-[#0F4C81] dark:text-sky-400 font-urdu leading-snug">
                        {targetText}
                      </p>
                      {pron && (
                        <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-1">
                          {pron}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleSpeak(targetText, pron)}
                        className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                        title="Listen"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleCopy(phraseId, targetText)}
                        className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                        title="Copy"
                      >
                        {copiedId === phraseId ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>

                    <button
                      onClick={() =>
                        navigate('translate', {
                          phrase: phrase.sourceText,
                          source: 'english',
                          target: activeLang,
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
