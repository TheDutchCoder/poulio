<template>
  <div v-if="user.loggedIn" class="w-full flex flex-col gap-4 lg:gap-8">
    <CollapsibleArea is-open>
      <template #header>
        <div class="flex">
          <h1 class="text-xl font-semibold lg:text-2xl">Group Stage Picks for {{ user.name }}</h1>
        </div>
        <ul>
          <li><span class="text-slate-500">You have until {{ endDateGroupPicksFormatted }} to change your predictions</span></li>
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
                item-key="id"
                class="bg-white overflow-hidden divide-y text-lg"
              >
                <template #item="{element, index}">
                  <div class="flex gap-2 items-center px-3 py-2 hover:bg-gray-50" :class="{ 'cursor-move': canMakeGroupPicks }">
                    <div class="text-sm">{{index + 1}}</div>
                    <div>{{element.flag}}</div>
                    <div>{{element.name}}</div>
                  </div>
                </template>
              </draggable>
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

const { load, upsertUser } = useApi()
const hydrated = ref(false);

onMounted(async () => {
  try {
    isLoading.value = true

    await upsertUser(user.value.id, user.value.name, user.value.email);

    const saved = await load(user.value.id);
    const des = deserializeGroups(saved);
    const hasAny = des.some(g => g.length > 0);
    groups.value = hasAny ? des : makeDefaultGroups();
  } catch (e) {
    groups.value = makeDefaultGroups();
  } finally {
    hydrated.value = true
    isLoading.value = false
  }
});

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
  } finally {
    isLoading.value = false
  }
}

const groups = ref(Array.from({ length: 12 }, () => [])); // 12 empty groups

const groupsPayload = computed(() => {
  return Object.fromEntries(
    GROUP_KEYS.map((letter, i) => [
      letter,
      (groups.value[i] ?? []).map(c => c.key),
    ])
  );
});

const user = useUser()
</script>
