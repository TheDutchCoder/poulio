<template>
  <div class="bg-gray-50 min-w-screen min-h-screen text-slate-800 flex flex-col">
    <header class="sticky z-10 top-0 left-0 right-0 bg-white p-4 border-b flex items-center h-16">
      <h2 class="text-xl font-semibold"><span class="text-indigo-700">Poulio</span><span class="font-thin">.net</span></h2>
      <button v-if="user" class="rounded py-2 px-3 text-sm bg-indigo-600 text-white font-semibold ml-auto whitespace-nowrap" @click="logout">Log out</button>
    </header>

    <div class="flex p-4 lg:p-8" :class="$route.path === '/' ? 'my-auto' : ''">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const user = useUser()

async function logout() {
  await navigateTo({ path: '/', query: { logout: true } })
}
</script>
