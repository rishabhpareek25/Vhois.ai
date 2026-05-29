# Waitlist API on AWS (Amplify + Lambda)

Amplify Hosting serves **only the frontend**. `/api/waitlist` must point to a real API.

## 1. Deploy API (one time)

**Prerequisites:** [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html), AWS credentials configured.

```bash
cd infra
sam build
sam deploy --guided
```

Suggested stack name: `vhois-waitlist`

When prompted for **AdminSecret**, use a strong secret (not the dev default).

After deploy, note the output:

```
ApiBaseUrl = https://xxxxxxxx.execute-api.us-east-1.amazonaws.com
```

## 2. Connect Amplify frontend

1. AWS Console → **Amplify** → your app → **Hosting** → **Environment variables**
2. Add:

| Variable | Value |
|----------|--------|
| `VITE_API_BASE_URL` | `https://xxxxxxxx.execute-api.us-east-1.amazonaws.com` (no trailing slash) |

3. **Redeploy** the app (Deployments → Redeploy this version, or push a commit).

## 3. Verify

```bash
curl https://YOUR_API_URL/api/health
# {"ok":true,"service":"vhois-waitlist"}
```

Then open your Amplify URL → `/waitlist` → **Transmit Signal**.

## Cost

- **DynamoDB** on-demand: free tier covers thousands of signups/month
- **Lambda + HTTP API**: typically $0 at low traffic

## Local development

Unchanged — no `VITE_API_BASE_URL` needed:

```bash
npm run dev:all
```

Vite proxies `/api` → `http://localhost:3001`.
