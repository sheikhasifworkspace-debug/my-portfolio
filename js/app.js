// ==============================================================================
// PORTFOLIO CLIENT APP & SUPABASE CONTROLLER
// ==============================================================================

// Initial Fallback Data (Active until Supabase credentials are connected)
const defaultProfile = {
  full_name: "Alex Rivers",
  headline: "Senior Full-Stack Engineer & Cloud Systems Architect",
  bio: "Passionate software engineer building resilient web applications, distributed backend services, and clean digital experiences with modern web technologies.",
  avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
  location: "San Francisco, CA & Remote",
  email: "alexrivers.dev@gmail.com",
  github_url: "https://github.com",
  linkedin_url: "https://linkedin.com",
  available_for_hire: true,
  years_experience: 5,
  projects_completed: 28,
  github_contributions: 1450,
};

const defaultProjects = [
  {
    id: "1",
    title: "Nexus Cloud Platform",
    tagline: "Real-time serverless observability & cloud resource monitoring suite",
    description: "A high-throughput telemetry analytics dashboard monitoring distributed microservices with live WebSocket charts, incident management, and automated threshold alerts.",
    category: "fullstack",
    tags: ["React", "TypeScript", "Node.js", "Supabase", "Tailwind CSS", "Docker"],
    image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    demo_url: "https://github.com",
    github_url: "https://github.com",
    featured: true,
  },
  {
    id: "2",
    title: "Aura AI Assistant",
    tagline: "Intelligent multi-model conversational agent with semantic vector search",
    description: "An enterprise conversational agent supporting contextual code analysis, PDF embeddings, streaming responses, and automated workflow triggers.",
    category: "ai",
    tags: ["Next.js", "Python", "FastAPI", "OpenAI", "Supabase Vector", "Tailwind"],
    image_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80",
    demo_url: "https://github.com",
    github_url: "https://github.com",
    featured: true,
  },
  {
    id: "3",
    title: "Pulse Commerce Engine",
    tagline: "Ultra-fast headless e-commerce store with Stripe webhook processing",
    description: "Headless e-commerce platform built for sub-100ms page transitions, dynamic inventory tracking, Stripe payments, and international checkout.",
    category: "fullstack",
    tags: ["React", "Tailwind CSS", "PostgreSQL", "Stripe API", "Render"],
    image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
    demo_url: "https://github.com",
    github_url: "https://github.com",
    featured: true,
  },
  {
    id: "4",
    title: "DevSync Realtime Collab",
    tagline: "Collaborative markdown editor and whiteboard for distributed teams",
    description: "Multi-cursor shared workspace with CRDT conflict-free synchronization, voice rooms, live markdown preview, and Git revision history.",
    category: "frontend",
    tags: ["React", "WebRTC", "Tailwind CSS", "WebSockets"],
    image_url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80",
    demo_url: "https://github.com",
    github_url: "https://github.com",
    featured: false,
  },
  {
    id: "5",
    title: "Gatekeeper Auth Service",
    tagline: "Distributed OAuth2/OIDC single sign-on authentication gateway",
    description: "High-security microservice handling JWT validation, token refresh rotations, rate limiting, OAuth 2.1 authentication flow, and granular RBAC permissions.",
    category: "backend",
    tags: ["Node.js", "Express", "Redis", "PostgreSQL", "Docker"],
    image_url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
    demo_url: "https://github.com",
    github_url: "https://github.com",
    featured: false,
  },
  {
    id: "6",
    title: "OmniMetrics CLI",
    tagline: "Developer productivity & terminal system monitoring utility",
    description: "Cross-platform command line dashboard delivering instantaneous CPU, memory, Docker container health, and network socket telemetry.",
    category: "backend",
    tags: ["Go", "Terminal UI", "System Metrics", "CLI"],
    image_url: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=900&q=80",
    demo_url: "https://github.com",
    github_url: "https://github.com",
    featured: false,
  }
];

