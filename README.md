# 🚀 Modern Developer Portfolio Web App

A modern, fast, responsive developer portfolio web application powered by **Render** (Hosting), **GitHub** (Version Control & CI/CD), and **Supabase** (PostgreSQL Database).

---

## ✨ Features

- **⚡ Blazingly Fast**: Zero build overhead. Opens directly in any browser with instant sub-second rendering.
- **🎨 Modern Web App Design**: Glassmorphic dark UI, animated glowing gradients, and responsive navigation drawer.
- **🗄️ Supabase PostgreSQL Integration**:
  - `projects`: Dynamic portfolio projects with tags, category filters, and live demo links.
  - `skills`: Proficiency metrics categorized by Frontend, Backend, Database, Cloud & DevOps, and Tools.
  - `messages`: Visitor contact form that safely writes submissions into PostgreSQL.
  - **Row Level Security (RLS)**: Public read for projects/skills; secure public insert for contact inquiries; private admin read for incoming messages.
- **☁️ 1-Click Render Deployment**: Configured with `render.yaml` for instant static site hosting with global CDN and automated SSL/HTTPS.
- **📱 Fully Responsive**: Optimized for mobile, tablet, and desktop viewports.

---

## 📁 Project Structure

```
Portfolio/
├── index.html            # Main web application entry point
├── css/
│   └── styles.css        # Glassmorphic UI & custom animations
├── js/
│   └── app.js            # Supabase database client & UI interactivity
├── supabase/
│   └── schema.sql        # PostgreSQL tables, RLS policies & starter data
├── render.yaml           # Render Static Site blueprint specification
├── README.md             # Complete step-by-step documentation
└── .gitignore            # Git configuration
```

---

## 🛠️ Step-by-Step Setup Guide

### Step 1: Test Locally (Instant Preview)
- Open `index.html` directly in your browser (Double click it, or right click -> **Open with Brave / Chrome / Edge**).
- The portfolio works immediately with built-in preview data and responsive animations.

---

### Step 2: Set Up Supabase Database

1. Open [Supabase.com](https://supabase.com) and create or sign in to your free account.
2. Click **"New Project"**, name it (e.g. `portfolio-db`), set a database password, and select your region.
3. Once the project is created:
   - Navigate to the **SQL Editor** in the left sidebar.
   - Click **"New Query"**.
   - Open [supabase/schema.sql](file:///c:/Users/DUNE/Desktop/Portfolio/supabase/schema.sql), copy all contents, paste it into the Supabase SQL Editor, and click **Run**.
   - This creates all tables (`projects`, `skills`, `profile`, `messages`), Row Level Security policies, and seeds sample data!
4. Get your API Keys:
   - Go to **Project Settings** (gear icon) -> **API**.
   - Copy your **Project URL** (e.g., `https://xyzcompany.supabase.co`).
   - Copy your **`anon` `public` Key**.
5. Connect your keys:
   - In your portfolio web app, click the **"Supabase: Setup"** pill in the top navbar.
   - Paste your URL and Anon Key, then click **"Save & Test Connection"**!

---

### Step 3: Push to GitHub

1. Open [GitHub.com](https://github.com) and create a **New Repository** (e.g. `my-portfolio`). Leave it empty (without initializing README or license).
2. In your terminal or command prompt inside this folder:
   ```bash
   git add .
   git commit -m "feat: initial commit of modern portfolio web app"
   git branch -M main
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/my-portfolio.git
   git push -u origin main
   ```

---

### Step 4: Deploy Live on Render (100% Free)

1. Open [Render.com](https://render.com) and sign in (you can log in directly with your GitHub account).
2. Click **"New +"** in the top right -> **"Static Site"**.
3. Select your GitHub repository (`my-portfolio`).
4. Configure the settings:
   - **Name**: `my-developer-portfolio`
   - **Branch**: `main`
   - **Build Command**: *(leave blank)*
   - **Publish Directory**: `.`
5. Click **"Create Static Site"**.
6. Render will publish your site in less than 10 seconds and give you a live URL like `https://my-developer-portfolio.onrender.com`!
