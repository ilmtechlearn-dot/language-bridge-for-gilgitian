import React, { useState, useEffect } from 'react';
import { api } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { TranslationHistoryItem } from '../types';
import { History, Download, Trash2, Search, ArrowRight, Clock } from 'lucide-react';

interface HistoryPageProps {
  navigate: (page: string, params?: any) => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ navigate }) => {
  const [history, setHistory] = useState<TranslationHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const { showToast } = useToast();

  const loadHistory = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/history');
      setHistory(res.data?.history || []);
    } catch (err) {
      console.error('Error fetching history:', err);
      showToast('Failed to retrieve history.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleClear = async () => {
    if (!window.confirm('Are you sure you want to clear your translation history?')) return;
    try {
      await api.delete('/api/history');
      setHistory([]);
      showToast('Translation history cleared.', 'info');
    } catch (err) {
      showToast('Failed to clear history.', 'error');
    }
  };

  const handleExportCSV = () => {
    window.location.href = '/api/history/export';
    showToast('Exporting translation history to CSV...', 'info');
  };

  const filtered = history.filter((item) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      item.sourceText.toLowerCase().includes(q) ||
      item.translatedText.toLowerCase().includes(q) ||
      item.sourceLanguage.toLowerCase().includes(q) ||
      item.targetLanguage.toLowerCase().includes(q)
    );
  });

  return (
    <div className="py-8 sm:py-12 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#0E9F8D] uppercase tracking-wider mb-1">
              <History className="w-3.5 h-3.5" />
              <span>Activity Log</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Translation History
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Review and export your recent regional translations.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            <button
              onClick={handleExportCSV}
              disabled={history.length === 0}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 shadow-sm transition-colors disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5 text-[#0E9F8D]" />
              <span>Download CSV</span>
            </button>

            <button
              onClick={handleClear}
              disabled={history.length === 0}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Search */}
        {history.length > 0 && (
          <div className="relative mb-6">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search translation history entries..."
              className="w-full pl-11 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C81] text-slate-900 dark:text-white"
            />
          </div>
        )}

        {/* History List Table / Cards */}
        {loading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
            <History className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {search ? 'No matching logs' : 'No translation history yet'}
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Translations you run in the studio are automatically stored here for your reference.
            </p>
            <button
              onClick={() => navigate('translate')}
              className="mt-4 px-5 py-2.5 text-xs font-semibold text-white bg-[#0F4C81] rounded-xl hover:bg-[#0c3e6a]"
            >
              Go to Translation Studio
            </button>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map((item) => (
              <div
                key={item._id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span className="font-semibold uppercase tracking-wider text-[#0F4C81] dark:text-sky-400">
                      {item.sourceLanguage} → {item.targetLanguage}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" />
                      {new Date(item.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                    {item.sourceText}
                  </p>

                  <p className="text-sm font-bold text-[#0E9F8D] font-urdu">
                    {item.translatedText}
                  </p>
                </div>

                <div className="self-end sm:self-center shrink-0">
                  <button
                    onClick={() =>
                      navigate('translate', {
                        phrase: item.sourceText,
                        source: item.sourceLanguage,
                        target: item.targetLanguage,
                      })
                    }
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <span>Translate Again</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
