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

-- 5. Seed Initial High-Quality Graphic Design Works (Behance 4:3 Ratio)
DELETE FROM recent_works;
INSERT INTO recent_works (title, client_name, category, image_url, behance_url, description, accent_color, sort_order) VALUES
(
    'Aura Minimalist Brand Identity',
    'Aura Studio',
    'Brand Identity',
    'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&h=900&q=80',
    'https://www.behance.net/sheikhalasif2023',
    'Full visual identity guidelines, modern vector typography system and stationery mockups.',
    '#7c3aed',
    1
),
(
    'Kinetic Typographic Exhibition Poster',
    'Bauhaus Lab',
    'Poster & Print',
    'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&h=900&q=80',
    'https://www.behance.net/sheikhalasif2023',
    'High-contrast experimental Swiss typography exploration for cultural arts showcase.',
    '#e11d48',
    2
),
(
    'Flora Organic Botanical Packaging',
    'Flora Co.',
    'Packaging Design',
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&h=900&q=80',
    'https://www.behance.net/sheikhalasif2023',
    'Sustainable eco-friendly cosmetic packaging suite with bespoke foil stamp embellishments.',
    '#059669',
    3
),
(
    'Veloce Streetwear Campaign & Social Art',
    'Veloce Apparel',
    'Social Media',
    'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&h=900&q=80',
    'https://www.behance.net/sheikhalasif2023',
    'Editorial social media graphic campaign, lookbook layout, and high-impact digital banners.',
    '#ec4899',
    4
),
(
    'Abstract 3D Spatial Geometry',
    'Metropolis Digital',
    'Visual Art',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=900&q=80',
    'https://www.behance.net/sheikhalasif2023',
    'Curated chromatic 3D surface explorations and tactile lighting compositions.',
    '#4338ca',
    5
),
(
    'Craft Coffee Bean Roast Packaging',
    'Nordic Roasters',
    'Packaging Design',
    'https://images.unsplash.com/photo-1559525839-8f8303f568a0?auto=format&fit=crop&w=1200&h=900&q=80',
    'https://www.behance.net/sheikhalasif2023',
    'Minimalist matte black coffee packaging series with metallic bronze stamp details.',
    '#f59e0b',
    6
);
