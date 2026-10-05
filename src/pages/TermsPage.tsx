import React from 'react';
import { FileText, ArrowLeft } from 'lucide-react';

interface TermsPageProps {
  navigate: (page: string) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ navigate }) => {
  return (
    <div className="py-12 sm:py-16 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <button
          onClick={() => navigate('home')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F4C81] dark:text-sky-400 mb-6 hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-[#0F4C81] dark:text-sky-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Terms & Conditions</h1>
              <p className="text-xs text-slate-500">Effective: October 2026</p>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-4 leading-relaxed">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              1. Non-Commercial Cultural Initiative
            </h3>
            <p>
              Gilgit Language Bridge is created for educational, cultural preservation, and everyday communication purposes. The platform offers access to verified phrase dictionaries across Shina, Balti, Burushaski, Urdu, and English.
            </p>

            <h3 className="text-base font-bold text-slate-900 dark:text-white pt-2">
              2. Linguistic Accuracy & Dialect Variations
            </h3>
            <p>
              We deliberately refrain from claiming AI perfection. Translations are curated from community contributors and verified dictionaries. Dialectal variations occur naturally across neighboring valleys (e.g. Gilgit Shina vs. Chilas Shina, or Skardu Balti vs. Khaplu Balti). Users are invited to submit suggestions and corrections via the dialect reporting mechanism.
            </p>

            <h3 className="text-base font-bold text-slate-900 dark:text-white pt-2">
              3. Community Conduct
            </h3>
            <p>
              Users submitting translation requests, dialect feedback, or reports must act respectfully and avoid hate speech, commercial spam, or deceptive submissions.
            </p>

            <h3 className="text-base font-bold text-slate-900 dark:text-white pt-2">
              4. Disclaimer of Liability
            </h3>
            <p>
              While emergency phrases and medical terms are verified carefully, travelers facing severe medical emergencies or life-threatening situations in high mountains should always communicate directly with certified rescue teams (Rescue 1122), hospital authorities, and local law enforcement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
