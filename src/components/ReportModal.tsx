import React, { useState } from 'react';
import { X, AlertTriangle, Send } from 'lucide-react';
import { api } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalPhrase: string;
  currentTranslation: string;
  sourceLanguage: string;
  targetLanguage: string;
  phraseId?: string;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  originalPhrase,
  currentTranslation,
  sourceLanguage,
  targetLanguage,
  phraseId,
}) => {
  const [issueDescription, setIssueDescription] = useState('');
  const [contributorName, setContributorName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueDescription.trim()) {
      showToast('Please describe the issue or suggested correction.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/api/reports', {
        phraseId,
        originalPhrase,
        currentTranslation,
        sourceLanguage,
        targetLanguage,
        issueDescription: issueDescription.trim(),
        userName: contributorName.trim() || undefined,
      });

      showToast('Report submitted. Thank you for helping keep translations accurate!', 'success');
      setIssueDescription('');
      setContributorName('');
      onClose();
    } catch (err: any) {
      showToast(err.response?.data?.error || 'Failed to submit report. Please try again.', 'error');
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
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Report Translation Issue
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Help our local language council review and correct regional dialect nuances.
            </p>
          </div>
        </div>

        {/* Phrase summary */}
        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3.5 mb-4 text-xs space-y-1.5 border border-slate-100 dark:border-slate-800">
          <div className="flex justify-between">
            <span className="text-slate-500 capitalize">{sourceLanguage}:</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{originalPhrase}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 capitalize">{targetLanguage}:</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{currentTranslation}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Issue description or correct dialect phrasing <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
              placeholder="e.g. In Skardu or Hunza dialect, locals usually say... or the pronunciation tone should be..."
              className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F4C81] text-slate-900 dark:text-white placeholder:text-slate-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Your name or regional dialect (optional)
            </label>
            <input
              type="text"
              value={contributorName}
              onChange={(e) => setContributorName(e.target.value)}
              placeholder="e.g. Karim from Gilgit or Balti native speaker"
              className="w-full px-3.5 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F4C81] text-slate-900 dark:text-white placeholder:text-slate-400"
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
              className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-[#0F4C81] hover:bg-[#0d3f6a] rounded-xl transition-colors disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              {submitting ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
