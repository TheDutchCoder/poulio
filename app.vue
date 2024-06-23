<template>
  <div class="bg-gray-50 min-w-screen min-h-screen p-8 text-slate-800 flex">
    <NuxtPage />
  </div>
</template>

<script setup>
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.25s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
