// Text-to-speech engine supporting Urdu, English, and regional phonetics

export function speakPhrase(text: string, language: string, pronunciation?: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Web Speech API is not supported in this environment.');
    return;
  }

  // Cancel any ongoing utterance
  window.speechSynthesis.cancel();

  // Clean text from bracketed annotations like "(Ju-le / Salam)"
  const cleanNative = text.replace(/\([^)]*\)/g, '').trim();
  const cleanPronunciation = (pronunciation || '').replace(/[?.,!/]/g, '').trim();

  const lang = language.toLowerCase();
  let utteranceText = cleanNative;
  let voiceLang = 'en-US';

  if (lang === 'english') {
    voiceLang = 'en-US';
    utteranceText = cleanNative;
  } else if (lang === 'urdu') {
    voiceLang = 'ur-PK';
    utteranceText = cleanNative;
  } else {
    // For indigenous regional languages (Shina, Balti, Burushaski):
    // Use the phonetic romanized guide if available, with a measured regional cadence
    voiceLang = 'ur-PK'; // Urdu phonetics match northern subcontinent vocal cords closely
    utteranceText = cleanPronunciation || cleanNative;
  }

  const utterance = new SpeechSynthesisUtterance(utteranceText);
  utterance.lang = voiceLang;
  utterance.rate = 0.88; // Slower, clearer pace for language learners
  utterance.pitch = 1.0;

  // Attempt to select an authentic regional voice if available
  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find(
    (v) =>
      v.lang.startsWith(voiceLang.slice(0, 2)) ||
      (lang === 'english' && v.lang.startsWith('en'))
  );

  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  window.speechSynthesis.speak(utterance);
}
