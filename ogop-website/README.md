# One Girl One Promise (OGOP) — Website

Full-stack Next.js website with admin panel, backed by Neon PostgreSQL. Deploy-ready for Vercel.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Neon Database
1. Go to [neon.tech](https://neon.tech) and create a free account
2. Create a new project (e.g. `ogop-website`)
3. Copy the **Connection String** from the dashboard

### 3. Configure Environment Variables
Create a `.env.local` file in the root:
```env
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
JWT_SECRET=your-random-secret-string-here-at-least-32-chars
ADMIN_EMAIL=admin@ogop.org
ADMIN_PASSWORD=YourSecurePassword123!
```

### 4. Initialize & Seed the Database
```bash
node scripts/db-setup.js
```
This creates all tables and seeds initial data from the OGOP profile document.

### 5. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### 6. Access Admin Panel
Go to [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

Use the credentials you set in `.env.local`.

---

## 🌐 Deploy to Vercel

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/ogop-website.git
git push -u origin main
```

### 2. Import to Vercel
1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repo
3. Add environment variables:
   - `DATABASE_URL` — from Neon dashboard
   - `JWT_SECRET` — any long random string
   - `ADMIN_EMAIL` — your admin email
   - `ADMIN_PASSWORD` — your admin password
4. Click **Deploy**

### 3. Initialize DB on Production
After first deploy, run:
```bash
DATABASE_URL="your-neon-url" node scripts/db-setup.js
```

---

## 🔧 Admin Panel Features

Navigate to `/admin/login` → `/admin/dashboard`

| Section | What You Can Edit |
|---|---|
| **Hero** | Headline, tagline, subtitle, CTA buttons |
| **About** | Organization description, scripture, founder info |
| **Mission & Vision** | Vision, mission statement, all core values |
| **Programs** | Add/edit/delete programs (title, description, icon) |
| **Impact Stats** | Add/edit/delete statistics (value, label, icon) |
| **Success Stories** | Add/edit/delete stories |
| **Messages** | View, mark read/unread, delete contact form submissions |
| **Contact Info** | Address, phone, email, social media links |

---

## 📁 Project Structure

```
ogop-website/
├── app/
│   ├── page.tsx              # Main website (server-side)
│   ├── layout.tsx
│   ├── globals.css
│   ├── admin/
│   │   ├── login/page.tsx    # Admin login
│   │   └── dashboard/page.tsx # Full admin panel
│   └── api/
│       ├── auth/route.ts     # Login/logout/verify
│       ├── content/route.ts  # Site text content
│       ├── programs/route.ts # Programs CRUD
│       ├── stats/route.ts    # Impact stats CRUD
│       ├── stories/route.ts  # Success stories CRUD
│       ├── contact/route.ts  # Contact form + view messages
│       └── messages/route.ts # Mark read / delete messages
├── components/
│   ├── Navbar.tsx
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── MissionSection.tsx
│   ├── ProgramsSection.tsx
│   ├── ImpactSection.tsx
│   ├── ContactSection.tsx
│   └── Footer.tsx
├── lib/
│   ├── db.ts                 # Neon DB connection + table init
│   ├── auth.ts               # JWT helpers
│   └── seed.ts               # Initial data seed
└── scripts/
    └── db-setup.js           # Run once to init + seed DB
```

---

## 🎨 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: Neon (PostgreSQL serverless)
- **Auth**: JWT via HTTP-only cookies
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Hosting**: Vercel

---

## 🔑 Default Admin Credentials

Set in `.env.local`:
- **Email**: `admin@ogop.org` (or your `ADMIN_EMAIL`)
- **Password**: `Admin@OGOP2024` (or your `ADMIN_PASSWORD`)

**⚠️ Change the default password before deploying to production!**