const defaultSkills = [
  // Frontend
  { name: "React & Modern UI", category: "Frontend", proficiency: 95 },
  { name: "TypeScript & ES6+", category: "Frontend", proficiency: 92 },
  { name: "Tailwind CSS & Design", category: "Frontend", proficiency: 96 },
  { name: "HTML5 / CSS3 / Web APIs", category: "Frontend", proficiency: 98 },
  // Backend
  { name: "Node.js & Express", category: "Backend", proficiency: 94 },
  { name: "RESTful & GraphQL APIs", category: "Backend", proficiency: 92 },
  { name: "Python & FastAPI", category: "Backend", proficiency: 86 },
  // Database
  { name: "Supabase & PostgreSQL", category: "Database", proficiency: 95 },
  { name: "Redis Caching", category: "Database", proficiency: 88 },
  { name: "Prisma & Drizzle ORM", category: "Database", proficiency: 90 },
  // Cloud & DevOps
  { name: "Render Deployment", category: "Cloud & DevOps", proficiency: 94 },
  { name: "Docker Containers", category: "Cloud & DevOps", proficiency: 87 },
  { name: "GitHub Actions CI/CD", category: "Cloud & DevOps", proficiency: 91 },
  // Tools
  { name: "Git & GitHub Workflow", category: "Tools", proficiency: 96 },
  { name: "Figma Prototyping", category: "Tools", proficiency: 85 },
  { name: "Postman API Testing", category: "Tools", proficiency: 92 }
];

// App State
let supabaseClient = null;
let currentProjects = [...defaultProjects];
let currentSkills = [...defaultSkills];
let currentProfile = { ...defaultProfile };
let activeProjectFilter = 'all';
let activeSkillCategory = 'All';

// ==============================================================================
// SUPABASE CLIENT SETUP
// ==============================================================================
const DEFAULT_SUPABASE_URL = 'https://nhnutpvphmwkjlxzuljv.supabase.co';
const DEFAULT_SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5obnV0cHZwaG13a2pseHp1bGp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE4NzkxNzIsImV4cCI6MjEwNzQ1NTE3Mn0.kiS84Vo2XJ4eV9BFQVjFH3N5e0PwY_kuHb89ieRpr9Q';

function getSupabaseCredentials() {
  const url = localStorage.getItem('PORTFOLIO_SUPABASE_URL') || DEFAULT_SUPABASE_URL;
  const key = localStorage.getItem('PORTFOLIO_SUPABASE_KEY') || DEFAULT_SUPABASE_KEY;
  return { url: url.trim(), key: key.trim() };
}

function initSupabase() {
  const { url, key } = getSupabaseCredentials();
  if (url && key && url.startsWith('https://') && window.supabase) {
    try {
      supabaseClient = window.supabase.createClient(url, key);
      updateStatusBadge(true);
      return true;
    } catch (e) {
      console.error("Supabase init error:", e);
      supabaseClient = null;
      updateStatusBadge(false);
      return false;
    }
  } else {
    supabaseClient = null;
    updateStatusBadge(false);
    return false;
  }
}

function updateStatusBadge(isLive) {
  const badgeText = document.getElementById('db-status-text');
  const badgeDot = document.getElementById('db-status-dot');
  const badgeBtn = document.getElementById('db-status-pill');

  if (!badgeText || !badgeDot || !badgeBtn) return;

  if (isLive) {
    badgeText.textContent = "Supabase: Live";
    badgeDot.className = "w-2 h-2 rounded-full bg-emerald-400";
    badgeBtn.className = "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all bg-emerald-950/40 text-emerald-400 border-emerald-500/30 hover:border-emerald-400";
  } else {
    badgeText.textContent = "Supabase: Setup";
    badgeDot.className = "w-2 h-2 rounded-full bg-amber-400";
    badgeBtn.className = "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all bg-amber-950/40 text-amber-300 border-amber-500/30 hover:border-amber-400 animate-pulse-subtle";
  }
}

// Fetch dynamic data from Supabase
async function loadData() {
  if (!supabaseClient) {
    renderProjects();
    renderSkills();
    return;
  }

  try {
    // 1. Projects
    const { data: projectsData, error: projError } = await supabaseClient
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true });

    if (!projError && projectsData && projectsData.length > 0) {
      currentProjects = projectsData;
    }

    // 2. Skills
    const { data: skillsData, error: skillError } = await supabaseClient
      .from('skills')
      .select('*')
      .order('sort_order', { ascending: true });

    if (!skillError && skillsData && skillsData.length > 0) {
      currentSkills = skillsData;
    }

    // 3. Profile
    const { data: profileData, error: profError } = await supabaseClient
      .from('profile')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (!profError && profileData) {
      currentProfile = { ...currentProfile, ...profileData };
      applyProfileData();
    }
  } catch (err) {
    console.warn("Using fallback data due to fetch error:", err);
  } finally {
    renderProjects();
    renderSkills();
  }
}

function applyProfileData() {
  const nameEl = document.getElementById('hero-name');
  if (nameEl) nameEl.textContent = currentProfile.full_name;
  const headlineEl = document.getElementById('hero-headline');
  if (headlineEl) headlineEl.textContent = currentProfile.headline;
}

