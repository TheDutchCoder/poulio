<template>
  <div v-if="user" class="w-full flex flex-col gap-4 lg:gap-8">
    <!-- Group Picks -->
    <CollapsibleArea is-open>
      <template #header>
        <div class="flex">
          <h1 class="text-xl font-semibold lg:text-2xl">Group Picks for {{ user.name }}</h1>
        </div>
        <ul>
          <li><span class="text-slate-500">({{ totalPointsGroup }} out of {{ maxPointsGroup }} points)</span></li>
        </ul>
      </template>
      <template #content>
        <div class="grid cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="(group, key) in groupPicks" :key="key" class="border rounded-lg overflow-hidden">
            <table class="w-full">
              <thead class="text-left bg-gray-50">
                <tr>
                  <th colspan="2" class="py-2 px-3 w-8 text-lg font-semibold">Group {{ key }}</th>
                  <th class="py-2 px-3 text-right font-semibold">Score</th>
                </tr>
              </thead>
              <tbody class="divide-y border-t">
                <tr v-for="(pick, index) in group" :key="pick.name" :class="{ 'bg-green-50': STANDINGS[key][index].country.name === pick.name }">
                  <td class="relative py-2 pl-3 text-center text-xl">
                    <span v-if="STANDINGS[key][index].qualified" class="absolute top-0 left-0 bottom-0 w-1 bg-green-500"></span>
                    <span v-if="!STANDINGS[key][index].qualified && !STANDINGS[key][index].eliminated" class="absolute top-0 left-0 bottom-0 w-1 bg-amber-500"></span>
                    <span v-if="STANDINGS[key][index].eliminated" class="absolute top-0 left-0 bottom-0 w-1 bg-red-500"></span>
                    {{ pick.flag }}
                  </td>
                  <td class="py-2 px-3 w-full" :class="{ 'line-through text-slate-400': STANDINGS[key][index].eliminated, 'font-semibold': STANDINGS[key][index].qualified }">{{ pick.name }}</td>
                  <td class="py-2 px-3 text-center text-sm w-12">
                    <span v-if="STANDINGS[key][index].country.name === pick.name" class="inline-flex justify-center items-center w-5 h-5 text-xs rounded-full bg-green-200 text-green-800">{{ RANKING_POINTS_GROUP[index] }}</span>
                    <span v-else class="inline-flex justify-center items-center w-5 h-5 text-xs rounded-full bg-gray-200 text-slate-800 shadow-inner">0</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>
    </CollapsibleArea>

    <!-- Playoff Picks -->
    <CollapsibleArea is-open>
      <template #header>
        <div class="flex">
          <h1 class="text-xl font-semibold lg:text-2xl">Playoff Picks for {{ user.name }}</h1>
        </div>
        <ul>
          <li><span class="text-slate-500">(0 out of {{ maxPointsPlayoffs }} points)</span></li>
        </ul>
      </template>
      <template #content>
        <p class="rounded border border-blue-300 text-blue-700 p-4 bg-blue-50 mt-4 text-sm">There are no play-off picks yet. You can submit your picks after the group stage has ended.</p>

        <h1 class="text-lg font-semibold lg:text-xl mt-8">Round of 16</h1>
        <div class="grid cols-1 gap-6 mt-4 md:grid-cols-2 lg:grid-cols-4">
          <div v-for="(group, key) in PLAYOFFS" :key="key" class="border rounded-lg overflow-hidden">
            <table class="w-full">
              <thead class="text-left bg-gray-50">
                <tr>
                  <th colspan="2" class="py-2 px-3 w-8 text-lg font-semibold">Group {{ key }}</th>
                  <th class="py-2 px-3 text-right font-semibold">Score</th>
                </tr>
              </thead>
              <tbody class="divide-y border-t">
                <tr>
                  <td class="relative py-2 pl-3 text-center text-xl">{{ PLAYOFFS[key][0].flag }}</td>
                  <td class="py-2 px-3 w-full">{{ PLAYOFFS[key][0].name }}</td>
                  <td class="py-2 px-3 text-center text-sm w-12">
                    <!-- <span class="inline-flex justify-center items-center w-5 h-5 text-xs rounded-full bg-green-200 text-green-800">2</span> -->
                  </td>
                </tr>
                <tr>
                  <td class="relative py-2 pl-3 text-center text-xl">{{ PLAYOFFS[key][1].flag }}</td>
                  <td class="py-2 px-3 w-full">{{ PLAYOFFS[key][1].name }}</td>
                  <td class="py-2 px-3 text-center text-sm w-12">
                    <!-- <span class="inline-flex justify-center items-center w-5 h-5 text-xs rounded-full bg-green-200 text-green-800">2</span> -->
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>
    </CollapsibleArea>

    <!-- Standings -->
    <CollapsibleArea is-open lass="mt-8">
      <template #header>
        <h2 class="text-xl font-semibold lg:text-2xl">Standings</h2>
      </template>
      <template #content>
        <div class="grid cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
          <ol class="rounded bg-white border divide-y overflow-hidden">
            <li v-for="(entry, index) in standings" :key="entry.user" class="py-2 px-4 inline-flex items-center gap-2 relative w-full" :class="entry.user === user.name ? 'bg-indigo-50 text-indigo-700 font-semibold' : ''">
              <span>{{ entry.user }}</span>
              <span v-if="index === 0">🥇</span>
              <span v-if="index === 1">🥈</span>
              <span v-if="index === 2">🥉</span>
              <span class="ml-auto font-semibold">{{ entry.totalPoints }}</span>
            </li>
          </ol>
        </div>
      </template>
    </CollapsibleArea>

  </div>
