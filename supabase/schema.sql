-- Supabase Database Schema for Gilgit Language Bridge
-- Includes phrases, ai_translation_logs, translation_feedback with Row Level Security (RLS)

-- 1. Phrases Table
CREATE TABLE IF NOT EXISTS public.phrases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_text TEXT NOT NULL,
  source_language TEXT NOT NULL,
  target_language TEXT,
  translated_text TEXT,
  romanized_translation TEXT DEFAULT '',
  translations JSONB DEFAULT '{}'::jsonb,
  pronunciations JSONB DEFAULT '{}'::jsonb,
  category TEXT DEFAULT 'Daily conversation',
  verified BOOLEAN DEFAULT true,
  approved_by TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexing for fast phrase matching
CREATE INDEX IF NOT EXISTS idx_phrases_lookup ON public.phrases(source_text, source_language, verified);
CREATE INDEX IF NOT EXISTS idx_phrases_category ON public.phrases(category);

-- 2. AI Translation Logs Table
CREATE TABLE IF NOT EXISTS public.ai_translation_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  source_text TEXT NOT NULL,
  source_language TEXT NOT NULL,
  target_language TEXT NOT NULL,
  translated_text TEXT NOT NULL,
  confidence TEXT CHECK (confidence IN ('high', 'medium', 'low')) DEFAULT 'medium',
  status TEXT CHECK (status IN ('translated', 'uncertain', 'unsupported')) DEFAULT 'translated',
  needs_human_review BOOLEAN DEFAULT true,
  provider TEXT DEFAULT 'gemini',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ai_logs_user ON public.ai_translation_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_logs_status ON public.ai_translation_logs(status, confidence);

-- 3. Translation Feedback Table
CREATE TABLE IF NOT EXISTS public.translation_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  translation_log_id UUID REFERENCES public.ai_translation_logs(id) ON DELETE SET NULL,
  phrase_id UUID REFERENCES public.phrases(id) ON DELETE SET NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  rating TEXT CHECK (rating IN ('accurate', 'needs_correction')) NOT NULL,
  suggested_translation TEXT DEFAULT '',
  feedback_note TEXT DEFAULT '',
  status TEXT CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_feedback_status ON public.translation_feedback(status);

-- Enable Row Level Security (RLS)
ALTER TABLE public.phrases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_translation_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.translation_feedback ENABLE ROW LEVEL SECURITY;

-- RLS Policies:
-- 1. Phrases: Everyone can read verified phrases; only service role / admin can insert/update/delete
CREATE POLICY "Public can view verified phrases"
  ON public.phrases FOR SELECT
  USING (verified = true);

CREATE POLICY "Admin can modify phrases"
  ON public.phrases FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin' OR (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin');

-- 2. AI Translation Logs: Only Edge Function / admin can write; users can view their own
CREATE POLICY "Users can view own translation logs"
  ON public.ai_translation_logs FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admin can view all translation logs"
  ON public.ai_translation_logs FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Service role can insert translation logs"
  ON public.ai_translation_logs FOR INSERT
  WITH CHECK (true);

-- 3. Translation Feedback: Any user/guest can submit feedback; only admin can update status
CREATE POLICY "Users can submit feedback"
  ON public.translation_feedback FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admin can view and manage all feedback"
  ON public.translation_feedback FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');
