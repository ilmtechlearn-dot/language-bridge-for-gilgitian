import React from 'react';
import { Compass, ArrowLeft } from 'lucide-react';

interface NotFoundPageProps {
  navigate: (page: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ navigate }) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#0F4C81]/10 dark:bg-[#0F4C81]/20 text-[#0F4C81] dark:text-sky-400 flex items-center justify-center mx-auto mb-4">
          <Compass className="w-8 h-8" />
        </div>
        <span className="text-4xl font-extrabold font-mono text-slate-900 dark:text-white block mb-2">404</span>
        <h1 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-1">
          Valley Track Not Found
        </h1>
        <p className="text-xs text-slate-500 mb-6">
          The page or phrase pathway you are searching for does not exist or has moved.
        </p>

        <button
          onClick={() => navigate('home')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0F4C81] text-white rounded-xl text-xs font-semibold hover:bg-[#0c3e6a] shadow-md transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Home</span>
        </button>
      </div>
    </div>
  );
};
