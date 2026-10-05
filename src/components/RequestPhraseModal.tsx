import React, { useState } from 'react';
import { X, Sparkles, Send } from 'lucide-react';
import { api } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { LANGUAGES } from '../types';

interface RequestPhraseModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPhrase?: string;
  defaultSourceLang?: string;
  defaultTargetLang?: string;
}

export const RequestPhraseModal: React.FC<RequestPhraseModalProps> = ({
  isOpen,
  onClose,
  defaultPhrase = '',
  defaultSourceLang = 'english',
  defaultTargetLang = 'shina',
}) => {
  const [requestedText, setRequestedText] = useState(defaultPhrase);
  const [sourceLang, setSourceLang] = useState(defaultSourceLang);
  const [targetLang, setTargetLang] = useState(defaultTargetLang);
  const [userEmail, setUserEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestedText.trim()) {
      showToast('Please specify the phrase you wish translated.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/api/translation-requests', {
        requestedText: requestedText.trim(),
        sourceLanguage: sourceLang,
        targetLanguage: targetLang,
        userEmail: userEmail.trim() || undefined,
      });

      showToast('Phrase request recorded! Our contributors will verify and add it.', 'success');
      onClose();
    } catch (err: any) {
      showToast(err.response?.data?.error || 'Failed to submit request.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/40 text-[#0E9F8D] flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Request New Translation
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Submit everyday phrases for verification by native regional linguists.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Phrase to Translate <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={requestedText}
              onChange={(e) => setRequestedText(e.target.value)}
              placeholder="e.g. Can you show me the route to Attabad Lake?"
              className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E9F8D] text-slate-900 dark:text-white placeholder:text-slate-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                From Language
              </label>
              <select
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E9F8D] text-slate-900 dark:text-white"
              >
                {LANGUAGES.map((l) => (
                  <option key={l.key} value={l.key}>
                    {l.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                To Language
              </label>
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E9F8D] text-slate-900 dark:text-white"
              >
                {LANGUAGES.map((l) => (
                  <option key={l.key} value={l.key}>
                    {l.name} ({l.nativeName})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Email for notification (optional)
            </label>
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-3.5 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E9F8D] text-slate-900 dark:text-white placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-[#0E9F8D] hover:bg-[#0c8979] rounded-xl transition-colors disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              {submitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