// ==============================================================================
// RENDERING FUNCTIONS
// ==============================================================================
function renderProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;

  const filtered = activeProjectFilter === 'all'
    ? currentProjects
    : currentProjects.filter(p => (p.category || '').toLowerCase() === activeProjectFilter.toLowerCase());

  container.innerHTML = filtered.map(p => `
    <div class="group rounded-2xl border overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl glass border-slate-800/90 hover:border-slate-700">
      <div class="relative h-48 w-full overflow-hidden bg-slate-900">
        <img
          src="${p.image_url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80'}"
          alt="${p.title}"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80"></div>
        ${p.featured ? `
          <div class="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500 text-slate-950 backdrop-blur-md shadow-md">
            <i data-lucide="star" class="w-3 h-3 fill-slate-950"></i>
            <span>Featured</span>
          </div>
        ` : ''}
        <div class="absolute top-3 right-3 px-2.5 py-0.5 rounded-md text-[10px] font-mono uppercase font-bold bg-slate-900/80 text-slate-200 border border-slate-700/60 backdrop-blur-md">
          ${p.category}
        </div>
      </div>

      <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 class="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
            ${p.title}
          </h3>
          ${p.tagline ? `<p class="text-xs font-medium text-teal-400 mt-1">${p.tagline}</p>` : ''}
          <p class="text-sm mt-3 line-clamp-3 leading-relaxed text-slate-400">
            ${p.description}
          </p>
        </div>

        <div class="space-y-4 pt-2">
          <div class="flex flex-wrap gap-1.5">
            ${(p.tags || []).map(tag => `
              <span class="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-800/60 text-slate-300 border border-slate-700/60">
                ${tag}
              </span>
            `).join('')}
          </div>

          <div class="flex items-center justify-between pt-4 border-t border-slate-800/60">
            <div class="flex items-center gap-3">
              ${p.github_url ? `
                <a href="${p.github_url}" target="_blank" rel="noreferrer" class="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
                  <i data-lucide="github" class="w-4 h-4"></i>
                  <span>Code</span>
                </a>
              ` : ''}
            </div>

            ${p.demo_url ? `
              <a href="${p.demo_url}" target="_blank" rel="noreferrer" class="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-600/10 hover:bg-indigo-600 text-indigo-400 hover:text-white border border-indigo-500/20 hover:border-transparent transition-all">
                <span>Live Demo</span>
                <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
              </a>
            ` : ''}
          </div>
        </div>
      </div>
    </div>
  `).join('');

  if (window.lucide) window.lucide.createIcons();
}

function renderSkills() {
  const container = document.getElementById('skills-container');
  if (!container) return;

  const filtered = activeSkillCategory === 'All'
    ? currentSkills
    : currentSkills.filter(s => (s.category || '').toLowerCase() === activeSkillCategory.toLowerCase());

  container.innerHTML = filtered.map(s => `
    <div class="p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.02] glass border-slate-800/80 hover:border-slate-700">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-2.5">
          <div class="p-2 rounded-lg bg-slate-800/40 border border-slate-700/50 text-indigo-400">
            <i data-lucide="cpu" class="w-4 h-4"></i>
          </div>
          <div>
            <h4 class="text-sm font-bold text-white">${s.name}</h4>
            <span class="text-[11px] font-mono text-slate-500">${s.category}</span>
          </div>
        </div>
        <span class="text-xs font-mono font-semibold text-indigo-400">${s.proficiency || 85}%</span>
      </div>
      <div class="w-full bg-slate-800/60 rounded-full h-1.5 overflow-hidden">
        <div class="bg-gradient-to-r from-indigo-500 to-teal-400 h-1.5 rounded-full" style="width: ${s.proficiency || 85}%"></div>
      </div>
    </div>
  `).join('');

  if (window.lucide) window.lucide.createIcons();
}

