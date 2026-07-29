# FUTA FindIt Backend

Express API for FUTA FindIt. Deploy this repository to Render.

## Run locally

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env`, then set `MONGODB_URI`, `JWT_SECRET`, and `CLIENT_URL`.

## Render

Render detects `render.yaml`. Set these environment variables in Render:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=a_long_random_secret
CLIENT_URL=https://futa-findit.vercel.app
```

If you need preview deployments as well, separate allowed frontend URLs with commas in `CLIENT_URL`.
