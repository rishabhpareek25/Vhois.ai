# Vhois.ai Frontend

## Run Locally (Frontend + API)

```bash
npm install          # installs frontend + server deps (postinstall)
npm run dev          # starts Vite (:5173) + waitlist API (:3001)
```

Open: `http://localhost:5173` · Waitlist: `http://localhost:5173/waitlist`

Frontend only (no waitlist submissions): `npm run dev:web`

**Admin key (dev):** `vhois-admin-dev` (set in `.env` as `ADMIN_SECRET`)

Data is stored in SQLite: `data/waitlist.db`

## Run Full Stack (optional .env)

```bash
npm install
cp .env.example .env
npm run dev
```

- Frontend: `http://localhost:5173`
- API: `http://localhost:3001`
- Admin dashboard: `http://localhost:5173/admin/waitlist`

**Admin key (dev):** `vhois-admin-dev` (set in `.env` as `ADMIN_SECRET`)

Data is stored in SQLite: `data/waitlist.db`

## Deploy to AWS Amplify (frontend)

Connect GitHub repo in Amplify; `amplify.yml` builds `dist/`. SPA routing uses `public/_redirects` (or add a rewrite in Amplify Console → Hosting → Rewrites and redirects).

## Waitlist API on production

Amplify does not run the Express server. Deploy Lambda + DynamoDB:

See **[docs/DEPLOY_API.md](docs/DEPLOY_API.md)** — deploy API via GitHub Actions, set `WAITLIST_API_URL` in Amplify, redeploy.
