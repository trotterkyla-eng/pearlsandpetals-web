# Pearls & Petals Website (Next.js)

Soft-heritage, pearl-pink starter site for **pearlsandpetals.org**.

## Run locally
1) Install Node.js 18+
2) In this folder:
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Deploy to Vercel (visual steps)
1) Create a GitHub repo named `pearlsandpetals-web`
2) Upload the contents of this folder to the repo (app/, components/, package.json, etc.)
3) In Vercel:
   - Add New → Project
   - Import the GitHub repo
   - Deploy
4) Connect domain:
   - Project → Settings → Domains → add `pearlsandpetals.org`
   - Copy the DNS records Vercel provides into your domain registrar

Pages included:
- `/` Home
- `/join` Join
- `/partner` Partner
