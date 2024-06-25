<template>
  <div class="rounded-lg border p-4 lg:p-6 bg-white">
    <div @click="toggle" class="flex cursor-pointer items-center group">
      <div>
        <slot name="header"></slot>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 ml-auto transition-all group-hover:text-indigo-500" :class="isLocalOpen ? 'rotate-180' : ''">
        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
      </svg>
    </div>
    <div v-show="isLocalOpen">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const isLocalOpen = ref(props.isOpen)

function toggle() {
  isLocalOpen.value = !isLocalOpen.value
}
</script>
