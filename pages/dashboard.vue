<template>
  <div v-if="user">
    <div class="flex">
      <h1 class="text-2xl font-semibold">Group Picks for {{ user.name }}</h1>
      <button class="rounded py-2 px-4 bg-indigo-600 text-white font-semibold ml-auto whitespace-nowrap" @click="logout">Log out</button>
    </div>
    <ul>
      <li><span class="text-slate-500">({{ totalPoints }} out of {{ maxPoints }} points)</span></li>
    </ul>

    <div class="grid cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="(group, key) in picks" :key="key">
        <div class="flex">
          <h2 class="text-xl font-semibold mb-2">Group {{ key }}</h2>
          <span class="ml-auto font-semibold">Points</span>
        </div>
        <ol class="rounded bg-white border divide-y overflow-hidden">
          <li v-for="(pick, index) in group" :key="pick.name" class="py-2 px-4 inline-flex items-center gap-2 relative w-full" :class="STANDINGS[key][index].country.name === pick.name ? 'bg-green-50' : ''">
            <span>{{ pick.flag }}</span>
            <span>{{ pick.name }}</span>
            <span v-if="STANDINGS[key][index].country.name === pick.name" class="block ml-auto rounded-full text-xs bg-green-200 text-green-800 py-0.5 px-2 shadow-inner">{{ RANKING_POINTS[index] }}</span></li>
        </ol>
      </div>
    </div>

    <!-- Standings -->
    <div class="mt-8">
      <h2 class="text-xl font-semibold mb-2">Standings</h2>
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
    </div>

  </div>
</template>

<script setup>
import { USER_GROUP_PICKS, STANDINGS, RANKING_POINTS } from '~/constants'

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
const picks = computed(() => USER_GROUP_PICKS[user.value.name])
const totalPoints = computed(() => calculateTotalPoints(picks.value, STANDINGS, RANKING_POINTS))
const maxPoints = computed(() => RANKING_POINTS.reduce((acc, curr) => acc + curr, 0) * 6)

const standings = computed(() => {
  const standings = []
  for (const user in USER_GROUP_PICKS) {
    const picks = USER_GROUP_PICKS[user];
    const totalPoints = calculateTotalPoints(picks, STANDINGS, RANKING_POINTS);
    standings.push({ user, totalPoints });
  }

  return standings.sort((a, b) => b.totalPoints - a.totalPoints);
});

function calculateTotalPoints(userGroupPicks, standings, rankingPoints) {
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
};

async function logout() {
  await navigateTo({ path: '/', query: { logout: true } })
}
</script>
