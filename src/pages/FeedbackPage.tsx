import React, { useState, useEffect } from 'react';
import { api, useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { FeedbackItem } from '../types';
import { Star, MessageSquare, Send, CheckCircle2, User } from 'lucide-react';

export const FeedbackPage: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Form
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(5);
  const [userName, setUserName] = useState(user?.name || '');
  const [userEmail, setUserEmail] = useState(user?.email || '');
  const [submitting, setSubmitting] = useState(false);

  const loadFeedback = async () => {
    try {
      const res = await api.get('/api/feedback');
      setFeedbackList(res.data?.feedback || []);
    } catch (err) {
      console.error('Error loading feedback:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeedback();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      showToast('Please enter your feedback message.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/api/feedback', {
        message: message.trim(),
        rating,
        userName: userName.trim() || undefined,
        userEmail: userEmail.trim() || undefined,
      });

      showToast('Thank you for contributing your feedback!', 'success');
      setMessage('');
      loadFeedback();
    } catch (err: any) {
      showToast(err.response?.data?.error || 'Failed to submit feedback.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-10 sm:py-16 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0E9F8D] uppercase tracking-wider mb-2">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Community Voice</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Community & Traveler Feedback
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
            Share your experiences, suggest local phrase additions, and tell us how the bridge helped your travels or studies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Submission Form */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-xl h-fit">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              Leave Feedback
            </h2>
            <p className="text-xs text-slate-500 mb-5">
              Rate your translation experience and suggest improvements.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 transition-colors ${
                          star <= rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-300 dark:text-slate-700'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300 ml-2">
                    {rating} / 5
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Your Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How did the translations perform? Any dialects or phrases we should add?"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E9F8D] text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Your Name (optional)
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="e.g. Ali from Skardu or Tourist from UK"
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E9F8D] text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Email (optional)
                </label>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="contact@example.com"
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E9F8D] text-slate-900 dark:text-white"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-[#0E9F8D] hover:bg-[#0c8979] shadow-md transition-colors flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
              >
                <Send className="w-3.5 h-3.5" />
                {submitting ? 'Submitting...' : 'Post Feedback'}
              </button>
            </form>
          </div>

          {/* Feedback Stream */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Recent Community Reviews</span>
              <span className="text-xs font-mono font-normal text-slate-500">({feedbackList.length})</span>
            </h3>

            {loading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-28 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 animate-pulse" />
                ))}
              </div>
            ) : feedbackList.length === 0 ? (
              <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs text-slate-500">
                Be the first to share your thoughts on the Gilgit Language Bridge!
              </div>
            ) : (
              <div className="space-y-4">
                {feedbackList.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-2.5"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-700 dark:text-slate-300">
                          {item.user?.[0]?.toUpperCase() || 'C'}
                        </div>
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {item.user}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < item.rating
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-slate-200 dark:text-slate-700'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      "{item.message}"
                    </p>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 font-mono">
                      {new Date(item.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
