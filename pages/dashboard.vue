<template>
  <div v-if="user.loggedIn" class="w-full flex flex-col gap-4 lg:gap-8">
    <CollapsibleArea is-open>
      <template #header>
        <div class="flex flex-col gap-1">
          <h1 class="text-xl font-semibold lg:text-2xl">Group Stage Picks for {{ user.name }}</h1>
          <p v-if="hasPublishedStandings" class="text-slate-500 text-sm mt-2">
            Your score: <span class="font-semibold">{{ myGroupScore }}</span> / {{ MAX_GROUP_STAGE_POINTS }}
          </p>
        </div>
        <ul>
          <li><span class="text-slate-500 text-sm mt-2">You have until {{ endDateGroupPicksFormatted }} to change your predictions</span></li>
        </ul>
      </template>
      <template #content>
        <div class="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
          <div class="relative w-96 mx-auto" v-for="(g, index) in groups" :key="index">
            <Transition name="fade">
              <div class="absolute inset-0 bg-white/50 rounded-lg backdrop-blur-sm flex items-center justify-center" v-show="isLoading">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-10 text-yellow-500 animate-spin">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                </svg>
              </div>
            </Transition>

            <div class="border rounded-lg shadow-lg overflow-hidden divide-y">
              <div class="bg-gray-50 text-lg px-3 py-2 font-semibold">Group {{ GROUP_KEYS[index] }}</div>
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
                    <div class="text-sm">{{ rank + 1 }}</div>
                    <div>{{ element.flag }}</div>
                    <div class="flex-1">{{ element.name }}</div>
                    <span
                      v-if="pickPointsBadge(index, element.key) != null"
                      class="text-sm font-medium tabular-nums"
                      :class="pickPointsClass(index, element.key)"
                    >
                      {{ pickPointsBadge(index, element.key) }}
                    </span>
                  </div>
                </template>
              </draggable>
            </div>
          </div>
        </div>
      </template>
    </CollapsibleArea>

    <CollapsibleArea :is-open="hasPublishedStandings">
      <template #header>
        <h2 class="text-xl font-semibold lg:text-2xl">Group stage leaderboard</h2>
        <p v-if="!hasPublishedStandings" class="text-slate-500 text-sm mt-2">
          Scores appear once group stage results are published.
        </p>
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
                <th class="px-4 py-2 border-b text-right">Points</th>
              </tr>
            </thead>
            <tbody class="bg-white text-lg">
              <tr
                v-for="(entry, index) in leaderboard"
                :key="entry.id"
                class="hover:bg-gray-50"
                :class="{ 'bg-indigo-50 font-medium': entry.id === user.id }"
              >
                <td class="px-4 py-2 border-b">{{ index + 1 }}</td>
                <td class="px-4 py-2 border-b">{{ entry.name }}</td>
                <td class="px-4 py-2 border-b text-right">{{ entry.points }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </CollapsibleArea>

    <CollapsibleArea v-if="hasPublishedStandings">
      <template #header>
        <h2 class="text-xl font-semibold lg:text-2xl">Actual group stage results</h2>
      </template>
      <template #content>
        <div class="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
          <div class="w-96 mx-auto" v-for="(group, index) in standings" :key="GROUP_KEYS[index]">
            <div class="border rounded-lg shadow-lg overflow-hidden divide-y">
              <div class="bg-gray-50 text-lg px-3 py-2 font-semibold">Group {{ GROUP_KEYS[index] }}</div>
              <div class="bg-white divide-y text-lg">
                <div
                  v-for="(entry, rank) in group"
                  :key="entry.country.key"
                  class="flex flex-wrap gap-x-2 gap-y-1 items-center px-3 py-2"
                >
                  <span class="text-sm w-4">{{ rank + 1 }}</span>
                  <span>{{ entry.country.flag }}</span>
                  <span class="flex-1 min-w-0">{{ entry.country.name }}</span>
                  <span class="text-sm text-slate-500">{{ entry.points }} pts</span>
                  <span v-if="entry.qualified" class="text-sm text-green-600" title="Qualified">Q</span>
                  <span v-if="entry.played" class="text-sm text-slate-600" title="Position final">Final</span>
                </div>
              </div>
            </div>
          </div>
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
import { deserializeStandings } from '~/utils/groupStandings'
import {
  getPickFeedback,
  getPointsForTeam,
  MAX_GROUP_STAGE_POINTS,
  scoreGroupStage,
} from '~/utils/scoring'

// Current date
const currentDate = Date.now()

// Group stage.
const endDateGroupPicks = new Date('11-06-2026')
const endDateGroupPicksFormatted = computed(() => Intl.DateTimeFormat().format(endDateGroupPicks))
const canMakeGroupPicks = computed(() => currentDate < endDateGroupPicks)

// 32nd stage
const startDate32ndPicks = new Date('27-06-2026')
const endDate32ndPicks = new Date('28-06-2026')
const canMake32ndPicks = computed(() => currentDate >= startDate32ndPicks && currentDate < endDate32ndPicks)

// 16th stage
const startDate16thPicks = new Date('03-07-2026')
const endDate16thPicks = new Date('04-07-2026')
const canMake16thPicks = computed(() => currentDate >= startDate16thPicks && currentDate < endDate16thPicks)

// 4th stage
const startDate4thPicks = new Date('07-07-2026')
const endDate4thPicks = new Date('09-07-2026')
const canMake4thPicks = computed(() => currentDate >= startDate4thPicks && currentDate < endDate4thPicks)

// Semi finals
const startDateSemiFinalPicks = new Date('11-07-2026')
const endDateSemiFinalPicks = new Date('14-07-2026')
const canMakeSemiFinalPicks = computed(() => currentDate >= startDateSemiFinalPicks && currentDate < endDateSemiFinalPicks)

// Finals
const startDateFinalPicks = new Date('15-07-2026')
const endDateFinalPicks = new Date('19-07-2026')
const canMakeFinalPicks = computed(() => currentDate >= startDateFinalPicks && currentDate < endDateFinalPicks)

const { load, upsertUser, loadStandings, listUsers, list } = useApi()
const hydrated = ref(false)
const standingsPayload = ref(null)
const standings = ref(deserializeStandings(null))
const leaderboard = ref([])
const isLoadingLeaderboard = ref(false)
const leaderboardError = ref(null)
let standingsPollTimer = null

const hasPublishedStandings = computed(() => standingsPayload.value?.groups != null)

const groups = ref(Array.from({ length: 12 }, () => []))

const groupsPayload = computed(() =>
  Object.fromEntries(
    GROUP_KEYS.map((letter, i) => [
      letter,
      (groups.value[i] ?? []).map(c => c.key),
    ]),
  ),
)

const myGroupScore = computed(() =>
  scoreGroupStage(groupsPayload.value, standingsPayload.value),
)

onMounted(async () => {
  try {
    isLoading.value = true

    await upsertUser(user.value.id, user.value.name, user.value.email)

    const saved = await load(user.value.id)
    const des = deserializeGroups(saved)
    const hasAny = des.some(g => g.length > 0)
    groups.value = hasAny ? des : makeDefaultGroups()
  } catch (e) {
    groups.value = makeDefaultGroups()
  } finally {
    hydrated.value = true
    isLoading.value = false
  }

  await loadScores()
  startStandingsPolling()
})

onUnmounted(() => {
  stopStandingsPolling()
})

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

async function rebuildLeaderboard(savedStandings) {
  if (!savedStandings?.groups) {
    leaderboard.value = []
    return
  }

  const [users, predictionsList] = await Promise.all([listUsers(), list()])
  const usersById = Object.fromEntries(
    (users ?? []).map((entry) => [entry.id, entry.username]),
  )

  const entries = await Promise.all(
    (predictionsList ?? []).map(async ({ user: userId }) => {
      try {
        const prediction = await load(userId)
        return {
          id: userId,
          name: usersById[userId] ?? userId,
          points: scoreGroupStage(prediction?.groups, savedStandings),
        }
      } catch {
        return {
          id: userId,
          name: usersById[userId] ?? userId,
          points: 0,
        }
      }
    }),
  )

  leaderboard.value = entries.sort((a, b) => b.points - a.points || a.name.localeCompare(b.name))
}

async function refreshStandings() {
  try {
    const savedStandings = await loadStandings()
    applyStandings(savedStandings)
    await rebuildLeaderboard(savedStandings)
  } catch {
    // ignore transient poll failures
  }
}

async function loadScores() {
  try {
    isLoadingLeaderboard.value = true
    leaderboardError.value = null

    const savedStandings = await loadStandings()
    applyStandings(savedStandings)
    await rebuildLeaderboard(savedStandings)
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

function pickPointsBadge(groupIndex, teamCode) {
  const groupKey = groupKeyForIndex(groupIndex)
  const feedback = getPickFeedback(groupsPayload.value, standingsPayload.value, groupKey, teamCode)

  if (feedback === 'neutral') return null
  if (feedback === 'incorrect') return '0'

  const points = getPointsForTeam(groupsPayload.value, standingsPayload.value, groupKey, teamCode)
  return `+${points}`
}

function pickPointsClass(groupIndex, teamCode) {
  const feedback = getPickFeedback(
    groupsPayload.value,
    standingsPayload.value,
    groupKeyForIndex(groupIndex),
    teamCode,
  )

  if (feedback === 'correct') return 'text-green-700'
  if (feedback === 'incorrect') return 'text-red-600'
  return ''
}

function refreshMyLeaderboardScore() {
  if (!standingsPayload.value?.groups) return

  const points = scoreGroupStage(groupsPayload.value, standingsPayload.value)
  const existing = leaderboard.value.find((entry) => entry.id === user.value.id)

  if (existing) {
    existing.points = points
  } else {
    leaderboard.value.push({
      id: user.value.id,
      name: user.value.name,
      points,
    })
  }

  leaderboard.value = [...leaderboard.value].sort(
    (a, b) => b.points - a.points || a.name.localeCompare(b.name),
  )
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

    const payload = {
      v: 1,
      groups: groupsPayload.value
    }

    await save(user.value.id, payload)
    refreshMyLeaderboardScore()
  } finally {
    isLoading.value = false
  }
}

const user = useUser()
</script>
