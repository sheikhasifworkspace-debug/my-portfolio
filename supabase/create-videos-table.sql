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

-- 5. Insert Sample Motion / Video Works
DELETE FROM videos;
INSERT INTO videos (title, description, category, thumbnail_url, video_url, sort_order) VALUES
(
    'Human Behavior',
    'A YC-backed AI platform that decodes user behavior from session replays.',
    'Product Release',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    1
),
(
    'ClickUp 4.0',
    'The world''s #1 work platform that replaces every productivity tool teams use.',
    'Product Release',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    2
),
(
    'Lumana',
    'Enterprise AI video security platform powered by computer vision.',
    'Product Release',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    3
),
(
    'SaaS Launch Promo Reel',
    'High energy kinetic typography cut for modern fintech venture.',
    'Launch Video',
    'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=900&q=80',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    4
),
(
    'Interactive Walkthrough Demo',
    'In-person live interactive software demonstration and keynote visual cut.',
    'In-Person Demo',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    5
),
(
    'Brand Identity Kinetic Visuals',
    'Artistic motion design loop and 3D visual language exploration.',
    'Others',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=80',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    6
);
