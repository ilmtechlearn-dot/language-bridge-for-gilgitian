import React from 'react';
import { Languages, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  navigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-8 h-8 rounded-lg bg-[#0E9F8D] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                <Languages className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold tracking-tight">Gilgit Language Bridge</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
              Preserving linguistic heritage and empowering everyday communication between Urdu, English, Shina, Balti, and Burushaski across Gilgit-Baltistan. Grounded in verified phrase dictionaries and community collaboration.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Regional Phrase Dictionary & Cultural Repository</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => navigate('home')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navigate('translate')} className="hover:text-white transition-colors">
                  Interactive Translator
                </button>
              </li>
              <li>
                <button onClick={() => navigate('categories')} className="hover:text-white transition-colors">
                  Daily Phrase Directory
                </button>
              </li>
              <li>
                <button onClick={() => navigate('about-languages')} className="hover:text-white transition-colors">
                  About Northern Languages
                </button>
              </li>
              <li>
                <button onClick={() => navigate('feedback')} className="hover:text-white transition-colors">
                  Community Feedback
                </button>
              </li>
            </ul>
          </div>

          {/* Regional Languages */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Supported Languages
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="flex items-center justify-between">
                <span>Shina (شینا)</span>
                <span className="text-[11px] text-slate-500">Gilgit · Diamer · Astore</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Balti (بلتی)</span>
                <span className="text-[11px] text-slate-500">Skardu · Shigar · Ghanche</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Burushaski (بروشسکی)</span>
                <span className="text-[11px] text-slate-500">Hunza · Nagar · Yasin</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Urdu (اردو)</span>
                <span className="text-[11px] text-slate-500">National Lingua Franca</span>
              </li>
              <li className="flex items-center justify-between">
                <span>English</span>
                <span className="text-[11px] text-slate-500">Tourism & International</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Gilgit Language Bridge. Non-commercial regional linguistic preservation initiative.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => navigate('privacy')} className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => navigate('terms')} className="hover:text-slate-300 transition-colors">
              Terms & Conditions
            </button>
            <span className="flex items-center gap-1 text-slate-400">
              Crafted with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for Gilgit-Baltistan
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
