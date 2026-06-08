<template>
  <div v-if="user.loggedIn" class="w-full flex flex-col gap-4 lg:gap-8">
    <CollapsibleArea is-open>
      <template #header>
        <div class="flex flex-col gap-1">
          <h1 class="text-xl font-semibold lg:text-2xl">Group Stage Picks for {{ user.name }}</h1>
          <p class="text-slate-500 text-sm mt-2">
            Your score: <span class="font-semibold">{{ myTotalScore.total }}</span>
            <span class="text-slate-400"> (group {{ myTotalScore.group }} + KO {{ myTotalScore.knockout }})</span>
          </p>
        </div>
        <ul>
          <li><span class="text-slate-500 text-sm mt-2">You have until {{ endDateGroupPicksFormatted }} to change your predictions</span></li>
        </ul>
      </template>
      <template #content>
        <div class="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
          <div class="w-full relative md:max-w-96" v-for="(g, index) in groups" :key="index">
            <Transition name="fade">
              <div class="absolute inset-0 bg-white/50 rounded-lg backdrop-blur-sm flex items-center justify-center" v-show="isLoading">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-10 text-yellow-500 animate-spin">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                </svg>
              </div>
            </Transition>

            <div class="border rounded-lg shadow-lg overflow-hidden divide-y">
              <div class="bg-gray-50 text-lg px-3 py-2 font-semibold">Group {{ GROUP_KEYS[index] }}</div>
              <div class="flex gap-2 items-center px-3 py-1.5 bg-gray-50 text-sm text-slate-500 border-b">
                <div class="flex-1 min-w-0">Team</div>
                <div class="w-10 text-right tabular-nums">Pts</div>
                <div class="w-16 text-right tabular-nums">Your pts</div>
              </div>
              <draggable 
                v-model="groups[index]" 
                :group="`group-${index}`"
                @start="drag=true" 
                @end="drag=false"
                @change="updateGroupPicks"
                :disabled="!canMakeGroupPicks"
                ghost-class="bg-indigo-50"
                item-key="key"
                class="bg-white overflow-hidden divide-y text-lg"
              >
                <template #item="{element, index: rank}">
                  <div
                    class="flex gap-2 items-center px-3 py-2"
                    :class="[
                      canMakeGroupPicks ? 'cursor-move' : '',
                      'hover:bg-gray-50',
                      pickRowClass(index, element.key),
                    ]"
                  >
                    <div class="flex-1 min-w-0 flex gap-2 items-center">
                      <div class="text-sm w-4">{{ rank + 1 }}</div>
                      <div>{{ element.flag }}</div>
                      <div class="flex-1 min-w-0 truncate">{{ element.name }}</div>
                    </div>
                    <div class="w-10 text-right text-sm tabular-nums text-slate-500">
                      {{ tournamentPointsForTeam(index, element.key) }}
                    </div>
                    <div
                      class="w-16 text-right text-sm font-medium tabular-nums"
                      :class="earnedPointsClass(index, element.key)"
                    >
                      {{ earnedPointsDisplay(index, element.key) }}
                    </div>
                  </div>
                </template>
              </draggable>
            </div>
          </div>
        </div>
      </template>
    </CollapsibleArea>

    <template v-for="round in KNOCKOUT_ROUNDS" :key="`pick-${round}`">
      <CollapsibleArea v-if="shouldShowKnockoutRound(round)">
        <template #header>
          <h2 class="text-xl font-semibold lg:text-2xl">{{ KNOCKOUT_ROUND_LABELS[round] }} predictions</h2>
          <p class="text-slate-500 text-sm mt-1">{{ knockoutRoundStatusText(round) }}</p>
        </template>
        <template #content>
          <div class="grid gap-4 grid-cols-1 lg:grid-cols-2 mt-4">
            <KnockoutMatchCard
              v-for="entry in dashboardRoundMatches(round)"
              :key="entry.def.id"
              :label="entry.def.label"
              :teams="entry.teams"
              v-model="entry.pick"
              :disabled="!entry.canPick"
              :feedback="entry.feedback"
              :points-total="entry.pointsTotal"
              @update:model-value="saveKnockoutPicks"
            />
          </div>
        </template>
      </CollapsibleArea>
    </template>

    <CollapsibleArea is-open>
      <template #header>
        <h2 class="text-xl font-semibold lg:text-2xl">Leaderboard</h2>
      </template>
      <template #content>
        <div v-if="isLoadingLeaderboard" class="text-slate-500 text-sm mt-2">Loading scores…</div>
        <p v-else-if="leaderboardError" class="text-red-600 text-sm mt-2">{{ leaderboardError }}</p>
        <div v-else class="overflow-x-auto mt-4">
          <table class="border rounded-lg shadow-lg w-full max-w-xl mx-auto">
            <thead class="bg-gray-50 text-lg font-semibold">
              <tr>
                <th class="px-4 py-2 border-b text-left w-16">#</th>
                <th class="px-4 py-2 border-b text-left">Player</th>
                <th class="px-4 py-2 border-b text-right">Total</th>
                <th class="px-4 py-2 border-b text-right text-sm font-normal text-slate-500">Group</th>
                <th class="px-4 py-2 border-b text-right text-sm font-normal text-slate-500">KO</th>
              </tr>
            </thead>
            <tbody class="bg-white text-lg">
              <tr
                v-for="(entry, index) in leaderboard"
                :key="entry.id"
                class="hover:bg-gray-50"
                :class="{ 'bg-indigo-50 font-medium': entry.id === user.id }"
              >
                <td class="px-4 py-2 border-b">
                  <span v-if="hasAnyPublishedResults && index === 0">🏆</span>
                  <span v-else-if="hasAnyPublishedResults && index === 1">🥈</span>
                  <span v-else-if="hasAnyPublishedResults && index === 2">🥉</span>
                  <span v-else>{{ index + 1 }}</span>
                </td>
                <td class="px-4 py-2 border-b">{{ entry.name }}</td>
                <td class="px-4 py-2 border-b text-right font-medium">{{ entry.total }}</td>
                <td class="px-4 py-2 border-b text-right text-slate-500">{{ entry.group }}</td>
                <td class="px-4 py-2 border-b text-right text-slate-500">{{ entry.knockout }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </CollapsibleArea>

  </div>
</template>

<script setup>
import draggable from 'vuedraggable'

import {
  COUNTRIES,
  GROUP_KEYS,
} from '~/constants'
import {
  KNOCKOUT_ROUNDS,
  KNOCKOUT_ROUND_LABELS,
} from '~/constants/knockoutBracket'
import { deserializeStandings } from '~/utils/groupStandings'
import {
  getKnockoutPickFeedback,
  getPickFeedback,
  getPointsForTeam,
  getTeamPlayed,
  scoreAll,
  scoreKnockoutMatch,
} from '~/utils/scoring'
import {
  getKnockoutPicksFromPrediction,
  makeEmptyKnockoutResults,
  mergePredictionPayload,
  normalizeKnockoutResults,
} from '~/utils/knockout'
import { roundHasAnyPlayedResults, resolveRoundMatches } from '~/utils/knockoutResolver'
import {
  canPickKnockoutMatch,
  ensureUserMatchPick,
  hasKnockoutPick,
} from '~/utils/knockoutHelpers'

// Current date
const currentDate = ref(Date.now())
let currentDateTimer = null

// Group stage pick deadline
const endDateGroupPicks = new Date('11-06-2026')
const endDateGroupPicksFormatted = computed(() => Intl.DateTimeFormat().format(endDateGroupPicks))
const canMakeGroupPicks = computed(() => currentDate.value < endDateGroupPicks.getTime())

const { load, upsertUser, loadStandings, loadKnockoutResults, listUsers, list } = useApi()
const hydrated = ref(false)
const savedPrediction = ref(null)
const standingsPayload = ref(null)
const knockoutResultsPayload = ref(null)
const standings = ref(deserializeStandings(null))
const knockoutResults = ref(makeEmptyKnockoutResults())
const knockoutPicks = ref({})
const leaderboard = ref([])
const isLoadingLeaderboard = ref(false)
const leaderboardError = ref(null)
let standingsPollTimer = null

const hasPublishedStandings = computed(() => standingsPayload.value?.groups != null)
const hasKnockoutResults = computed(() => knockoutResultsPayload.value != null)
const hasAnyPublishedResults = computed(() => hasPublishedStandings.value || hasKnockoutResults.value)

const myTotalScore = computed(() =>
  scoreAll(groupsPayload.value, standingsPayload.value, knockoutPicks.value, knockoutResults.value),
)

const groups = ref(Array.from({ length: 12 }, () => []))

const groupsPayload = computed(() =>
  Object.fromEntries(
    GROUP_KEYS.map((letter, i) => [
      letter,
      (groups.value[i] ?? []).map(c => c.key),
    ]),
  ),
)


onMounted(async () => {
  try {
    isLoading.value = true

    await upsertUser(user.value.id, user.value.name, user.value.email)

    const saved = await load(user.value.id)
    savedPrediction.value = saved
    const des = deserializeGroups(saved)
    const hasAny = des.some(g => g.length > 0)
    groups.value = hasAny ? des : makeDefaultGroups()
    knockoutPicks.value = getKnockoutPicksFromPrediction(saved)
  } catch (e) {
    groups.value = makeDefaultGroups()
    knockoutPicks.value = {}
  } finally {
    hydrated.value = true
    isLoading.value = false
  }

  await loadScores()
  startStandingsPolling()
  startCurrentDateRefresh()
})

onUnmounted(() => {
  stopStandingsPolling()
  stopCurrentDateRefresh()
})

function startCurrentDateRefresh() {
  stopCurrentDateRefresh()
  currentDateTimer = setInterval(() => {
    currentDate.value = Date.now()
  }, 60 * 60 * 1000)
}

function stopCurrentDateRefresh() {
  if (currentDateTimer) {
    clearInterval(currentDateTimer)
    currentDateTimer = null
  }
}

function startStandingsPolling() {
  stopStandingsPolling()
  standingsPollTimer = setInterval(() => {
    if (document.hidden) return
    refreshStandings()
  }, 30_000)
}

function stopStandingsPolling() {
  if (standingsPollTimer) {
    clearInterval(standingsPollTimer)
    standingsPollTimer = null
  }
}

function applyStandings(savedStandings) {
  standingsPayload.value = savedStandings
  standings.value = deserializeStandings(savedStandings)
}

function applyKnockoutResults(savedKnockout) {
  knockoutResultsPayload.value = savedKnockout
  knockoutResults.value = normalizeKnockoutResults(savedKnockout)
}

async function rebuildLeaderboard(savedStandings, savedKnockout) {
  const normalizedKnockout = normalizeKnockoutResults(savedKnockout)

  const [users, predictionsList] = await Promise.all([listUsers(), list()])
  const usersById = Object.fromEntries(
    (users ?? []).map((entry) => [entry.id, entry.username]),
  )

  const entries = await Promise.all(
    (predictionsList ?? []).map(async ({ user: userId }) => {
      try {
        const prediction = await load(userId)
        const scores = scoreAll(
          prediction?.groups,
          savedStandings,
          getKnockoutPicksFromPrediction(prediction),
          normalizedKnockout,
        )
        return {
          id: userId,
          name: usersById[userId] ?? userId,
          total: scores.total,
          group: scores.group,
          knockout: scores.knockout,
        }
      } catch {
        return {
          id: userId,
          name: usersById[userId] ?? userId,
          total: 0,
          group: 0,
          knockout: 0,
        }
      }
    }),
  )

  leaderboard.value = entries.sort((a, b) => b.total - a.total || a.name.localeCompare(b.name))
}

async function refreshStandings() {
  try {
    const [savedStandings, savedKnockout] = await Promise.all([
      loadStandings(),
      loadKnockoutResults(),
    ])
    applyStandings(savedStandings)
    applyKnockoutResults(savedKnockout)
    await rebuildLeaderboard(savedStandings, savedKnockout)
  } catch {
    // ignore transient poll failures
  }
}

async function loadScores() {
  try {
    isLoadingLeaderboard.value = true
    leaderboardError.value = null

    const [savedStandings, savedKnockout] = await Promise.all([
      loadStandings(),
      loadKnockoutResults(),
    ])
    applyStandings(savedStandings)
    applyKnockoutResults(savedKnockout)
    await rebuildLeaderboard(savedStandings, savedKnockout)
  } catch (e) {
    leaderboardError.value = e?.message ?? String(e)
  } finally {
    isLoadingLeaderboard.value = false
  }
}

function groupKeyForIndex(groupIndex) {
  return GROUP_KEYS[groupIndex]
}

function pickRowClass(groupIndex, teamCode) {
  const feedback = getPickFeedback(
    groupsPayload.value,
    standingsPayload.value,
    groupKeyForIndex(groupIndex),
    teamCode,
  )

  if (feedback === 'correct') return 'bg-green-50'
  if (feedback === 'incorrect') return 'bg-red-50'
  return ''
}

function tournamentPointsForTeam(groupIndex, teamCode) {
  if (!hasPublishedStandings.value) return 0
  const entry = standings.value[groupIndex]?.find(e => e.country.key === teamCode)
  return entry?.points ?? 0
}

function earnedPointsForTeam(groupIndex, teamCode) {
  const groupKey = groupKeyForIndex(groupIndex)
  if (!getTeamPlayed(standingsPayload.value, groupKey, teamCode)) return null
  return getPointsForTeam(groupsPayload.value, standingsPayload.value, groupKey, teamCode)
}

function earnedPointsDisplay(groupIndex, teamCode) {
  return earnedPointsForTeam(groupIndex, teamCode) ?? 0
}

function earnedPointsClass(groupIndex, teamCode) {
  const groupKey = groupKeyForIndex(groupIndex)
  const feedback = getPickFeedback(groupsPayload.value, standingsPayload.value, groupKey, teamCode)

  if (feedback === 'correct') return 'text-green-700'
  if (feedback === 'incorrect') return 'text-red-600'
  return 'text-slate-500'
}

function refreshMyLeaderboardScore() {
  const scores = myTotalScore.value
  const existing = leaderboard.value.find((entry) => entry.id === user.value.id)

  if (existing) {
    existing.total = scores.total
    existing.group = scores.group
    existing.knockout = scores.knockout
  } else {
    leaderboard.value.push({
      id: user.value.id,
      name: user.value.name,
      total: scores.total,
      group: scores.group,
      knockout: scores.knockout,
    })
  }

  leaderboard.value = [...leaderboard.value].sort(
    (a, b) => b.total - a.total || a.name.localeCompare(b.name),
  )
}

function shouldShowKnockoutRound(round) {
  if (dashboardRoundMatches(round).some((entry) => entry.canPick)) return true
  if (roundHasAnyPlayedResults(round, knockoutResults.value)) return true

  const roundPicks = knockoutPicks.value?.[round]
  if (!roundPicks) return false
  return Object.values(roundPicks).some((pick) => hasKnockoutPick(pick))
}

function dashboardRoundMatches(round) {
  return resolveRoundMatches(round, standingsPayload.value, knockoutResults.value).map((entry) => {
    const pick = ensureUserMatchPick(knockoutPicks.value, round, entry.def.id)
    const result = knockoutResults.value.matches?.[round]?.[entry.def.id] ?? null
    const breakdown = scoreKnockoutMatch(pick, result)

    return {
      def: entry.def,
      teams: entry.teams,
      pick,
      canPick: canPickKnockoutMatch(entry.teams, result),
      feedback: getKnockoutPickFeedback(pick, result),
      pointsTotal: result?.played ? breakdown.total : null,
    }
  })
}

function knockoutRoundStatusText(round) {
  const openCount = dashboardRoundMatches(round).filter((entry) => entry.canPick).length
  if (openCount > 0) {
    return `${openCount} match${openCount === 1 ? '' : 'es'} open for picks`
  }
  return 'All matches locked'
}

async function saveKnockoutPicks() {
  if (!hydrated.value || !user.value.loggedIn) return

  const { save } = useApi()

  try {
    const payload = mergePredictionPayload(
      savedPrediction.value,
      groupsPayload.value,
      knockoutPicks.value,
    )
    await save(user.value.id, payload)
    savedPrediction.value = payload
    refreshMyLeaderboardScore()
  } catch {
    // ignore save errors for now
  }
}

function deserializeGroups(saved) {
  const savedGroups = saved?.groups ?? {};

  return GROUP_KEYS.map((letter) => {
    const codes = Array.isArray(savedGroups[letter]) ? savedGroups[letter] : [];
    return codes
      .map((code) => COUNTRIES[code])
      .filter(Boolean); // drops unknown codes safely
  });
}

function makeDefaultGroups() {
  return [
    [COUNTRIES.MEX, COUNTRIES.CZE, COUNTRIES.KOR, COUNTRIES.RSA], // A
    [COUNTRIES.CAN, COUNTRIES.SUI, COUNTRIES.BIH, COUNTRIES.QAT], // B
    [COUNTRIES.BRA, COUNTRIES.MAR, COUNTRIES.SCO, COUNTRIES.HAI], // C
    [COUNTRIES.USA, COUNTRIES.PAR, COUNTRIES.AUS, COUNTRIES.TUR], // D
    [COUNTRIES.GER, COUNTRIES.ECU, COUNTRIES.CIV, COUNTRIES.CUW], // E
    [COUNTRIES.NED, COUNTRIES.SWE, COUNTRIES.JPN, COUNTRIES.TUN], // F
    [COUNTRIES.BEL, COUNTRIES.EGY, COUNTRIES.NZL, COUNTRIES.IRN], // G
    [COUNTRIES.ESP, COUNTRIES.URU, COUNTRIES.KSA, COUNTRIES.CPV], // H
    [COUNTRIES.FRA, COUNTRIES.NOR, COUNTRIES.SEN, COUNTRIES.IRQ], // I
    [COUNTRIES.ARG, COUNTRIES.AUT, COUNTRIES.ALG, COUNTRIES.JOR], // J
    [COUNTRIES.POR, COUNTRIES.COL, COUNTRIES.COD, COUNTRIES.UZB], // K
    [COUNTRIES.ENG, COUNTRIES.CRO, COUNTRIES.GHA, COUNTRIES.PAN], // L
  ];
}

const isLoading = ref(false)
async function updateGroupPicks() {
  if (!hydrated.value) return
  if (!user.value.loggedIn) return;

  const { save } = useApi()

  try {
    isLoading.value = false

    const payload = mergePredictionPayload(
      savedPrediction.value,
      groupsPayload.value,
      knockoutPicks.value,
    )

    await save(user.value.id, payload)
    savedPrediction.value = payload
    refreshMyLeaderboardScore()
  } finally {
    isLoading.value = false
  }
}

const user = useUser()
</script>
