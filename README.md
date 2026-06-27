# JC Resource Lab — Complete Deployment Guide

## What's included

| File | Purpose |
|---|---|
| `server.js` | Backend + frontend server (Node.js / Express) |
| `frontend_b64.txt` | Your React frontend (base64-encoded, read by server.js) |
| `frontend_decoded.js` | Human-readable source of the frontend (reference only) |
| `package.json` | Node.js dependencies |
| `schema.sql` | Supabase database schema |
| `.env` | Environment variables (fill in your values) |

---

## ✅ Changes applied in this build

### 1. About Us Page
- **Mohan M Gowda** now displays his qualifications directly below his name:
  ```
  Mohan M Gowda
  [B.E, M.Tech, B.Ed]
  Founder & Educator
  ```

### 2. Contact Us Page — Mobile Fix
- "Send Message" button is now fully visible on all screen sizes (320px – desktop)
- No horizontal scrolling
- Form and button never get clipped by overflow:hidden on any viewport
- All inputs use width:100% + box-sizing:border-box

---

## STEP 1 — Supabase Setup (one-time)

1. Go to https://supabase.com and create a free project
2. In the left sidebar click **SQL Editor**
3. Paste the entire contents of `schema.sql` and click **Run**
4. This creates all tables, the storage bucket, and the admin user

### Get your Supabase credentials
- Go to **Settings → API**
- Copy **Project URL** → this is your `SUPABASE_URL`
- Copy **service_role** secret (NOT the anon key) → this is your `SUPABASE_SERVICE_ROLE_KEY`

---

## STEP 2 — Configure .env

Open `.env` and fill in your values:

```
SUPABASE_URL=https://abcdefghijklm.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.YOUR_LONG_KEY_HERE
JWT_SECRET=any-long-random-string-at-least-32-characters-long
PORT=5000
```

> ⚠️ Never commit `.env` to Git — it's already in `.gitignore`

---

## STEP 3 — Install & Run Locally

```bash
# Install dependencies (only needed once)
npm install

# Start the server
npm start
```

Open http://localhost:5000 in your browser.

**Admin login:**
- Email: `admin@jcrl.com`
- Password: `admin123`

> 💡 For development with auto-restart: `npm run dev` (uses nodemon)

---

## STEP 4 — Deploy to Production

### Option A: Render.com (Free, Recommended)

1. Push this folder to a GitHub repository
2. Go to https://render.com → New → Web Service
3. Connect your GitHub repo
4. Set:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Under **Environment**, add all 3 variables from your `.env`
6. Click **Create Web Service**

### Option B: Railway.app

1. Push to GitHub
2. Go to https://railway.app → New Project → Deploy from GitHub
3. Add environment variables in the Railway dashboard
4. Railway auto-detects Node.js and deploys

### Option C: VPS / Ubuntu Server

```bash
# On your server
git clone YOUR_REPO_URL
cd JCResourceLab
cp .env.example .env   # then fill in values
npm install

# Install PM2 to keep it running
npm install -g pm2
pm2 start server.js --name jcrl
pm2 startup   # auto-start on reboot
pm2 save
```

---

## File Structure

```
JCResourceLab/
├── server.js              ← Main server (do not delete)
├── frontend_b64.txt       ← Frontend source (do not delete)
├── frontend_decoded.js    ← Human-readable frontend (reference)
├── package.json           ← Dependencies
├── schema.sql             ← Run once in Supabase SQL Editor
├── .env                   ← Your secrets (never commit to Git)
└── .gitignore
```

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `Supabase connection FAILED` | Check SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env |
| `Cannot find module` | Run `npm install` |
| Login says "Account not approved" | Go to Admin → Students → Approve the account |
| Files not uploading | Check storage bucket exists in Supabase (re-run schema.sql) |
| Port already in use | Change `PORT=5000` to `PORT=3001` in .env |

---

## Admin Credentials (change after first login)

- Email: `admin@jcrl.com`
- Password: `admin123`

Change the password via: Profile icon → Change Password
