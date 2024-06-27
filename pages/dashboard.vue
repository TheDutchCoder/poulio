<template>
  <div v-if="user" class="w-full flex flex-col gap-4 lg:gap-8">
    <!-- Playoff Picks -->
    <CollapsibleArea is-open>
      <template #header>
        <div class="flex">
          <h1 class="text-xl font-semibold lg:text-2xl">Round of 16 Picks for {{ user.name }}</h1>
        </div>
        <ul>
          <li><span class="text-slate-500">(0 out of {{ maxRound16Points }} points)</span></li>
        </ul>
      </template>
      <template #content>
        <div class="grid cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-4">
          <div v-for="(group, key) in ROUND_OF_16" :key="key" class="border rounded-lg overflow-hidden">
            <table class="w-full">
              <thead class="text-left bg-gray-50">
                <tr>
                  <th colspan="2" class="py-2 px-2 w-8 text-lg font-semibold">Group {{ key }}</th>
                  <th class="py-2 px-2 text-right font-semibold">Prediction</th>
                  <th class="py-2 px-2 text-right font-semibold">Result</th>
                  <th class="py-2 px-2 text-right font-semibold">Pts</th>
                </tr>
              </thead>
              <tbody class="divide-y border-t">
                <tr>
                  <td class="relative py-2 pl-3 text-center text-xl">{{ ROUND_OF_16[key][0].flag }}</td>
                  <td class="py-2 px-2 w-full">{{ ROUND_OF_16[key][0].name }}</td>
                  <td class="py-2 px-2 text-center text-sm w-12">{{ playoffPicks[key][ROUND_OF_16[key][0].name] }}</td>
                  <td class="py-2 px-2 text-center text-sm w-12">-</td>
                  <td class="py-2 px-2 text-center text-sm w-12 border-l" rowspan="2"><span class="inline-flex justify-center items-center w-5 h-5 text-xs rounded-full bg-gray-200 text-slate-800 shadow-inner">-</span></td>
                </tr>
                <tr>
                  <td class="relative py-2 pl-3 text-center text-xl">{{ ROUND_OF_16[key][1].flag }}</td>
                  <td class="py-2 px-2 w-full">{{ ROUND_OF_16[key][1].name }}</td>
                  <td class="py-2 px-2 text-center text-sm w-12">{{ playoffPicks[key][ROUND_OF_16[key][1].name] }}</td>
                  <td class="py-2 px-2 text-center text-sm w-12">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>
    </CollapsibleArea>

    <!-- Group Picks -->
    <CollapsibleArea>
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
                  <th colspan="2" class="py-2 px-2 text-lg font-semibold">Group {{ key }}</th>
                  <th class="py-2 px-2 text-right font-semibold">Pts</th>
                  <th colspan="3" class="border-l py-2 px-2 text-left text-slate-600 font-normal">Standings</th>
                </tr>
              </thead>
              <tbody class="divide-y border-t">
                <tr v-for="(pick, index) in group" :key="pick.name" :class="{ 'bg-green-50': GROUP_STANDINGS[key][index].country.name === pick.name }">
                  <td class="relative py-2 pl-3 text-center text-xl">
                    <span v-if="GROUP_STANDINGS[key].find(entry => entry.country.name === pick.name)?.qualified" class="absolute top-0 left-0 bottom-0 w-1 bg-green-500"></span>
                    <span v-if="!GROUP_STANDINGS[key].find(entry => entry.country.name === pick.name)?.qualified && !GROUP_STANDINGS[key].find(entry => entry.country.name === pick.name)?.eliminated" class="absolute top-0 left-0 bottom-0 w-1 bg-amber-500"></span>
                    <span v-if="GROUP_STANDINGS[key].find(entry => entry.country.name === pick.name)?.eliminated" class="absolute top-0 left-0 bottom-0 w-1 bg-red-500"></span>
                    {{ pick.flag }}
                  </td>
                  <td class="py-2 px-2 w-full" :class="{ 'line-through text-slate-400': GROUP_STANDINGS[key].find(entry => entry.country.name === pick.name)?.eliminated, 'font-semibold': GROUP_STANDINGS[key].find(entry => entry.country.name === pick.name)?.qualified }">{{ pick.name }}</td>
                  <td class="py-2 px-1 text-center text-sm">
                    <span v-if="GROUP_STANDINGS[key][index].country.name === pick.name" class="inline-flex justify-center items-center w-5 h-5 text-xs rounded-full bg-green-200 text-green-800">{{ RANKING_POINTS_GROUP[index] }}</span>
                    <span v-else class="inline-flex justify-center items-center w-5 h-5 text-xs rounded-full bg-gray-200 text-slate-800 shadow-inner">0</span>
                  </td>
                  <td class="border-l relative py-2 pl-2 text-center text-xl">{{ GROUP_STANDINGS[key][index].country.flag }}</td>
                  <td class="py-2 px-2 w-full" :class="{ 'line-through text-slate-400': GROUP_STANDINGS[key][index].eliminated, 'font-semibold': GROUP_STANDINGS[key][index].qualified }">{{ GROUP_STANDINGS[key][index].country.name }}</td>
                  <td class="py-2 px-2 text-center text-sm w-12">{{ GROUP_STANDINGS[key][index].points }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>
    </CollapsibleArea>

    <!-- GROUP_STANDINGS -->
    <CollapsibleArea is-open lass="mt-8">
      <template #header>
        <h2 class="text-xl font-semibold lg:text-2xl">Standings</h2>
      </template>
      <template #content>
        <div class="grid cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
          <ol class="rounded bg-white border divide-y overflow-hidden">
            <li v-for="(entry, index) in groupStandings" :key="entry.user" class="py-2 px-4 inline-flex items-center gap-2 relative w-full" :class="entry.user === user.name ? 'bg-indigo-50 text-indigo-700 font-semibold' : ''">
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
import {
  USER_GROUP_PICKS,
  GROUP_STANDINGS,
  RANKING_POINTS_GROUP,
  RANKING_POINTS_ROUND_OF_16,
  ROUND_OF_16_RESULTS,
  ROUND_OF_16,
  USER_ROUND_OF_16_PICKS
} from '~/constants'

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
const totalPointsGroup = computed(() => calculateTotalPointsGroup(groupPicks.value, GROUP_STANDINGS, RANKING_POINTS_GROUP))
const maxPointsGroup = computed(() => RANKING_POINTS_GROUP.reduce((acc, curr) => acc + curr, 0) * 6)
const playoffPicks = computed(() => USER_ROUND_OF_16_PICKS[user.value.name])
const maxRound16Points = computed(() => {
  return RANKING_POINTS_ROUND_OF_16.reduce((accumulator, currentValue) => accumulator + currentValue, 0) * 8
})
const userRound16Points = computed(() => {
  let points = 0
  console.log(playoffPicks.value[1])
  // console.log(ROUND_OF_16_RESULTS)
  // console.log(RANKING_POINTS_ROUND_OF_16)
  const userWinner = isWinner(playoffPicks.value[1])
  const actualWinner = isWinner(ROUND_OF_16_RESULTS[1])

  if (userWinner === actualWinner) {
    points += RANKING_POINTS_ROUND_OF_16[0]
  }

  if (JSON.stringify(playoffPicks.value[1]) === JSON.stringify(ROUND_OF_16_RESULTS[1])) {
    points += RANKING_POINTS_ROUND_OF_16[1]
  }

  console.log({
    'userWinner': userWinner,
    'actualWinner': actualWinner,
    points
  })
})
// const maxRound16Points = computed(() => RANKING_POINTS_ROUND_OF_16.reduce((acc, curr, ind) => {
//   switch (ind) {
//     case 0:
//       return acc + (curr * 8)
//     case 1:
//       return acc + (curr * 4)
//     case 2:
//       return acc + (curr * 2)
//     case 3:
//       return acc + (curr)
//   }
// }, 0))

function isWinner(bracket) {
  const countryNames = Object.keys(bracket)  

  return bracket[countryNames[0]] > bracket[countryNames[1]] ? countryNames[0] : countryNames[1]
}

const groupStandings = computed(() => {
  const standings = []
  for (const user in USER_GROUP_PICKS) {
    const picks = USER_GROUP_PICKS[user];
    const totalPoints = calculateTotalPointsGroup(picks, GROUP_STANDINGS, RANKING_POINTS_GROUP);
    standings.push({ user, totalPoints });
  }

  return standings.sort((a, b) => b.totalPoints - a.totalPoints);
});

function calculateTotalPointsGroup(userGroupPicks, GROUP_STANDINGS, rankingPoints) {
  let totalPoints = 0

  const groups = userGroupPicks
  
  for (const group in groups) {
    const picks = groups[group]
    const groupGROUP_STANDINGS = GROUP_STANDINGS[group]

    picks.forEach((pick, index) => {
      const rank = groupGROUP_STANDINGS.findIndex(team => team.country.name === pick.name)
      if (rank !== -1 && rank === index) {
        totalPoints += rankingPoints[rank]
      }
    })
  }

  return totalPoints
}
</script>
