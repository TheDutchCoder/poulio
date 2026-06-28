<template>
  <div class="w-full flex flex-col gap-4 lg:gap-8">
    <CollapsibleArea>
      <template #header>
        <h2 class="text-xl font-semibold lg:text-2xl">Group stage results</h2>
      </template>
      <template #content>
        <p class="text-slate-500 text-sm mt-2">Drag to set standings. Changes save automatically.</p>
        <p class="text-slate-500 text-sm mt-1">Check Played when a team has completed at least one group match (live scoring). Check Final when their position is confirmed.</p>
        <div class="grid gap-8 grid-cols-1 lg:grid-cols-2 mt-4">
          <div class="relative w-full max-w-4xl mx-auto" v-for="(group, index) in standings" :key="GROUP_KEYS[index]">
            <Transition name="fade">
              <div
                v-show="isSaving"
                class="absolute inset-0 bg-white/50 rounded-lg backdrop-blur-sm flex items-center justify-center z-10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-10 text-yellow-500 animate-spin">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                </svg>
              </div>
            </Transition>

            <div class="border rounded-lg shadow-lg overflow-hidden">
              <div class="bg-gray-50 text-lg px-3 py-2 font-semibold">Group {{ GROUP_KEYS[index] }}</div>
              <draggable
                v-model="standings[index]"
                handle=".handle"
                :group="`standings-${index}`"
                item-key="country.key"
                ghost-class="bg-indigo-50"
                class="bg-white divide-y text-lg"
                @change="saveStandings"
              >
                <template #item="{ element, index: rank }">
                  <div class="flex flex-wrap gap-x-2 gap-y-1 items-center px-3 py-2 hover:bg-gray-50">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-gray-500 handle cursor-move">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    <span class="text-sm w-4">{{ rank + 1 }}</span>
                    <span>{{ element.country.flag }}</span>
                    <span class="flex-1 min-w-0">{{ element.country.name }}</span>
                    <label class="inline-flex items-center gap-1 text-sm">
                      <span class="text-slate-500">Pts</span>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        class="w-14 p-1 border rounded text-center text-sm"
                        v-model.number="element.points"
                        @change="saveStandings"
                      >
                    </label>
                    <label class="inline-flex items-center gap-1 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        v-model="element.qualified"
                        @change="saveStandings"
                      >
                      <span class="text-slate-500">Q</span>
                    </label>
                    <label class="inline-flex items-center gap-1 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        v-model="element.played"
                        @change="saveStandings"
                      >
                      <span class="text-slate-500">Played</span>
                    </label>
                    <label class="inline-flex items-center gap-1 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        v-model="element.final"
                        @change="saveStandings"
                      >
                      <span class="text-slate-500">Final</span>
                    </label>
                  </div>
                </template>
              </draggable>
            </div>
          </div>
        </div>
        <p v-if="standingsError" class="mt-4 text-red-600 text-sm">{{ standingsError }}</p>
      </template>
    </CollapsibleArea>

    <CollapsibleArea>
      <template #header>
        <h2 class="text-xl font-semibold lg:text-2xl">Third-place slot assignments</h2>
      </template>
      <template #content>
        <p class="text-slate-500 text-sm mt-2">Assign which third-place group fills each Round of 32 wildcard slot.</p>
        <div class="grid gap-4 grid-cols-1 md:grid-cols-2 max-w-3xl mt-4">
          <label
            v-for="slotKey in THIRD_PLACE_SLOT_KEYS"
            :key="slotKey"
            class="flex items-center gap-3 text-lg"
          >
            <span class="w-10 font-medium">{{ slotKey }}</span>
            <select
              class="border rounded p-2 flex-1"
              v-model="knockoutResults.thirdPlaceSlots[slotKey]"
              @change="saveKnockout"
            >
              <option :value="undefined">—</option>
              <option
                v-for="group in THIRD_PLACE_ELIGIBLE[slotKey]"
                :key="group"
                :value="group"
              >
                3rd Group {{ group }}
              </option>
            </select>
          </label>
        </div>
        <p v-if="knockoutError" class="mt-4 text-red-600 text-sm">{{ knockoutError }}</p>
      </template>
    </CollapsibleArea>

    <CollapsibleArea v-for="round in KNOCKOUT_ROUNDS" :key="`ko-${round}`" :is-opn="round === 'r32'">
      <template #header>
        <h2 class="text-xl font-semibold lg:text-2xl">{{ KNOCKOUT_ROUND_LABELS[round] }} results</h2>
      </template>
      <template #content>
        <p class="text-slate-500 text-sm mt-2">
          <strong>Lock</strong> closes user predictions for that match.
          <strong>Final</strong> confirms the result for scoring and advancing the bracket.
        </p>
        <div class="grid gap-4 grid-cols-1 lg:grid-cols-2 mt-4">
          <KnockoutMatchCard
            v-for="entry in adminRoundMatches(round)"
            :key="entry.def.id"
            :label="entry.def.label"
            :teams="entry.teams"
            :model-value="entry.result"
            show-lock-toggle
            show-final-toggle
            @update:model-value="(result) => updateAdminKnockoutResult(round, entry.def.id, result)"
          />
        </div>
      </template>
    </CollapsibleArea>

    <CollapsibleArea>
      <template #header>
        <h2 class="text-xl font-semibold lg:text-2xl">Users</h2>
      </template>
      <template #content>
        <div class="overflow-x-auto mt-4">
          <table class="border rounded-lg shadow-lg w-full max-w-3xl mx-auto">
            <thead class="bg-gray-50 text-lg font-semibold">
              <tr>
                <th class="px-4 py-2 border-b text-left">ID</th>
                <th class="px-4 py-2 border-b text-left">Email</th>
                <th class="px-4 py-2 border-b text-left">Username</th>
                <th class="px-4 py-2 border-b text-right w-28"></th>
              </tr>
            </thead>
            <tbody class="bg-white text-lg">
              <tr v-if="isLoadingUsers">
                <td colspan="4" class="px-4 py-2 border-b text-center text-slate-500">Loading…</td>
              </tr>
              <tr v-else-if="usersError">
                <td colspan="4" class="px-4 py-2 border-b text-center text-red-600">{{ usersError }}</td>
              </tr>
              <tr v-else-if="users.length === 0">
                <td colspan="4" class="px-4 py-2 border-b text-center text-slate-500">No users yet</td>
              </tr>
              <tr v-for="entry in users" :key="entry.id" class="hover:bg-gray-50">
                <td class="px-4 py-2 border-b font-mono text-sm">{{ entry.id }}</td>
                <td class="px-4 py-2 border-b">{{ entry.email ?? '—' }}</td>
                <td class="px-4 py-2 border-b">{{ entry.username }}</td>
                <td class="px-4 py-2 border-b text-right">
                  <button
                    type="button"
                    class="text-sm text-red-600 hover:text-red-800 disabled:opacity-50"
                    :disabled="deletingUserId === entry.id"
                    @click="confirmDeleteUser(entry)"
                  >
                    {{ deletingUserId === entry.id ? 'Deleting…' : 'Delete' }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p v-if="deleteUserError" class="mt-4 text-red-600 text-sm text-center">{{ deleteUserError }}</p>
      </template>
    </CollapsibleArea>
  </div>
</template>

<script setup>
import draggable from 'vuedraggable'
import { GROUP_KEYS } from '~/constants'
import {
  KNOCKOUT_ROUNDS,
  KNOCKOUT_ROUND_LABELS,
  THIRD_PLACE_ELIGIBLE,
  THIRD_PLACE_SLOT_KEYS,
} from '~/constants/knockoutBracket'
import {
  deserializeStandings,
  makeDefaultStandings,
  serializeStandings,
} from '~/utils/groupStandings'
import {
  makeEmptyKnockoutResults,
  normalizeKnockoutResults,
} from '~/utils/knockout'
import { defaultThirdPlaceSlots, resolveRoundMatches } from '~/utils/knockoutResolver'
import { ensureAdminMatchResult, ensureKnockoutResultsShape, syncKnockoutMatchTeams } from '~/utils/knockoutHelpers'

definePageMeta({
  middleware: 'admin',
})

const { listUsers, loadStandings, saveStandings: saveStandingsApi, deleteUser: deleteUserApi, loadKnockoutResults, saveKnockoutResults: saveKnockoutResultsApi } = useApi()

const users = ref([])
const isLoadingUsers = ref(true)
const usersError = ref(null)
const deletingUserId = ref(null)
const deleteUserError = ref(null)

const standings = ref(makeDefaultStandings())
const standingsPayload = ref(null)
const knockoutResults = ref(makeEmptyKnockoutResults())
const hydrated = ref(false)
const isSaving = ref(false)
const isSavingKnockout = ref(false)
const standingsError = ref(null)
const knockoutError = ref(null)

onMounted(async () => {
  await loadUsers()

  try {
    const saved = await loadStandings()
    standingsPayload.value = saved
    standings.value = deserializeStandings(saved)
  } catch (e) {
    standingsError.value = e?.message ?? String(e)
    standings.value = makeDefaultStandings()
  }

  try {
    const savedKnockout = await loadKnockoutResults()
    knockoutResults.value = normalizeKnockoutResults(savedKnockout)
    ensureKnockoutResultsShape(knockoutResults.value)
    if (Object.keys(knockoutResults.value.thirdPlaceSlots).length === 0) {
      knockoutResults.value.thirdPlaceSlots = defaultThirdPlaceSlots(standingsPayload.value)
    }
  } catch (e) {
    knockoutError.value = e?.message ?? String(e)
  } finally {
    hydrated.value = true
    syncKnockoutMatchTeams(knockoutResults.value, standingsPayload.value)
  }
})

async function loadUsers() {
  try {
    isLoadingUsers.value = true
    usersError.value = null
    users.value = await listUsers()
  } catch (e) {
    usersError.value = e?.message ?? String(e)
  } finally {
    isLoadingUsers.value = false
  }
}

async function confirmDeleteUser(entry) {
  const label = entry.username || entry.id
  const confirmed = window.confirm(
    `Delete user "${label}"?\n\nThis permanently removes their account and predictions.`,
  )

  if (!confirmed) return

  try {
    deletingUserId.value = entry.id
    deleteUserError.value = null
    await deleteUserApi(entry.id)
    users.value = users.value.filter((user) => user.id !== entry.id)
  } catch (e) {
    deleteUserError.value = e?.message ?? String(e)
  } finally {
    deletingUserId.value = null
  }
}

async function saveStandings() {
  if (!hydrated.value) return

  try {
    isSaving.value = true
    standingsError.value = null
    const payload = serializeStandings(standings.value)
    await saveStandingsApi(payload)
    standingsPayload.value = payload
    syncKnockoutMatchTeams(knockoutResults.value, standingsPayload.value)
  } catch (e) {
    standingsError.value = e?.message ?? String(e)
  } finally {
    isSaving.value = false
  }
}

function adminRoundMatches(round) {
  return resolveRoundMatches(round, standingsPayload.value, knockoutResults.value).map((entry) => ({
    def: entry.def,
    teams: entry.teams,
    result: ensureAdminMatchResult(knockoutResults.value, round, entry.def.id, standingsPayload.value),
  }))
}

function updateAdminKnockoutResult(round, matchId, result) {
  const target = ensureAdminMatchResult(
    knockoutResults.value,
    round,
    matchId,
    standingsPayload.value,
  )
  Object.assign(target, result)
  saveKnockout()
}

async function saveKnockout() {
  if (!hydrated.value) return

  try {
    isSavingKnockout.value = true
    knockoutError.value = null
    syncKnockoutMatchTeams(knockoutResults.value, standingsPayload.value)
    await saveKnockoutResultsApi(knockoutResults.value)
  } catch (e) {
    knockoutError.value = e?.message ?? String(e)
  } finally {
    isSavingKnockout.value = false
  }
}
</script>
