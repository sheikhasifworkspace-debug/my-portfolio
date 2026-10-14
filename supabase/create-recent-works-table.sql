-- ==============================================================================
-- RECENT WORKS (GRAPHIC DESIGN / BEHANCE SHOWCASE) TABLE SETUP
-- Sheikh Asif Portfolio
-- Run in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/nhnutpvphmwkjlxzuljv/sql/new
-- ==============================================================================

-- 1. Create recent_works table with Behance 4:3 project support
CREATE TABLE IF NOT EXISTS recent_works (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    client_name TEXT DEFAULT 'Self / Concept',
    category TEXT NOT NULL DEFAULT 'Graphic Design',
    image_url TEXT NOT NULL,
    behance_url TEXT,
    description TEXT,
    accent_color TEXT DEFAULT '#7c3aed',
    featured BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE recent_works ENABLE ROW LEVEL SECURITY;

-- 3. Policies: Anyone can view (Public Read)
CREATE POLICY "Allow public read on recent_works" ON recent_works
    FOR SELECT TO anon, authenticated USING (true);

-- 4. Policies: Allow insert, update, delete for public / admin
CREATE POLICY "Allow anon insert on recent_works" ON recent_works
    FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Drop old update policy if exists and create new one
DROP POLICY IF EXISTS "Allow anon update on recent_works" ON recent_works;
CREATE POLICY "Allow anon update on recent_works" ON recent_works
    FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

-- Drop old delete policy if exists and create new one
DROP POLICY IF EXISTS "Allow anon delete on recent_works" ON recent_works;
CREATE POLICY "Allow anon delete on recent_works" ON recent_works
    FOR DELETE TO anon, authenticated USING (true);

