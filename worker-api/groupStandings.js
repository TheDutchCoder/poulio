export const GROUP_KEYS = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
]

export const GROUP_ROSTER = {
  A: ['MEX', 'RSA', 'KOR', 'CZE'],
  B: ['CAN', 'BIH', 'QAT', 'SUI'],
  C: ['BRA', 'MAR', 'HAI', 'SCO'],
  D: ['USA', 'PAR', 'AUS', 'TUR'],
  E: ['GER', 'CUW', 'CIV', 'ECU'],
  F: ['NED', 'JPN', 'SWE', 'TUN'],
  G: ['BEL', 'EGY', 'IRN', 'NZL'],
  H: ['ESP', 'CPV', 'KSA', 'URU'],
  I: ['FRA', 'SEN', 'IRQ', 'NOR'],
  J: ['ARG', 'ALG', 'AUT', 'JOR'],
  K: ['POR', 'COD', 'UZB', 'COL'],
  L: ['ENG', 'CRO', 'GHA', 'PAN'],
}

const KV_KEY = 'group_standings'

export function validateGroupStandings(body) {
  if (!body || body.v !== 1 || typeof body.groups !== 'object' || body.groups === null) {
    return 'Invalid payload: expected { v: 1, groups: { ... } }'
  }

  for (const key of GROUP_KEYS) {
    const entries = body.groups[key]
    if (!Array.isArray(entries) || entries.length !== 4) {
      return `Group ${key} must have exactly 4 entries`
    }

    const roster = GROUP_ROSTER[key]
    const seen = new Set()

    for (const entry of entries) {
      if (!entry || typeof entry.code !== 'string') {
        return `Group ${key}: each entry needs a code`
      }
      if (!roster.includes(entry.code)) {
        return `Group ${key}: unknown code ${entry.code}`
      }
      if (seen.has(entry.code)) {
        return `Group ${key}: duplicate code ${entry.code}`
      }
      seen.add(entry.code)

      if (typeof entry.points !== 'number' || !Number.isInteger(entry.points) || entry.points < 0) {
        return `Group ${key}: points for ${entry.code} must be a non-negative integer`
      }
      if (typeof entry.qualified !== 'boolean') {
        return `Group ${key}: qualified for ${entry.code} must be a boolean`
      }
    }

    for (const code of roster) {
      if (!seen.has(code)) {
        return `Group ${key}: missing code ${code}`
      }
    }
  }

  return null
}

/**
 * Handle GET/PUT /g — merge into your Worker's fetch handler when pathname is /g.
 * Expects env.KV (same binding as /p and /u).
 */
export async function handleGroupStandings(request, env) {
  if (request.method === 'GET') {
    const data = await env.KV.get(KV_KEY, 'json')
    if (!data) {
      return Response.json(null, { status: 404 })
    }
    return Response.json(data)
  }

  if (request.method === 'PUT') {
    let body
    try {
      body = await request.json()
    } catch {
      return Response.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    const error = validateGroupStandings(body)
    if (error) {
      return Response.json({ error }, { status: 400 })
    }

    await env.KV.put(KV_KEY, JSON.stringify(body))
    return Response.json(body)
  }

  return new Response(null, { status: 405 })
}