</template>

<script setup>
import { USER_GROUP_PICKS, STANDINGS, RANKING_POINTS_GROUP, RANKING_POINTS_PLAYOFFS, PLAYOFFS, USER_PLAYOFF_PICKS } from '~/constants'

definePageMeta({
  middleware: [
    function (to, from) {
      const user = useUser()
      const userCookie = useCookie('poulio_user')
      user.value = userCookie.value

      if (!user.value) {
        return navigateTo('/')
      }
    }
  ]
})

const user = useUser()
const groupPicks = computed(() => USER_GROUP_PICKS[user.value.name])
const totalPointsGroup = computed(() => calculateTotalPointsGroup(groupPicks.value, STANDINGS, RANKING_POINTS_GROUP))
const maxPointsGroup = computed(() => RANKING_POINTS_GROUP.reduce((acc, curr) => acc + curr, 0) * 6)
const playoffPicks = computed(() => USER_PLAYOFF_PICKS[user.value.name])
const maxPointsPlayoffs = computed(() => RANKING_POINTS_PLAYOFFS.reduce((acc, curr, ind) => {
  switch (ind) {
    case 0:
      return acc + (curr * 8)
    case 1:
      return acc + (curr * 4)
    case 2:
      return acc + (curr * 2)
    case 3:
      return acc + (curr)
  }
}, 0))

const standings = computed(() => {
  const standings = []
  for (const user in USER_GROUP_PICKS) {
    const picks = USER_GROUP_PICKS[user];
    const totalPoints = calculateTotalPointsGroup(picks, STANDINGS, RANKING_POINTS_GROUP);
    standings.push({ user, totalPoints });
  }

  return standings.sort((a, b) => b.totalPoints - a.totalPoints);
});

function calculateTotalPointsGroup(userGroupPicks, standings, rankingPoints) {
  let totalPoints = 0;

  const groups = userGroupPicks;
  
  for (const group in groups) {
    const picks = groups[group];
    const groupStandings = standings[group];

    picks.forEach((pick, index) => {
      const rank = groupStandings.findIndex(team => team.country.name === pick.name);
      if (rank !== -1 && rank === index) {
        totalPoints += rankingPoints[rank];
      }
    });
  }

  return totalPoints;
}
</script>
