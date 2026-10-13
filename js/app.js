// ==============================================================================
// PORTFOLIO CLIENT APP & SUPABASE CONTROLLER
// Sheikh Al Asif — Visual Artist, UI/UX Designer & Motion Editor
// ==============================================================================

// Authentic Profile Data for Sheikh Al Asif
const defaultProfile = {
  full_name: "Sheikh Al Asif",
  headline: "Visual Artist | UI/UX Designer | Motion Editor",
  bio: "Creative visual artist, UI/UX designer and frontend web developer based in Rajshahi, Bangladesh. Specializing in brand identity, user-centered product design, cinematic motion graphics, and responsive web experiences.",
  avatar_url: "https://github.com/sheikhasifworkspace-debug.png",
  location: "Rajshahi, Bangladesh",
  email: "sheikhalasif.work@gmail.com",
  github_url: "https://github.com/sheikhasifworkspace-debug",
  linkedin_url: "https://www.linkedin.com/in/sheikhalasif",
  behance_url: "https://www.behance.net/sheikhalasif2023",
  available_for_hire: true,
  years_experience: 3,
  projects_completed: 45,
  github_contributions: 520,
};

// Curated Creative Works for Sheikh Al Asif
const defaultProjects = [
  {
    id: "1",
    title: "Brand Identity & Visual System",
    tagline: "Comprehensive corporate identity, typography guidelines & brand language",
    description: "A full-scale brand identity project showcasing precision vector logo design, custom typographic styling, color systems, and modern packaging applications.",
    category: "design",
    tags: ["Adobe Illustrator", "Photoshop", "Brand Identity", "Typography"],
    image_url: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=900&q=80",
    demo_url: "https://www.behance.net/sheikhalasif2023",
    github_url: "https://github.com/sheikhasifworkspace-debug/my-portfolio",
    featured: true,
  },
  {
    id: "2",
    title: "E-Commerce Mobile & Web App UI/UX",
    tagline: "User-centered mobile shopping application & interactive checkout flow",
    description: "End-to-end product design focusing on user flow optimization, micro-interactions, dark/light design systems, and accessible mobile typography in Figma.",
    category: "uiux",
    tags: ["Figma", "UI/UX Design", "Wireframing", "Prototyping"],
    image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    demo_url: "https://www.behance.net/sheikhalasif2023",
    github_url: "https://github.com/sheikhasifworkspace-debug/my-portfolio",
    featured: true,
  },
  {
    id: "3",
    title: "Cinematic Motion Graphics & Video Reel",
    tagline: "Dynamic kinetic typography, promo commercial cuts & visual storytelling",
    description: "A portfolio of high-impact commercial motion edits, rhythmic visual transitions, and promotional reels for brands, creators, and media campaigns.",
    category: "motion",
    tags: ["After Effects", "Premiere Pro", "Motion Design", "Video Editing"],
    image_url: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=900&q=80",
    demo_url: "https://www.behance.net/sheikhalasif2023",
    github_url: "https://github.com/sheikhasifworkspace-debug/my-portfolio",
    featured: true,
  },
  {
    id: "4",
    title: "Editorial Visual Art & Digital Media Graphics",
    tagline: "Digital editorial layouts, infographical assets & publication media",
    description: "Visual designs and editorial graphics crafted for national media journalism and publication platforms (including work for The Daily Observer).",
    category: "design",
    tags: ["Adobe Photoshop", "Illustrator", "Editorial Layout", "Infographics"],
    image_url: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=900&q=80",
    demo_url: "https://www.behance.net/sheikhalasif2023",
    github_url: "https://github.com/sheikhasifworkspace-debug/my-portfolio",
    featured: false,
  },
  {
    id: "5",
    title: "Nova Studio Interactive Web Experience",
    tagline: "Creative agency web application with dark-mode glassmorphic aesthetics",
    description: "A high-performance modern web application built with responsive layout grids, dynamic interactions, and lightning-fast edge deployment.",
    category: "frontend",
    tags: ["HTML5", "Tailwind CSS", "JavaScript", "Render"],
    image_url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=900&q=80",
    demo_url: "https://github.com/sheikhasifworkspace-debug/my-portfolio",
    github_url: "https://github.com/sheikhasifworkspace-debug/my-portfolio",
    featured: false,
  },
  {
    id: "6",
    title: "Creator Studio Cloud Hub",
    tagline: "Digital creator showcase with live Supabase PostgreSQL backend integration",
    description: "Cloud-connected creator portfolio web app with real-time visitor inquiries, PostgreSQL data persistence, and continuous deployment.",
    category: "frontend",
    tags: ["JavaScript", "Supabase", "PostgreSQL", "Tailwind CSS"],
    image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
    demo_url: "https://github.com/sheikhasifworkspace-debug/my-portfolio",
    github_url: "https://github.com/sheikhasifworkspace-debug/my-portfolio",
    featured: false,
  }
];

