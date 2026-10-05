import React from 'react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

interface PrivacyPolicyPageProps {
  navigate: (page: string) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ navigate }) => {
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
            <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/40 text-[#0E9F8D] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Privacy Policy</h1>
              <p className="text-xs text-slate-500">Last updated: October 2026 · Gilgit-Baltistan Linguistic Council</p>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-4 leading-relaxed">
            <p>
              Gilgit Language Bridge is dedicated to preserving the indigenous languages of Gilgit-Baltistan and facilitating communication for residents, students, and travelers. We respect your digital privacy.
            </p>

            <h3 className="text-base font-bold text-slate-900 dark:text-white pt-2">
              1. Information We Collect
            </h3>
            <p>
              When you register for an account, we store your full name, email address, password hash (encrypted using industry-standard bcrypt), and optional regional city choice. Guests can use all translation capabilities completely anonymously without creating an account.
            </p>

            <h3 className="text-base font-bold text-slate-900 dark:text-white pt-2">
              2. Translation History & Favourites
            </h3>
            <p>
              Translation lookups may be cached in your local browser storage (`localStorage`) to support offline reference in mountain regions where mobile connectivity may be intermittent. Translation requests and dialect reports are collected to verify linguistic accuracy.
            </p>

            <h3 className="text-base font-bold text-slate-900 dark:text-white pt-2">
              3. Data Security & Storage
            </h3>
            <p>
              We do not sell, rent, or trade personal data to third parties. All authentication operations use secure JSON Web Tokens (JWT). Server environment configurations and database credentials remain strictly protected on our cloud backend.
            </p>

            <h3 className="text-base font-bold text-slate-900 dark:text-white pt-2">
              4. Contact & Inquiries
            </h3>
            <p>
              For privacy inquiries or account data removal requests, please use our Community Feedback form or reach out through our regional coordinator offices in Gilgit and Skardu.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
