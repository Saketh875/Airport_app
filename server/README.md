# Airport Issue Portal - Server

- Run: `npm run server:dev`
- Env: copy `.env.example` to `.env`
- Endpoints:
  - `GET /health`
  - `POST /api/auth/register`
  - `POST /api/auth/login`
  - `GET /api/issues?status=red|yellow|green&sector=...&flow=...`
  - `POST /api/issues/report`
  - `POST /api/issues/:id/take`
  - `POST /api/issues/:id/resolve`
  - `POST /api/issues/sos`
