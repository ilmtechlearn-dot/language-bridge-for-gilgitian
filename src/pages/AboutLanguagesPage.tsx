import React from 'react';
import { LANGUAGES } from '../types';
import { BookOpen, MapPin, Globe, History, ArrowRight } from 'lucide-react';

interface AboutLanguagesPageProps {
  navigate: (page: string, params?: any) => void;
}

export const AboutLanguagesPage: React.FC<AboutLanguagesPageProps> = ({ navigate }) => {
  return (
    <div className="py-10 sm:py-16 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0F4C81] dark:text-sky-400 uppercase tracking-wider mb-2">
            <span>Northern Heritage & Dialectology</span>
            <span aria-hidden="true">·</span>
            <span>Karakoram & Western Himalayas</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Linguistic Heritage of Gilgit-Baltistan
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-4 leading-relaxed">
            Gilgit-Baltistan is one of the most culturally and linguistically diverse high-altitude crossroads in the world. Nestled at the convergence of three great mountain ranges—the Himalayas, Karakorams, and Hindukush—its valleys nurture language families spanning millennia.
          </p>
        </div>

        {/* Detailed Language Sections */}
        <div className="space-y-12">
          {/* 1. Shina */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-semibold text-[#0F4C81] dark:text-sky-400 uppercase">Dardic Branch · Indo-Aryan</span>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Shina (شینا)</h2>
              </div>
              <span className="text-2xl font-bold font-urdu text-[#0F4C81] dark:text-sky-400">شینا زبان</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600 dark:text-slate-400 mb-6">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#0F4C81] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 dark:text-white mb-0.5">Primary Valleys</strong>
                  <span>Gilgit City, Diamer (Chilas), Astore, Ghizer (Punial), Haramosh, Gurez.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Globe className="w-4 h-4 text-[#0E9F8D] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 dark:text-white mb-0.5">Estimated Speakers</strong>
                  <span>~600,000+ native speakers across northern Pakistan and adjacent high valleys.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <BookOpen className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 dark:text-white mb-0.5">Script & Orthography</strong>
                  <span>Modified Perso-Arabic (Shina alphabet) with unique retroflex character marks.</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Shina is the majority regional language of Gilgit and Diamer. It is tonally rich, featuring distinction between high and falling tones that alter word meaning. Shina preserves archaic vocabulary from ancient Indo-Aryan that has disappeared from sister languages on the plains.
            </p>

            <button
              onClick={() => navigate('categories', { category: 'Greetings' })}
              className="text-xs font-semibold text-[#0F4C81] dark:text-sky-400 hover:underline inline-flex items-center gap-1"
            >
              <span>Explore verified Shina phrases</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 2. Balti */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-semibold text-[#0E9F8D] uppercase">Tibetic Branch · Sino-Tibetan</span>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Balti (بلتی)</h2>
              </div>
              <span className="text-2xl font-bold font-urdu text-[#0E9F8D]">بلتی زکد</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600 dark:text-slate-400 mb-6">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#0E9F8D] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 dark:text-white mb-0.5">Primary Valleys</strong>
                  <span>Skardu, Shigar, Kharmang, Ghanche (Khaplu), Rondu valley.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Globe className="w-4 h-4 text-[#0F4C81] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 dark:text-white mb-0.5">Estimated Speakers</strong>
                  <span>~400,000+ speakers in Baltistan and diaspora across Pakistan.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <BookOpen className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 dark:text-white mb-0.5">Script & Orthography</strong>
                  <span>Perso-Arabic (Nastaliq/Naskh) with historical preservation in Tibetan Yige.</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Balti is of immense interest to global linguists because it preserves consonant clusters and pronunciations of Old Tibetan from the 7th to 9th centuries that have been lost in modern Central Lhasa Tibetan. Greetings like <em>"Ju-le"</em> reflect the deep hospitality of Baltistan's mountain oasis villages.
            </p>

            <button
              onClick={() => navigate('categories', { category: 'Travel' })}
              className="text-xs font-semibold text-[#0E9F8D] hover:underline inline-flex items-center gap-1"
            >
              <span>Explore verified Balti phrases</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3. Burushaski */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase">
                  Language Isolate · Unique Global Wonder
                </span>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Burushaski (بروشسکی)</h2>
              </div>
              <span className="text-2xl font-bold font-urdu text-amber-600 dark:text-amber-400">بروشسکی</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600 dark:text-slate-400 mb-6">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 dark:text-white mb-0.5">Primary Valleys</strong>
                  <span>Hunza (Karimabad, Aliabad), Nagar Valley, and Yasin Valley in Ghizer.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Globe className="w-4 h-4 text-[#0F4C81] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 dark:text-white mb-0.5">Estimated Speakers</strong>
                  <span>~110,000 native speakers (Burusho people).</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <History className="w-4 h-4 text-[#0E9F8D] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 dark:text-white mb-0.5">Linguistic Classification</strong>
                  <span>Completely isolated. Has no proven genealogical relationship to any other language family.</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Burushaski is considered a living linguistic fossil by international typologists. It likely represents the indigenous pre-Indo-European language spoken in Central Asia and the Subcontinent before Indo-Aryan migrations. It features a four-gender grammatical system (human male, human female, countable objects, and uncountables) with an intricate vigesimal (base-20) counting structure.
            </p>

            <button
              onClick={() => navigate('categories', { category: 'Tourist communication' })}
              className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center gap-1"
            >
              <span>Explore verified Burushaski phrases</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 4. Urdu & English */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                Urdu (اردو)
              </h3>
              <p className="text-xs text-slate-500 mb-3">Lingua Franca of Administration, Education & Trade</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Urdu serves as the shared inter-valley medium of communication connecting Shina speakers from Gilgit with Balti speakers in Skardu and Burusho speakers in Hunza. The platform ensures authentic Nastaliq rendering for native comfort.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                English
              </h3>
              <p className="text-xs text-slate-500 mb-3">Global Expedition, Trekking & International Tourism</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                As hundreds of thousands of international trekkers and researchers visit K2, Nanga Parbat, Rakaposhi, and Deosai, English is critical for respectful cross-cultural exchange, medical emergencies, and safety.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
