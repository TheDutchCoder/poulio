# wc2026-api Worker

Copy [`index.js`](index.js) into the Cloudflare Workers online editor.

## D1 migration (run once)

In the Cloudflare dashboard → D1 → your database → Console:

```sql
CREATE TABLE IF NOT EXISTS group_standings (
  id TEXT PRIMARY KEY,
  data_json TEXT NOT NULL,
  updated_at INTEGER NOT NULL
);
```

## `/g` endpoint

| Method | Path | Description |
|--------|------|-------------|
| GET | `/g` | Returns standings JSON (`404` + body `null` if unset) |
| PUT | `/g` | Saves standings (validated against FIFA group roster) |

Payload shape (array order = standing):

```json
{
  "v": 1,
  "groups": {
    "A": [
      { "code": "MEX", "points": 6, "qualified": true, "played": true },
      { "code": "RSA", "points": 3, "qualified": false, "played": false },
      { "code": "KOR", "points": 3, "qualified": false },
      { "code": "CZE", "points": 0, "qualified": false }
    ]
  }
}
```

Uses the same `env.DB` binding as `/p` and `/u`. Single row with `id = 'global'`.

## CORS

Allowed origins include `localhost:3000`, Netlify preview, and `poulio.net`. The Nuxt app also proxies via `/api/g` during local dev.
