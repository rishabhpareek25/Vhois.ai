# Waitlist API — Production Setup (Amplify)

Your access logs show the real issue:

1. `POST /api/waitlist` → **301** (Amplify adds trailing slash)
2. `GET /api/waitlist/` → **404** (no backend on static hosting)

Amplify only serves the React app. The waitlist API runs on **Lambda + DynamoDB**.

---

## Step 1 — Deploy the API (choose one)

### Option A — GitHub Actions (recommended, no local AWS CLI)

1. GitHub repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_REGION` = `ap-south-1` (**must match** `infra/samconfig.toml` — Mumbai region)
   - `WAITLIST_ADMIN_SECRET` = strong password for `/admin/waitlist`

2. **IAM permissions for `github-vhois-deploy`** (required for `sam deploy`):

   **Easy:** IAM → Users → your user → **Add permissions** → attach **`AdministratorAccess`**.

   **Or minimal:** IAM → **Policies** → **Create policy** → **JSON** → paste contents of  
   [`infra/iam-github-deploy-policy.json`](../infra/iam-github-deploy-policy.json) → name it `VhoisSamDeploy` → attach to `github-vhois-deploy`.

   If deploy fails with `cloudformation:CreateChangeSet` **AccessDenied**, the user is missing this step.

3. **Actions** tab → **Deploy Waitlist API** → **Run workflow**

3. When finished, open the job summary and copy **ApiBaseUrl**, e.g.  
   `https://abc123.execute-api.ap-south-1.amazonaws.com`

### Option B — AWS CloudShell (browser, no local install)

1. Open [AWS CloudShell](https://console.aws.amazon.com/cloudshell) (same region as Amplify).
2. Run:

```bash
git clone https://github.com/rishabhpareek25/Vhois.ai.git
cd Vhois.ai/infra
sam build
sam deploy --guided
```

Stack name: `vhois-waitlist`  
Copy **ApiBaseUrl** from outputs.

---

## Step 2 — Connect Amplify

1. [Amplify Console](https://console.aws.amazon.com/amplify/) → app **Vhois.ai** → **Hosting** → **Environment variables**
2. Add:

| Variable | Value |
|----------|--------|
| `WAITLIST_API_URL` | `https://xxxx.execute-api.ap-south-1.amazonaws.com` (no trailing `/`) |

3. **Deployments** → **Redeploy this version** (required — builds `_redirects` API proxy)

`amplify.yml` will generate:

- `/api/<*>` → your API (200 rewrite, no 301)
- `/*` → `index.html` (SPA)

---

## Step 3 — Verify

```bash
curl https://YOUR_API_URL/api/health
# {"ok":true,"service":"vhois-waitlist"}
```

Open `https://main.d2rai8dpod7e2h.amplifyapp.com/waitlist` → complete form → **Transmit Signal**.

Admin: `/admin/waitlist` with your `WAITLIST_ADMIN_SECRET`.

---

## Cost

DynamoDB on-demand + Lambda HTTP API: typically **$0** on free tier for a waitlist.

---

## Local development

```bash
npm install
npm run dev:all
```

No `WAITLIST_API_URL` needed — Vite proxies `/api` → `localhost:3001`.
