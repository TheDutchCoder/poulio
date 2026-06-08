<template>
  <div class="w-full flex flex-col gap-4 lg:gap-8">
    <CollapsibleArea is-open>
      <template #header>
        <h2 class="text-xl font-semibold lg:text-2xl">Group stage results</h2>
      </template>
      <template #content>
        <p class="text-slate-500 text-sm mt-2">Drag to set standings. Changes save automatically.</p>
        <p class="text-slate-500 text-sm mt-1">Check Final when a team's group-stage position is confirmed (including 0-point last place).</p>
        <div class="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
          <div class="relative w-96 mx-auto" v-for="(group, index) in standings" :key="GROUP_KEYS[index]">
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
                :group="`standings-${index}`"
                item-key="country.key"
                ghost-class="bg-indigo-50"
                class="bg-white divide-y text-lg"
                @change="saveStandings"
              >
                <template #item="{ element, index: rank }">
                  <div class="flex flex-wrap gap-x-2 gap-y-1 items-center px-3 py-2 hover:bg-gray-50 cursor-move">
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
  deserializeStandings,
  makeDefaultStandings,
  serializeStandings,
} from '~/utils/groupStandings'

definePageMeta({
  middleware: 'admin',
})

const { listUsers, loadStandings, saveStandings: saveStandingsApi, deleteUser: deleteUserApi } = useApi()

const users = ref([])
const isLoadingUsers = ref(true)
const usersError = ref(null)
const deletingUserId = ref(null)
const deleteUserError = ref(null)

const standings = ref(makeDefaultStandings())
const hydrated = ref(false)
const isSaving = ref(false)
const standingsError = ref(null)

onMounted(async () => {
  await loadUsers()

  try {
    const saved = await loadStandings()
    standings.value = deserializeStandings(saved)
  } catch (e) {
    standingsError.value = e?.message ?? String(e)
    standings.value = makeDefaultStandings()
  } finally {
    hydrated.value = true
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
    await saveStandingsApi(serializeStandings(standings.value))
  } catch (e) {
    standingsError.value = e?.message ?? String(e)
  } finally {
    isSaving.value = false
  }
}
</script>
