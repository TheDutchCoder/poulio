const GROUP_KEYS = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L",
];

const GROUP_ROSTER = {
  A: ["MEX", "RSA", "KOR", "CZE"],
  B: ["CAN", "BIH", "QAT", "SUI"],
  C: ["BRA", "MAR", "HAI", "SCO"],
  D: ["USA", "PAR", "AUS", "TUR"],
  E: ["GER", "CUW", "CIV", "ECU"],
  F: ["NED", "JPN", "SWE", "TUN"],
  G: ["BEL", "EGY", "IRN", "NZL"],
  H: ["ESP", "CPV", "KSA", "URU"],
  I: ["FRA", "SEN", "IRQ", "NOR"],
  J: ["ARG", "ALG", "AUT", "JOR"],
  K: ["POR", "COD", "UZB", "COL"],
  L: ["ENG", "CRO", "GHA", "PAN"],
};

function validateGroupStandings(body) {
  if (!body || body.v !== 1 || typeof body.groups !== "object" || body.groups === null) {
    return "Invalid payload: expected { v: 1, groups: { ... } }";
  }

  for (const key of GROUP_KEYS) {
    const entries = body.groups[key];
    if (!Array.isArray(entries) || entries.length !== 4) {
      return `Group ${key} must have exactly 4 entries`;
    }

    const roster = GROUP_ROSTER[key];
    const seen = new Set();

    for (const entry of entries) {
      if (!entry || typeof entry.code !== "string") {
        return `Group ${key}: each entry needs a code`;
      }
      if (!roster.includes(entry.code)) {
        return `Group ${key}: unknown code ${entry.code}`;
      }
      if (seen.has(entry.code)) {
        return `Group ${key}: duplicate code ${entry.code}`;
      }
      seen.add(entry.code);

      if (typeof entry.points !== "number" || !Number.isInteger(entry.points) || entry.points < 0) {
        return `Group ${key}: points for ${entry.code} must be a non-negative integer`;
      }
      if (typeof entry.qualified !== "boolean") {
        return `Group ${key}: qualified for ${entry.code} must be a boolean`;
      }
    }

    for (const code of roster) {
      if (!seen.has(code)) {
        return `Group ${key}: missing code ${code}`;
      }
    }
  }

  return null;
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);

    const origin = req.headers.get("Origin") || "";

    const allowed = new Set([
      "http://localhost:3000",
      "https://localhost:3000",
      "https://spiffy-frangipane-307dd7.netlify.app",
      "http://spiffy-frangipane-307dd7.netlify.app",
      "https://poulio.net",
      "https://www.poulio.net",
    ]);

    const cors = {
      "Access-Control-Allow-Origin": allowed.has(origin)
        ? origin
        : "https://poulio.net",
      "Access-Control-Allow-Methods": "GET,PUT,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      Vary: "Origin",
    };

    if (req.method === "OPTIONS") return new Response(null, { headers: cors });

    // GET /u -> list users
    if (req.method === "GET" && url.pathname === "/u") {
      const { results } = await env.DB.prepare(
        "SELECT id, username, email, updated_at FROM users ORDER BY updated_at DESC"
      ).all();

      return new Response(JSON.stringify(results), {
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    // PUT /u/:id -> upsert user profile { username, email? }
    const um = url.pathname.match(/^\/u\/([^/]+)$/);
    if (um) {
      const id = decodeURIComponent(um[1]).trim();

      if (req.method !== "PUT") {
        return new Response("Method not allowed", { status: 405, headers: cors });
      }

      const body = await req.json();
      const username = String(body.username || "").trim();
      const emailRaw = body.email != null ? String(body.email).trim() : "";
      const email = emailRaw.length ? emailRaw : null;

      const now = Date.now();

      if (!username) return new Response("Missing username", { status: 400, headers: cors });

      if (email) {
        await env.DB.prepare(
          "INSERT INTO users (id, username, email, created_at, updated_at) VALUES (?, ?, ?, ?, ?) " +
            "ON CONFLICT(id) DO UPDATE SET username = excluded.username, email = excluded.email, updated_at = excluded.updated_at"
        )
          .bind(id, username, email, now, now)
          .run();
      } else {
        await env.DB.prepare(
          "INSERT INTO users (id, username, email, created_at, updated_at) VALUES (?, ?, NULL, ?, ?) " +
            "ON CONFLICT(id) DO UPDATE SET username = excluded.username, updated_at = excluded.updated_at"
        )
          .bind(id, username, now, now)
          .run();
      }

      return new Response(JSON.stringify({ ok: true, id, updatedAt: now }), {
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    // GET /p -> list predictions
    if (req.method === "GET" && url.pathname === "/p") {
      const { results } = await env.DB.prepare(
        "SELECT user, updated_at FROM predictions ORDER BY updated_at DESC"
      ).all();

      return new Response(JSON.stringify(results), {
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    // GET /g -> group stage standings (single global document)
    if (req.method === "GET" && url.pathname === "/g") {
      try {
        const row = await env.DB.prepare(
          "SELECT data_json FROM group_standings WHERE id = ?"
        )
          .bind("global")
          .first();

        if (!row) {
          return new Response("null", { status: 404, headers: { ...cors, "Content-Type": "application/json" } });
        }

        return new Response(row.data_json, {
          headers: { ...cors, "Content-Type": "application/json" },
        });
      } catch (err) {
        return new Response(
          JSON.stringify({
            error: "Database error on GET /g",
            detail: err?.message || String(err),
            hint: "Run the group_standings CREATE TABLE migration in D1 (see worker-api/README.md)",
          }),
          { status: 500, headers: { ...cors, "Content-Type": "application/json" } }
        );
      }
    }

    // PUT /g -> save group stage standings
    if (req.method === "PUT" && url.pathname === "/g") {
      let body;
      try {
        body = await req.json();
      } catch {
        return new Response(JSON.stringify({ error: "Invalid JSON" }), {
          status: 400,
          headers: { ...cors, "Content-Type": "application/json" },
        });
      }

      const error = validateGroupStandings(body);
      if (error) {
        return new Response(JSON.stringify({ error }), {
          status: 400,
          headers: { ...cors, "Content-Type": "application/json" },
        });
      }

      try {
        const now = Date.now();

        await env.DB.prepare(
          "INSERT INTO group_standings (id, data_json, updated_at) VALUES (?, ?, ?) " +
            "ON CONFLICT(id) DO UPDATE SET data_json = excluded.data_json, updated_at = excluded.updated_at"
        )
          .bind("global", JSON.stringify(body), now)
          .run();

        return new Response(JSON.stringify(body), {
          headers: { ...cors, "Content-Type": "application/json" },
        });
      } catch (err) {
        return new Response(
          JSON.stringify({
            error: "Database error on PUT /g",
            detail: err?.message || String(err),
            hint: "Run the group_standings CREATE TABLE migration in D1 (see worker-api/README.md)",
          }),
          { status: 500, headers: { ...cors, "Content-Type": "application/json" } }
        );
      }
    }

    // GET/PUT /p/:user -> predictions
    const m = url.pathname.match(/^\/p\/([^/]+)$/);
    if (!m) return new Response("Not found", { status: 404, headers: cors });

    const user = decodeURIComponent(m[1]).trim();
    if (!user || user.length > 50) return new Response("Bad user", { status: 400, headers: cors });

    if (req.method === "GET") {
      const row = await env.DB.prepare("SELECT data_json FROM predictions WHERE user = ?")
        .bind(user)
        .first();

      if (!row) return new Response("Not found", { status: 404, headers: cors });

      return new Response(row.data_json, {
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    if (req.method === "PUT") {
      const data = await req.json();
      const now = Date.now();

      await env.DB.prepare(
        "INSERT INTO predictions (user, data_json, updated_at) VALUES (?, ?, ?) " +
          "ON CONFLICT(user) DO UPDATE SET data_json = excluded.data_json, updated_at = excluded.updated_at"
      )
        .bind(user, JSON.stringify(data), now)
        .run();

      return new Response(JSON.stringify({ ok: true, user, updatedAt: now }), {
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    return new Response("Method not allowed", { status: 405, headers: cors });
  },
};
