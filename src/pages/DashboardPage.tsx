import React, { useState, useEffect } from 'react';
import { useAuth, api } from '../context/AuthContext';
import {
  Bookmark,
  History,
  Languages,
  User,
  Shield,
  ArrowRight,
  Sparkles,
  MapPin,
  Clock
} from 'lucide-react';
import { TranslationHistoryItem } from '../types';

interface DashboardPageProps {
  navigate: (page: string, params?: any) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ navigate }) => {
  const { user, isAdmin, favourites } = useAuth();
  const [recentHistory, setRecentHistory] = useState<TranslationHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await api.get('/api/history');
        setRecentHistory((res.data?.history || []).slice(0, 5));
      } catch (e) {
        console.error('Error loading dashboard history:', e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="py-8 sm:py-12 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* User Welcome Banner */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#0F4C81] text-white flex items-center justify-center text-2xl font-bold shrink-0 shadow-md">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {user?.name || 'Community Member'}
                </h1>
                {isAdmin ? (
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-semibold">
                    Admin
                  </span>
                ) : (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                    Contributor
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {user?.city || 'Gilgit'}
                </span>
                <span>·</span>
                <span>{user?.email}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('profile')}
              className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors"
            >
              Edit Profile
            </button>
            <button
              onClick={() => navigate('translate')}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#0F4C81] text-white hover:bg-[#0c3e6a] transition-colors shadow-sm"
            >
              New Translation
            </button>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <div
            onClick={() => navigate('favourites')}
            className="cursor-pointer bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-amber-400 transition-all flex items-center justify-between"
          >
            <div>
              <span className="text-xs text-slate-500 font-medium block mb-1">Saved Favourites</span>
              <span className="text-3xl font-bold font-mono text-slate-900 dark:text-white">
                {favourites.length}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center">
              <Bookmark className="w-6 h-6 fill-amber-500" />
            </div>
          </div>

          <div
            onClick={() => navigate('history')}
            className="cursor-pointer bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-[#0E9F8D] transition-all flex items-center justify-between"
          >
            <div>
              <span className="text-xs text-slate-500 font-medium block mb-1">Recent Lookups</span>
              <span className="text-3xl font-bold font-mono text-slate-900 dark:text-white">
                {recentHistory.length}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/40 text-[#0E9F8D] flex items-center justify-center">
              <History className="w-6 h-6" />
            </div>
          </div>

          <div
            onClick={() => navigate('categories')}
            className="cursor-pointer bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-[#0F4C81] transition-all flex items-center justify-between"
          >
            <div>
              <span className="text-xs text-slate-500 font-medium block mb-1">Dictionary Entries</span>
              <span className="text-3xl font-bold font-mono text-slate-900 dark:text-white">100+</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-[#0F4C81] dark:text-sky-400 flex items-center justify-center">
              <Languages className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Recent Translation Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent History Table */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>Recent Translation Activity</span>
              </h2>
              <button
                onClick={() => navigate('history')}
                className="text-xs font-semibold text-[#0F4C81] dark:text-sky-400 hover:underline inline-flex items-center gap-1"
              >
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {loading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-14 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : recentHistory.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-500">
                No recent translations logged. Try searching for a phrase in the studio!
              </div>
            ) : (
              <div className="space-y-2.5">
                {recentHistory.map((item) => (
                  <div
                    key={item._id}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {item.sourceText}
                      </p>
                      <p className="text-slate-500 mt-0.5">
                        <span className="capitalize">{item.sourceLanguage}</span> → <span className="capitalize font-medium text-[#0F4C81] dark:text-sky-400">{item.targetLanguage}</span>: {item.translatedText}
                      </p>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono shrink-0">
                      {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Access Sidebar */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
                Quick Shortcuts
              </h3>
              <div className="space-y-2 text-xs">
                <button
                  onClick={() => navigate('favourites')}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between text-slate-700 dark:text-slate-300 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Bookmark className="w-3.5 h-3.5 text-amber-500" />
                    Saved Phrases Collection
                  </span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                </button>

                <button
                  onClick={() => navigate('categories', { category: 'Emergency' })}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between text-slate-700 dark:text-slate-300 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-rose-500" />
                    Emergency Phrases Guide
                  </span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                </button>

                <button
                  onClick={() => navigate('feedback')}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between text-slate-700 dark:text-slate-300 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-teal-500" />
                    Submit Dialect Feedback
                  </span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                </button>

                {isAdmin && (
                  <button
                    onClick={() => navigate('admin')}
                    className="w-full text-left p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-semibold flex items-center justify-between transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Shield className="w-3.5 h-3.5" />
                      Admin Control Panel
                    </span>
                    <ArrowRight className="w-3 h-3 text-amber-500" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
