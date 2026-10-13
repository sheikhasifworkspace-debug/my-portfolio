-- ==============================================================================
-- SUPABASE PORTFOLIO DATABASE SCHEMA
-- Run this script in your Supabase SQL Editor (Dashboard -> SQL Editor -> New Query)
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. DROP TABLES IF THEY ALREADY EXIST (CLEAN REBUILD)
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS skills CASCADE;
DROP TABLE IF EXISTS profile CASCADE;

-- 3. PROFILE TABLE (Personal info, stats, socials)
CREATE TABLE profile (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL DEFAULT 'Dev Portfolio',
    headline TEXT NOT NULL DEFAULT 'Full-Stack Engineer & Cloud Builder',
    bio TEXT NOT NULL DEFAULT 'Passionate software engineer building resilient web applications, modern APIs, and beautiful user interfaces.',
    avatar_url TEXT DEFAULT 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    location TEXT DEFAULT 'San Francisco, CA / Remote',
    email TEXT DEFAULT 'contact@example.com',
    github_url TEXT DEFAULT 'https://github.com',
    linkedin_url TEXT DEFAULT 'https://linkedin.com',
    twitter_url TEXT DEFAULT 'https://x.com',
    resume_url TEXT DEFAULT '#',
    available_for_hire BOOLEAN DEFAULT true,
    years_experience INT DEFAULT 4,
    projects_completed INT DEFAULT 20,
    github_contributions INT DEFAULT 850,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. PROJECTS TABLE
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE,
    tagline TEXT,
    description TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'fullstack', -- 'fullstack', 'frontend', 'backend', 'ai', 'mobile'
    tags TEXT[] DEFAULT '{}',
    image_url TEXT,
    demo_url TEXT,
    github_url TEXT,
    featured BOOLEAN DEFAULT false,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. SKILLS TABLE
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    category TEXT NOT NULL, -- 'Frontend', 'Backend', 'Database', 'Cloud & DevOps', 'Tools'
    icon TEXT DEFAULT 'Code',
    proficiency INT DEFAULT 85, -- 0 to 100
    featured BOOLEAN DEFAULT true,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. CONTACT MESSAGES TABLE (Secure incoming messages)
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'unread', -- 'unread', 'read', 'archived'
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- PROFILE POLICIES:
-- Anyone can view profile
CREATE POLICY "Allow public read on profile" ON profile
    FOR SELECT TO anon, authenticated USING (true);

-- Authenticated users can modify profile
CREATE POLICY "Allow authenticated full access on profile" ON profile
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- PROJECTS POLICIES:
-- Anyone can view projects
CREATE POLICY "Allow public read on projects" ON projects
    FOR SELECT TO anon, authenticated USING (true);

-- Authenticated users can create/update/delete projects
CREATE POLICY "Allow authenticated full access on projects" ON projects
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- SKILLS POLICIES:
-- Anyone can view skills
CREATE POLICY "Allow public read on skills" ON skills
    FOR SELECT TO anon, authenticated USING (true);

-- Authenticated users can modify skills
CREATE POLICY "Allow authenticated full access on skills" ON skills
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- MESSAGES POLICIES (CRITICAL SECURITY):
-- Anyone (public visitor) can insert contact messages
CREATE POLICY "Allow public insert on messages" ON messages
    FOR INSERT TO anon, authenticated WITH CHECK (true);

-- ONLY authenticated users (you) can read submitted messages
CREATE POLICY "Allow authenticated read on messages" ON messages
    FOR SELECT TO authenticated USING (true);

-- ==============================================================================
-- SEED DATA (INITIAL DATA TO POPULATE YOUR PORTFOLIO)
-- ==============================================================================

-- Profile
INSERT INTO profile (full_name, headline, bio, avatar_url, location, email, github_url, linkedin_url, twitter_url, available_for_hire, years_experience, projects_completed, github_contributions)
VALUES (
    'Sheikh Al Asif',
    'Visual Artist | UI/UX Designer | Motion Editor',
    'Creative visual artist, UI/UX designer and frontend web developer based in Rajshahi, Bangladesh. Specializing in brand identity, user-centered product design, cinematic motion graphics, and responsive web experiences.',
    'https://github.com/sheikhasifworkspace-debug.png',
    'Rajshahi, Bangladesh',
    'sheikhalasif.work@gmail.com',
    'https://github.com/sheikhasifworkspace-debug',
    'https://www.linkedin.com/in/sheikhalasif',
    'https://www.behance.net/sheikhalasif2023',
    true,
    3,
    45,
    520
);

-- Projects
INSERT INTO projects (title, slug, tagline, description, category, tags, image_url, demo_url, github_url, featured, sort_order) VALUES
(
    'Brand Identity & Visual System',
    'brand-identity-visual-system',
    'Comprehensive corporate identity, typography guidelines & brand language',
    'A full-scale brand identity project showcasing precision vector logo design, custom typographic styling, color systems, and modern packaging applications.',
    'design',
    ARRAY['Adobe Illustrator', 'Photoshop', 'Brand Identity', 'Typography'],
    'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=900&q=80',
    'https://www.behance.net/sheikhalasif2023',
    'https://github.com/sheikhasifworkspace-debug/my-portfolio',
    true,
    1
),
(
    'E-Commerce Mobile & Web App UI/UX',
    'ecommerce-mobile-web-ui',
    'User-centered mobile shopping application & interactive checkout flow',
    'End-to-end product design focusing on user flow optimization, micro-interactions, dark/light design systems, and accessible mobile typography in Figma.',
    'uiux',
    ARRAY['Figma', 'UI/UX Design', 'Wireframing', 'Prototyping'],
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
    'https://www.behance.net/sheikhalasif2023',
    'https://github.com/sheikhasifworkspace-debug/my-portfolio',
    true,
    2
),
(
    'Cinematic Motion Graphics & Video Reel',
    'cinematic-motion-graphics-reel',
    'Dynamic kinetic typography, promo commercial cuts & visual storytelling',
    'A portfolio of high-impact commercial motion edits, rhythmic visual transitions, and promotional reels for brands, creators, and media campaigns.',
    'motion',
    ARRAY['After Effects', 'Premiere Pro', 'Motion Design', 'Video Editing'],
    'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=900&q=80',
    'https://www.behance.net/sheikhalasif2023',
    'https://github.com/sheikhasifworkspace-debug/my-portfolio',
    true,
    3
),
(
    'Editorial Visual Art & Digital Media Graphics',
    'editorial-visual-art-daily-observer',
    'Digital editorial layouts, infographical assets & publication media',
    'Visual designs and editorial graphics crafted for national media journalism and publication platforms (including work for The Daily Observer).',
    'design',
    ARRAY['Adobe Photoshop', 'Illustrator', 'Editorial Layout', 'Infographics'],
    'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=900&q=80',
    'https://www.behance.net/sheikhalasif2023',
    'https://github.com/sheikhasifworkspace-debug/my-portfolio',
    false,
    4
),
(
    'Nova Studio Interactive Web Experience',
    'nova-studio-interactive-web',
    'Creative agency web application with dark-mode glassmorphic aesthetics',
    'A high-performance modern web application built with responsive layout grids, dynamic interactions, and lightning-fast edge deployment.',
    'frontend',
    ARRAY['HTML5', 'Tailwind CSS', 'JavaScript', 'Render'],
    'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=900&q=80',
    'https://github.com/sheikhasifworkspace-debug/my-portfolio',
    'https://github.com/sheikhasifworkspace-debug/my-portfolio',
    false,
    5
),
(
    'Creator Studio Cloud Hub',
    'creator-studio-cloud-hub',
    'Digital creator showcase with live Supabase PostgreSQL backend integration',
    'Cloud-connected creator portfolio web app with real-time visitor inquiries, PostgreSQL data persistence, and continuous deployment.',
    'frontend',
    ARRAY['JavaScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS'],
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
    'https://github.com/sheikhasifworkspace-debug/my-portfolio',
    'https://github.com/sheikhasifworkspace-debug/my-portfolio',
    false,
    6
);

-- Skills
INSERT INTO skills (name, category, icon, proficiency, featured, sort_order) VALUES
-- UI/UX Design
('Figma & UI/UX Design', 'UI/UX Design', 'Layout', 95, true, 1),
('Design Systems & Wireframing', 'UI/UX Design', 'Layers', 92, true, 2),
('Mobile & Web UI Prototyping', 'UI/UX Design', 'Smartphone', 90, true, 3),
('User Flow & UX Research', 'UI/UX Design', 'Compass', 86, false, 4),

-- Visual Arts & Graphic Design
('Adobe Photoshop & Manipulation', 'Graphic Design', 'Palette', 96, true, 5),
('Adobe Illustrator & Vector Art', 'Graphic Design', 'PenTool', 94, true, 6),
('Brand Identity & Logo Design', 'Graphic Design', 'Award', 92, true, 7),
('Typography & Print Design', 'Graphic Design', 'Type', 88, false, 8),

-- Motion & Video
('Adobe Premiere Pro', 'Motion & Video', 'Video', 93, true, 9),
('After Effects & Motion Graphics', 'Motion & Video', 'Film', 89, true, 10),
('Kinetic Typography & VFX', 'Motion & Video', 'Sparkles', 86, false, 11),
('Color Grading & Commercial Cuts', 'Motion & Video', 'Camera', 88, false, 12),

-- Web & Frontend
('HTML5 & Semantic Structure', 'Web Development', 'Code', 95, true, 13),
('Tailwind CSS Framework', 'Web Development', 'Zap', 93, true, 14),
('JavaScript (ES6+) & Web APIs', 'Web Development', 'FileCode', 86, true, 15),
('Supabase Database & API', 'Web Development', 'Database', 88, true, 16),
('Git & GitHub Version Control', 'Web Development', 'GitBranch', 90, true, 17);
