# Vhois.ai Frontend

## Run Locally (Frontend only)

```bash
npm install          # installs frontend + server deps (postinstall)
npm run dev
```

Open: `http://localhost:5173`

## Run Full Stack (Waitlist + Database API)

```bash
npm install
cp .env.example .env
npm run dev:all
```

- Frontend: `http://localhost:5173`
- API: `http://localhost:3001`
- Waitlist: `http://localhost:5173/waitlist`
- Admin dashboard: `http://localhost:5173/admin/waitlist`

**Admin key (dev):** `vhois-admin-dev` (set in `.env` as `ADMIN_SECRET`)

Data is stored in SQLite: `data/waitlist.db`

## Deploy to AWS Amplify (frontend)

Connect GitHub repo in Amplify; `amplify.yml` builds `dist/`. SPA routing uses `public/_redirects` (or add a rewrite in Amplify Console → Hosting → Rewrites and redirects).

## Waitlist API on production

Amplify does not run the Express server. Deploy Lambda + DynamoDB:

See **[docs/DEPLOY_API.md](docs/DEPLOY_API.md)** — deploy API via GitHub Actions, set `WAITLIST_API_URL` in Amplify, redeploy.
