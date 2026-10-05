import React from 'react';
import { TranslationWidget } from '../components/TranslationWidget';
import { LANGUAGES } from '../types';
import {
  Compass,
  HeartPulse,
  ShoppingBag,
  Bed,
  Utensils,
  GraduationCap,
  Users,
  MessageSquare,
  ShieldCheck,
  Headphones,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  MapPin,
  BookOpen
} from 'lucide-react';

interface HomePageProps {
  navigate: (page: string, params?: any) => void;
}

const CATEGORY_ITEMS = [
  { name: 'Greetings', icon: MessageSquare, desc: 'Everyday respectful salutations' },
  { name: 'Travel', icon: Compass, desc: 'Roads, buses, jeeps & tracks' },
  { name: 'Food', icon: Utensils, desc: 'Local cuisine, water, chai & dining' },
  { name: 'Hotel', icon: Bed, desc: 'Rooms, check-outs & hospitality' },
  { name: 'Emergency', icon: ShieldCheck, desc: 'Medical, police, landslides' },
  { name: 'Healthcare', icon: HeartPulse, desc: 'Medicines, altitude & clinics' },
  { name: 'Shopping', icon: ShoppingBag, desc: 'Bazaars, handicrafts, dry fruits' },
  { name: 'Education', icon: GraduationCap, desc: 'Students, universities & study' },
  { name: 'Tourist communication', icon: Sparkles, desc: 'Sightseeing, peaks & photography' },
  { name: 'Family', icon: Users, desc: 'Relatives, elders & children' },
];

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-900 text-white pt-10 pb-16 lg:pt-16 lg:pb-24">
        {/* Background Image with Measured Contrast Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/gilgit_hero_mountains_1790863560339.jpg"
            alt="Karakoram Mountain Peaks in Gilgit-Baltistan"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-900/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            {/* Unboxed Metadata Tag per Anti-Slop Guidelines */}
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#0E9F8D] uppercase tracking-wider mb-3">
              <span>Northern Pakistan Regional Portal</span>
              <span aria-hidden="true">·</span>
              <span>100% Verified Phrase Dictionary</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 text-balance">
              Connect Through Language
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Translate everyday phrases between Urdu, English, Shina, Balti and Burushaski. Built for travelers, students, elders, and residents of Gilgit-Baltistan.
            </p>
          </div>

          {/* Interactive Translation Studio embedded directly in Hero */}
          <div className="max-w-3xl mx-auto">
            <TranslationWidget initialPhrase="Where is the hospital?" />
          </div>
        </div>
      </section>

      {/* 2. POPULAR REGIONAL LANGUAGES SECTION */}
      <section className="py-14 sm:py-20 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold text-[#0F4C81] dark:text-sky-400 uppercase tracking-wider">
                Linguistic Diversity
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
                Languages of Gilgit-Baltistan
              </h2>
            </div>
            <button
              onClick={() => navigate('about-languages')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0F4C81] dark:text-sky-400 hover:underline"
            >
              <span>Explore linguistic history & roots</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {LANGUAGES.filter((l) => l.key !== 'english').map((lang) => (
              <div
                key={lang.key}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5 bg-slate-50/50 dark:bg-slate-900/60 hover:border-[#0E9F8D] transition-all hover:shadow-md group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-slate-500">{lang.family}</span>
                    <span className={`text-xl font-bold text-[#0F4C81] dark:text-sky-400 ${lang.isRTL ? 'font-urdu' : ''}`}>
                      {lang.nativeName}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5">
                    {lang.name}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 mb-4">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{lang.region}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-mono">Script: {lang.script}</span>
                  <button
                    onClick={() => navigate('categories')}
                    className="text-xs font-semibold text-[#0E9F8D] hover:text-[#0c8979] flex items-center gap-1"
                  >
                    <span>View phrases</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. COMMON PHRASE CATEGORIES */}
      <section className="py-14 sm:py-20 bg-slate-50 dark:bg-slate-900/50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#0E9F8D] uppercase tracking-wider">
              Essential Communication
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
              Curated Phrase Categories
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
              Over 100 practical phrases with verified translations and phonetic pronunciation guides.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {CATEGORY_ITEMS.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.name}
                  onClick={() => navigate('categories', { category: cat.name })}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/90 dark:border-slate-800 hover:border-[#0F4C81] dark:hover:border-sky-500 transition-all text-left shadow-sm hover:shadow-md group flex flex-col justify-between h-36"
                >
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-[#0F4C81] dark:text-sky-400 flex items-center justify-center group-hover:bg-[#0F4C81] group-hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight">
                      {cat.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{cat.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. WHY THIS APP MATTERS FOR GILGIT-BALTISTAN */}
      <section className="py-14 sm:py-20 bg-white dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Visual Mosaic with Generated Images */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm aspect-[4/3]">
                  <img
                    src="/src/assets/images/gilgit_heritage_culture_1790863572582.jpg"
                    alt="Gilgit-Baltistan Architecture and Poplar Trees"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-[#0F4C81] text-white p-5 rounded-2xl">
                  <span className="text-2xl font-bold font-mono">100+</span>
                  <p className="text-xs text-sky-100 mt-1 font-medium">
                    Verified phrases across 11 daily life categories
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <div className="bg-[#0E9F8D] text-white p-5 rounded-2xl">
                  <span className="text-2xl font-bold font-mono">5</span>
                  <p className="text-xs text-teal-100 mt-1 font-medium">
                    Inter-translated languages: Urdu, English, Shina, Balti & Burushaski
                  </p>
                </div>
                <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm aspect-[4/3]">
                  <img
                    src="/src/assets/images/gilgit_community_dialogue_1790863585328.jpg"
                    alt="Community Dialogue in Gilgit Village"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Editorial Content */}
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-[#0F4C81] dark:text-sky-400 uppercase tracking-wider">
                  Cultural Stewardship
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 leading-tight">
                  Preserving Indigenous Voices in the Karakoram
                </h2>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Gilgit-Baltistan is home to one of the richest linguistic landscapes on Earth. Languages like Burushaski are unique language isolates with no known relatives anywhere in the world. Shina connects the historical valleys of Gilgit, Diamer and Astore, while Balti preserves archaic Tibetan phonology.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Zero AI Hallucinations</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">All translations come from a verified phrase dictionary. If an exact phrase is absent, smart fuzzy matching offers close verified alternatives.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Dialect Reporting & Community Review</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Locals and scholars can report incorrect terms or suggest valley-specific variants which our moderators review and incorporate.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Bridge for Tourism, Healthcare & Education</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Crucial for mountain travelers needing emergency directions, doctors consulting elders, and students exploring heritage.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => navigate('translate')}
                  className="px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm text-white bg-[#0F4C81] hover:bg-[#0c3e6a] shadow-md transition-colors inline-flex items-center gap-2"
                >
                  <span>Start Translating Phrases</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="py-14 sm:py-20 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#0E9F8D] uppercase tracking-wider">
              Simple & Transparent
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
              How the Bridge Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative">
              <span className="text-4xl font-extrabold text-[#0F4C81]/20 font-mono absolute top-4 right-5">01</span>
              <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-[#0F4C81] dark:text-sky-400 flex items-center justify-center mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Select Pair & Phrase
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Choose from English, Urdu, Shina, Balti, or Burushaski. Type a query or pick from everyday common traveler and hospital scenarios.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative">
              <span className="text-4xl font-extrabold text-[#0E9F8D]/20 font-mono absolute top-4 right-5">02</span>
              <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-[#0E9F8D] flex items-center justify-center mb-4">
                <Headphones className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Listen & Pronounce
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                View Nastaliq or Romanized text, hear synthesized phonetic audio, copy with one click, or bookmark to your offline favourites.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative">
              <span className="text-4xl font-extrabold text-amber-500/20 font-mono absolute top-4 right-5">03</span>
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center mb-4">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Request or Refine
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                If a phrase is not yet verified in the dictionary, receive instant smart suggestions and submit a 1-click request for linguistic review.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. COMMUNITY FEEDBACK CTA */}
      <section className="py-14 sm:py-16 bg-[#0F4C81] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Help Us Expand Northern Dialects
          </h2>
          <p className="text-xs sm:text-sm text-sky-100 max-w-xl mx-auto mb-8 leading-relaxed">
            Are you a native speaker of Shina, Balti, or Burushaski? Have you traveled along the KKH? Your suggestions and corrections keep this bridge alive and authentic.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigate('feedback')}
              className="px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-white text-[#0F4C81] hover:bg-slate-100 transition-colors shadow-sm"
            >
              Share Community Feedback
            </button>
            <button
              onClick={() => navigate('categories')}
              className="px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-[#0E9F8D] text-white hover:bg-[#0c8979] transition-colors"
            >
              Browse 100+ Verified Phrases
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