// Authentic Skills for Sheikh Al Asif
const defaultSkills = [
  // UI/UX Design
  { name: "Figma & UI/UX Design", category: "UI/UX Design", proficiency: 95, icon: "layout" },
  { name: "Design Systems & Wireframing", category: "UI/UX Design", proficiency: 92, icon: "layers" },
  { name: "Mobile & Web UI Prototyping", category: "UI/UX Design", proficiency: 90, icon: "smartphone" },
  { name: "User Flow & UX Research", category: "UI/UX Design", proficiency: 86, icon: "compass" },

  // Visual Arts & Graphic Design
  { name: "Adobe Photoshop & Manipulation", category: "Graphic Design", proficiency: 96, icon: "palette" },
  { name: "Adobe Illustrator & Vector Art", category: "Graphic Design", proficiency: 94, icon: "pen-tool" },
  { name: "Brand Identity & Logo Design", category: "Graphic Design", proficiency: 92, icon: "award" },
  { name: "Typography & Print Design", category: "Graphic Design", proficiency: 88, icon: "type" },

  // Motion & Video
  { name: "Adobe Premiere Pro", category: "Motion & Video", proficiency: 93, icon: "video" },
  { name: "After Effects & Motion Graphics", category: "Motion & Video", proficiency: 89, icon: "film" },
  { name: "Kinetic Typography & VFX", category: "Motion & Video", proficiency: 86, icon: "sparkles" },
  { name: "Color Grading & Commercial Cuts", category: "Motion & Video", proficiency: 88, icon: "camera" },

  // Web & Frontend
  { name: "HTML5 & Semantic Structure", category: "Web Development", proficiency: 95, icon: "file-code" },
  { name: "Tailwind CSS Framework", category: "Web Development", proficiency: 93, icon: "zap" },
  { name: "JavaScript (ES6+) & Web APIs", category: "Web Development", proficiency: 86, icon: "code" },
  { name: "Supabase Database & API", category: "Web Development", proficiency: 88, icon: "database" },
  { name: "Git & GitHub Version Control", category: "Web Development", proficiency: 90, icon: "git-branch" }
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
      // Guard: Ignore outdated placeholder projects
      const isPlaceholder = projectsData.some(p => (p.title || '').includes('Nexus Cloud') || (p.title || '').includes('Aura AI'));
      if (!isPlaceholder) {
        currentProjects = projectsData;
      }
    }

    // 2. Skills
    const { data: skillsData, error: skillError } = await supabaseClient
      .from('skills')
      .select('*')
      .order('sort_order', { ascending: true });

    if (!skillError && skillsData && skillsData.length > 0) {
      // Guard: Ignore outdated placeholder skills
      const isPlaceholder = skillsData.some(s => s.name === 'React & Next.js' || s.name === 'Node.js & Express');
      if (!isPlaceholder) {
        currentSkills = skillsData;
      }
    }

    // 3. Profile
    const { data: profileData, error: profError } = await supabaseClient
      .from('profile')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (!profError && profileData && profileData.full_name !== 'Alex Rivers') {
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
    <div class="group rounded-2xl border overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl glass border-slate-800/90 hover:border-purple-500/50">
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
        <div class="absolute top-3 right-3 px-2.5 py-0.5 rounded-md text-[10px] font-mono uppercase font-bold bg-slate-900/80 text-purple-300 border border-purple-500/30 backdrop-blur-md">
          ${p.category}
        </div>
      </div>

      <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 class="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
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
                  <span>Project</span>
                </a>
              ` : ''}
            </div>

            ${p.demo_url ? `
              <a href="${p.demo_url}" target="_blank" rel="noreferrer" class="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-purple-600/10 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/20 hover:border-transparent transition-all">
                <span>View Work</span>
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

function getSkillIcon(skill) {
  if (skill.icon) return skill.icon;
  const cat = (skill.category || '').toLowerCase();
  if (cat.includes('ui') || cat.includes('ux')) return 'layout';
  if (cat.includes('graphic') || cat.includes('brand')) return 'pen-tool';
  if (cat.includes('motion') || cat.includes('video')) return 'film';
  return 'code';
}

function renderSkills() {
  const container = document.getElementById('skills-container');
  if (!container) return;

  const filtered = activeSkillCategory === 'All'
    ? currentSkills
    : currentSkills.filter(s => (s.category || '').toLowerCase() === activeSkillCategory.toLowerCase());

  container.innerHTML = filtered.map(s => `
    <div class="p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.02] glass border-slate-800/80 hover:border-purple-500/40">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-2.5">
          <div class="p-2 rounded-lg bg-slate-800/40 border border-slate-700/50 text-purple-400">
            <i data-lucide="${getSkillIcon(s)}" class="w-4 h-4"></i>
          </div>
          <div>
            <h4 class="text-sm font-bold text-white">${s.name}</h4>
            <span class="text-[11px] font-mono text-slate-500">${s.category}</span>
          </div>
        </div>
        <span class="text-xs font-mono font-semibold text-purple-400">${s.proficiency || 85}%</span>
      </div>
      <div class="w-full bg-slate-800/60 rounded-full h-1.5 overflow-hidden">
        <div class="bg-gradient-to-r from-purple-500 via-pink-500 to-teal-400 h-1.5 rounded-full" style="width: ${s.proficiency || 85}%"></div>
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
  const submitBtn = document.getElementById('contact-submit-btn');

  if (!name || !email || !message) {
    showStatusAlert('error', 'Please fill in all required fields.');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerHTML = `<span class="inline-block animate-spin mr-2">⏳</span> Sending inquiry to Supabase...`;

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
      showStatusAlert('success', 'Thank you! Your message was delivered directly into Sheikh Al Asif\'s Supabase database.');
      document.getElementById('contact-form').reset();
    } else {
      // Offline fallback
      await new Promise(r => setTimeout(r, 700));
      showStatusAlert('success', 'Message simulation successful! (Your Supabase client is ready in live mode).');
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
      feedback.textContent = `Client initialized, but table query returned: ${e.message}. Ensure you ran Update-My-Real-Info.sql in the SQL Editor.`;
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
    btn.addEventListener('click', () => {
      document.querySelectorAll('.project-filter-btn').forEach(b => {
        b.className = "project-filter-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800";
      });
      btn.className = "project-filter-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30";
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
      btn.className = "skill-filter-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all bg-purple-600 text-white shadow-md shadow-purple-600/30 scale-105";
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
