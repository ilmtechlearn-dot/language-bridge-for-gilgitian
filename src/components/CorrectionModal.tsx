import React, { useState } from 'react';
import { X, Send, Edit3 } from 'lucide-react';
import { api } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

interface CorrectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  sourceText: string;
  sourceLanguage: string;
  targetLanguage: string;
  currentTranslation: string;
  translationLogId?: string;
  phraseId?: string;
  onSubmitted?: () => void;
}

export const CorrectionModal: React.FC<CorrectionModalProps> = ({
  isOpen,
  onClose,
  sourceText,
  sourceLanguage,
  targetLanguage,
  currentTranslation,
  translationLogId,
  phraseId,
  onSubmitted,
}) => {
  const [suggestedTranslation, setSuggestedTranslation] = useState('');
  const [feedbackNote, setFeedbackNote] = useState('');
  const [contributorName, setContributorName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestedTranslation.trim()) {
      showToast('Please provide your suggested translation.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/api/feedback/translation', {
        translationLogId,
        phraseId,
        rating: 'needs_correction',
        suggestedTranslation: suggestedTranslation.trim(),
        feedbackNote: feedbackNote.trim() || undefined,
        userName: contributorName.trim() || undefined,
      });

      showToast('Corrected translation submitted for admin review. Thank you!', 'success');
      setSuggestedTranslation('');
      setFeedbackNote('');
      setContributorName('');
      onClose();
      if (onSubmitted) onSubmitted();
    } catch (err: any) {
      showToast(err.response?.data?.error || 'Failed to submit correction.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 dark:border-slate-800 relative text-slate-900 dark:text-white">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-950/40 text-[#0E9F8D] flex items-center justify-center shrink-0">
            <Edit3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Submit Corrected Translation</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Provide the authentic phrasing spoken in your valley or region.
            </p>
          </div>
        </div>

        {/* Phrase summary card */}
        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-3.5 mb-4 text-xs space-y-1.5 border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between">
            <span className="text-slate-500 font-medium capitalize">{sourceLanguage}:</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100">{sourceText}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-medium capitalize">Current ({targetLanguage}):</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">{currentTranslation}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Suggested Accurate Translation <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={suggestedTranslation}
              onChange={(e) => setSuggestedTranslation(e.target.value)}
              placeholder={`Enter accurate ${targetLanguage} translation...`}
              className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E9F8D] text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Dialect / Context Explanation (optional)
            </label>
            <textarea
              rows={2}
              value={feedbackNote}
              onChange={(e) => setFeedbackNote(e.target.value)}
              placeholder="e.g. In Hunza or Skardu, native speakers prefer this word in daily talk..."
              className="w-full px-3.5 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E9F8D] text-slate-900 dark:text-white placeholder:text-slate-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Your Name or Dialect Region (optional)
            </label>
            <input
              type="text"
              value={contributorName}
              onChange={(e) => setContributorName(e.target.value)}
              placeholder="e.g. Shina native speaker, Gilgit"
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
              className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-[#0E9F8D] hover:bg-[#0c8979] rounded-xl transition-colors shadow-sm disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              {submitting ? 'Submitting...' : 'Submit Correction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
