<template>
  <div
    class="border rounded-lg p-3 flex flex-col gap-2"
    :class="rowClass"
  >
    <div class="text-sm font-medium text-slate-600">{{ label }}</div>
    <div class="flex flex-wrap items-center gap-2 text-lg">
      <div class="flex items-center gap-2 min-w-[8rem]">
        <span>{{ homeFlag }}</span>
        <span class="truncate">{{ homeName }}</span>
      </div>

      <input
        type="number"
        min="0"
        step="1"
        class="w-14 p-1 border rounded text-center text-sm"
        :disabled="disabled || !teams.homeCode"
        :value="model.homeScore ?? ''"
        @input="updateScore('homeScore', $event)"
      >

      <span class="text-slate-400">–</span>

      <input
        type="number"
        min="0"
        step="1"
        class="w-14 p-1 border rounded text-center text-sm"
        :disabled="disabled || !teams.awayCode"
        :value="model.awayScore ?? ''"
        @input="updateScore('awayScore', $event)"
      >

      <div class="flex items-center gap-2 min-w-[8rem]">
        <span>{{ awayFlag }}</span>
        <span class="truncate">{{ awayName }}</span>
      </div>
    </div>

    <div v-if="showPenSection" class="flex flex-wrap items-center gap-3 text-sm">
      <span class="text-slate-500">Penalties:</span>
      <input
        type="number"
        min="0"
        step="1"
        class="w-14 p-1 border rounded text-center"
        :disabled="disabled"
        :value="model.penHome ?? ''"
        @input="updateScore('penHome', $event)"
      >
      <span>–</span>
      <input
        type="number"
        min="0"
        step="1"
        class="w-14 p-1 border rounded text-center"
        :disabled="disabled"
        :value="model.penAway ?? ''"
        @input="updateScore('penAway', $event)"
      >
      <label class="inline-flex items-center gap-2">
        <span class="text-slate-500">Winner</span>
        <select
          class="border rounded p-1"
          :disabled="disabled"
          :value="model.winnerCode ?? ''"
          @change="updateWinner($event)"
        >
          <option value="">—</option>
          <option v-if="teams.homeCode" :value="teams.homeCode">{{ homeName }}</option>
          <option v-if="teams.awayCode" :value="teams.awayCode">{{ awayName }}</option>
        </select>
      </label>
    </div>

    <div class="flex flex-wrap items-center gap-3 text-sm">
      <label v-if="showLockToggle" class="inline-flex items-center gap-1 cursor-pointer">
        <input
          type="checkbox"
          :checked="model.locked"
          @change="updateLocked($event)"
        >
        <span class="text-slate-500">Lock</span>
      </label>
      <label v-if="showFinalToggle" class="inline-flex items-center gap-1 cursor-pointer">
        <input
          type="checkbox"
          :checked="model.played"
          @change="updatePlayed($event)"
        >
        <span class="text-slate-500">Final</span>
      </label>
      <span
        v-if="pointsBadge != null"
        class="ml-auto font-medium tabular-nums"
        :class="pointsBadgeClass"
      >
        {{ pointsBadge }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { COUNTRIES } from '~/constants'
import { needsPenalties } from '~/utils/knockout'

const props = defineProps({
  label: { type: String, required: true },
  teams: { type: Object, required: true },
  modelValue: { type: Object, required: true },
  disabled: { type: Boolean, default: false },
  showFinalToggle: { type: Boolean, default: false },
  showLockToggle: { type: Boolean, default: false },
  feedback: { type: String, default: 'neutral' },
  pointsTotal: { type: Number, default: null },
})

const emit = defineEmits(['update:modelValue'])

const model = computed(() => props.modelValue)

const homeCountry = computed(() => props.teams.homeCode ? COUNTRIES[props.teams.homeCode] : null)
const awayCountry = computed(() => props.teams.awayCode ? COUNTRIES[props.teams.awayCode] : null)

const homeFlag = computed(() => homeCountry.value?.flag ?? '🏳️')
const awayFlag = computed(() => awayCountry.value?.flag ?? '🏳️')
const homeName = computed(() => homeCountry.value?.name ?? props.teams.homeLabel)
const awayName = computed(() => awayCountry.value?.name ?? props.teams.awayLabel)

const showPenSection = computed(() => needsPenalties(props.modelValue))

const rowClass = computed(() => {
  if (props.feedback === 'correct') return 'bg-green-50'
  if (props.feedback === 'incorrect') return 'bg-red-50'
  return 'bg-white'
})

const pointsBadge = computed(() => {
  if (props.pointsTotal == null) return null
  if (props.pointsTotal === 0 && props.feedback === 'incorrect') return '0'
  if (props.pointsTotal > 0) return `+${props.pointsTotal}`
  return null
})

const pointsBadgeClass = computed(() => {
  if (props.feedback === 'correct') return 'text-green-700'
  if (props.feedback === 'incorrect') return 'text-red-600'
  return 'text-slate-600'
})

function parseScore(value) {
  if (value === '') return null
  const num = Number(value)
  return Number.isFinite(num) ? num : null
}

function updateScore(field, event) {
  const next = { ...props.modelValue, [field]: parseScore(event.target.value) }
  syncWinner(next)
  emit('update:modelValue', next)
}

function updateWinner(event) {
  emit('update:modelValue', { ...props.modelValue, winnerCode: event.target.value || null })
}

function updatePlayed(event) {
  emit('update:modelValue', { ...props.modelValue, played: event.target.checked })
}

function updateLocked(event) {
  emit('update:modelValue', { ...props.modelValue, locked: event.target.checked })
}

function syncWinner(next) {
  if (next.homeScore == null || next.awayScore == null) return
  if (next.homeScore > next.awayScore && props.teams.homeCode) {
    next.winnerCode = props.teams.homeCode
    next.penHome = null
    next.penAway = null
  } else if (next.awayScore > next.homeScore && props.teams.awayCode) {
    next.winnerCode = props.teams.awayCode
    next.penHome = null
    next.penAway = null
  }
}
</script>