// ==============================================================================
// CONTACT FORM HANDLER (DIRECT INSERT INTO SUPABASE)
// ==============================================================================
async function handleContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('contact-name').value.trim();
  const email = document.getElementById('contact-email').value.trim();
  const subject = document.getElementById('contact-subject').value.trim() || 'Portfolio Inquiry';
  const message = document.getElementById('contact-message').value.trim();
  const statusEl = document.getElementById('contact-status-alert');
  const submitBtn = document.getElementById('contact-submit-btn');

  if (!name || !email || !message) {
    showStatusAlert('error', 'Please fill in all required fields.');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerHTML = `<span class="inline-block animate-spin mr-2">⏳</span> Sending to Supabase...`;

  try {
    if (supabaseClient) {
      const { error } = await supabaseClient.from('messages').insert([
        {
          name,
          email,
          subject,
          message,
          status: 'unread',
          created_at: new Date().toISOString()
        }
      ]);

      if (error) throw error;
      showStatusAlert('success', 'Thank you! Your message was saved directly into the Supabase PostgreSQL database.');
      document.getElementById('contact-form').reset();
    } else {
      // Demo preview mode
      await new Promise(r => setTimeout(r, 700));
      showStatusAlert('success', 'Message simulation successful! (Connect your Supabase database in the top banner to write live rows).');
      document.getElementById('contact-form').reset();
    }
  } catch (err) {
    showStatusAlert('error', `Failed to send message: ${err.message || 'Check database connection'}`);
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<span>Send Message</span> <i data-lucide="send" class="w-4 h-4 ml-2"></i>`;
    if (window.lucide) window.lucide.createIcons();
  }
}

function showStatusAlert(type, text) {
  const el = document.getElementById('contact-status-alert');
  if (!el) return;
  el.classList.remove('hidden', 'bg-emerald-500/10', 'text-emerald-400', 'border-emerald-500/30', 'bg-rose-500/10', 'text-rose-400', 'border-rose-500/30');

  if (type === 'success') {
    el.className = "p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2";
  } else {
    el.className = "p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2";
  }
  el.textContent = text;
}

// ==============================================================================
// DATABASE MODAL CONTROLS & TEST CONNECTION
// ==============================================================================
window.openDbModal = function() {
  const modal = document.getElementById('db-modal');
  if (!modal) return;
  const { url, key } = getSupabaseCredentials();
  document.getElementById('modal-supabase-url').value = url;
  document.getElementById('modal-supabase-key').value = key;
  modal.classList.remove('hidden');
};

window.closeDbModal = function() {
  const modal = document.getElementById('db-modal');
  if (modal) modal.classList.add('hidden');
};

window.saveDbCredentials = async function() {
  const url = document.getElementById('modal-supabase-url').value.trim();
  const key = document.getElementById('modal-supabase-key').value.trim();
  const feedback = document.getElementById('modal-feedback');

  localStorage.setItem('PORTFOLIO_SUPABASE_URL', url);
  localStorage.setItem('PORTFOLIO_SUPABASE_KEY', key);

  feedback.className = "p-3 rounded-lg text-xs bg-slate-800 text-slate-300";
  feedback.textContent = "Connecting and validating tables...";

  const success = initSupabase();
  if (success && supabaseClient) {
    try {
      const { data, error } = await supabaseClient.from('projects').select('id').limit(1);
      if (error) throw error;
      feedback.className = "p-3 rounded-lg text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30";
      feedback.textContent = "Connected! Successfully queried Supabase PostgreSQL database.";
      loadData();
    } catch (e) {
      feedback.className = "p-3 rounded-lg text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30";
      feedback.textContent = `Client initialized, but table query returned: ${e.message}. Ensure you ran supabase/schema.sql in the SQL Editor.`;
    }
  } else {
    feedback.className = "p-3 rounded-lg text-xs bg-rose-500/20 text-rose-300 border border-rose-500/30";
    feedback.textContent = "Please provide valid Supabase Project URL and Anon Key.";
  }
};

// ==============================================================================
// INITIALIZATION ON DOM READY
// ==============================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Lucide Icons
  if (window.lucide) window.lucide.createIcons();

  // Initialize Supabase & load data
  initSupabase();
  loadData();

  // Project Filter Tabs
  document.querySelectorAll('.project-filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.project-filter-btn').forEach(b => {
        b.className = "project-filter-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800";
      });
      btn.className = "project-filter-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-600/30";
      activeProjectFilter = btn.dataset.filter;
      renderProjects();
    });
  });

  // Skills Category Filter Tabs
  document.querySelectorAll('.skill-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.skill-filter-btn').forEach(b => {
        b.className = "skill-filter-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800";
      });
      btn.className = "skill-filter-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all bg-indigo-600 text-white shadow-md shadow-indigo-600/30 scale-105";
      activeSkillCategory = btn.dataset.category;
      renderSkills();
    });
  });

  // Contact Form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) contactForm.addEventListener('submit', handleContactSubmit);

  // Mobile Menu
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('hidden');
    });
  }
});
