-- ==============================================================================
-- VIDEOS TABLE SETUP FOR SHEIKH ASIF PORTFOLIO
-- Paste & Run in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/nhnutpvphmwkjlxzuljv/sql/new
-- ==============================================================================

-- 1. Create table if not exists
CREATE TABLE IF NOT EXISTS videos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL DEFAULT 'Product Release',
    thumbnail_url TEXT,
    video_url TEXT NOT NULL,
    featured BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- 3. Policies: Anyone can view videos (Public Read)
CREATE POLICY "Allow public read on videos" ON videos
    FOR SELECT TO anon, authenticated USING (true);

-- 4. Policies: Allow public/admin insert, update, delete
CREATE POLICY "Allow anon insert on videos" ON videos
    FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow anon update on videos" ON videos
    FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow anon delete on videos" ON videos
    FOR DELETE TO anon, authenticated USING (true);
