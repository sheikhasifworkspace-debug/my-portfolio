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
INSERT INTO profile (full_name, headline, bio, location, email, github_url, linkedin_url, available_for_hire, years_experience, projects_completed, github_contributions)
VALUES (
    'Alex Rivers',
    'Senior Full-Stack Engineer & Cloud Systems Architect',
    'Crafting high-performance web applications, scalable distributed backend architectures, and elegant developer experiences with modern web technologies.',
    'San Francisco, CA & Remote',
    'alexrivers.dev@gmail.com',
    'https://github.com',
    'https://linkedin.com',
    true,
    5,
    28,
    1450
);

-- Projects
INSERT INTO projects (title, slug, tagline, description, category, tags, image_url, demo_url, github_url, featured, sort_order) VALUES
(
    'Nexus Cloud Platform',
    'nexus-cloud-platform',
    'Real-time serverless observability & cloud resource monitoring suite',
    'A high-throughput telemetry analytics dashboard monitoring distributed microservices with live WebSocket charts, incident management, and automated threshold alerts.',
    'fullstack',
    ARRAY['React', 'TypeScript', 'Node.js', 'Supabase', 'Tailwind CSS', 'Docker'],
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
    'https://example.com/demo1',
    'https://github.com',
    true,
    1
),
(
    'Aura AI Assistant',
    'aura-ai-assistant',
    'Intelligent multi-model conversational agent with semantic vector search',
    'An enterprise conversational agent supporting contextual code analysis, PDF embeddings, streaming responses, and custom workflow execution.',
    'ai',
    ARRAY['Next.js', 'Python', 'FastAPI', 'OpenAI', 'Supabase Vector', 'Tailwind'],
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80',
    'https://example.com/demo2',
    'https://github.com',
    true,
    2
),
(
    'Pulse Commerce Engine',
    'pulse-commerce-engine',
    'Ultra-fast headless e-commerce store with Stripe webhook processing',
    'Headless e-commerce platform built for instant sub-100ms page transitions, dynamic inventory tracking, Stripe payments, and international checkout.',
    'fullstack',
    ARRAY['React', 'Tailwind CSS', 'PostgreSQL', 'Stripe API', 'Render'],
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
    'https://example.com/demo3',
    'https://github.com',
    true,
    3
),
(
    'DevSync Realtime Collab',
    'devsync-realtime-collab',
    'Collaborative real-time markdown editor and whiteboard for agile teams',
    'Multi-cursor shared workspace with CRDT data synchronization, voice rooms, instant markdown preview, and Git revision history.',
    'frontend',
    ARRAY['React', 'WebRTC', 'Tailwind CSS', 'WebSockets', 'Vite'],
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80',
    'https://example.com/demo4',
    'https://github.com',
    false,
    4
),
(
    'Gatekeeper Auth Service',
    'gatekeeper-auth-service',
    'Distributed OAuth2/OIDC single sign-on authentication gateway',
    'High-security microservice handling JWT validation, rate limiting, OAuth 2.1 authentication flow, and granular RBAC permissions.',
    'backend',
    ARRAY['Node.js', 'Express', 'Redis', 'PostgreSQL', 'Docker'],
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80',
    'https://example.com/demo5',
    'https://github.com',
    false,
    5
);

-- Skills
INSERT INTO skills (name, category, icon, proficiency, featured, sort_order) VALUES
-- Frontend
('React & Next.js', 'Frontend', 'Code', 95, true, 1),
('TypeScript', 'Frontend', 'FileCode', 92, true, 2),
('Tailwind CSS', 'Frontend', 'Palette', 96, true, 3),
('HTML5 / CSS3 / ES6+', 'Frontend', 'Layout', 98, true, 4),
('Vite & Webpack', 'Frontend', 'Zap', 88, false, 5),

-- Backend
('Node.js & Express', 'Backend', 'Server', 94, true, 6),
('REST & GraphQL APIs', 'Backend', 'Cpu', 90, true, 7),
('Python & FastAPI', 'Backend', 'Terminal', 85, true, 8),
('Microservices', 'Backend', 'Network', 86, false, 9),

-- Database
('Supabase & PostgreSQL', 'Database', 'Database', 95, true, 10),
('Redis Caching', 'Database', 'Layers', 88, true, 11),
('Prisma & Drizzle ORM', 'Database', 'HardDrive', 89, false, 12),

-- Cloud & DevOps
('Render Deployment', 'Cloud & DevOps', 'Cloud', 92, true, 13),
('Docker & Containers', 'Cloud & DevOps', 'Box', 86, true, 14),
('CI/CD & GitHub Actions', 'Cloud & DevOps', 'GitBranch', 90, true, 15),
('Linux & Bash', 'Cloud & DevOps', 'Terminal', 87, false, 16),

-- Tools & Workflow
('Git & GitHub', 'Tools', 'GitMerge', 96, true, 17),
('Figma UI/UX', 'Tools', 'Figma', 84, true, 18),
('Postman / Bruno', 'Tools', 'Send', 92, false, 19);
