<template>
  <form @submit.prevent="login" class="max-w-sm w-full m-auto">
    <div class="rounded-lg shadow-lg bg-white p-6 flex flex-col gap-4">
      <h2 class="text-xl font-semibold">Poulio Login</h2>
      <div class="text-sm">
        <label for="email" class="block mb-1 font-semibold">Email <sup class="text-indigo-600">*</sup></label>
        <input type="text" id="email" placeholder="Email" class="p-2 border rounded w-full" required v-model="email">
      </div>
      <div class="text-sm">
        <label for="password" class="block mb-1 font-semibold">Password <sup class="text-indigo-600">*</sup></label>
        <input type="password" id="password" placeholder="Password" class="p-2 border rounded w-full" v-model="password" required>
      </div>
      <button type="submit" class="rounded p-2 bg-indigo-600 text-white font-semibold mt-4">Log in</button>
    </div>
  </form>
</template>

<script setup>
definePageMeta({
  middleware: [
    function (to, from) {
      if (to.query.logout) {
        const userCookie = useCookie('poulio_user')
        userCookie.value = null
      } else {
        const user = useUser()
        const userCookie = useCookie('poulio_user')
        user.value = userCookie.value

        if (user.value) {
          return navigateTo('/dashboard')
        }
      }
    }
  ]
})

const email = ref('')
const password = ref('')
const users = useUsers()
const user = useUser()

async function login() {
  const shaEmail = await generateSHA1(email.value)
  const shaPassword = await generateSHA1(password.value)

  const foundUser = users.value.find(user => user.email === shaEmail && user.password === shaPassword)

  const userCookie = useCookie('poulio_user')
  userCookie.value = foundUser

  if (foundUser) {
    user.value = foundUser
    await navigateTo('/dashboard')
  } else {
    alert('Invalid email or password')
  }
}

// generateSHA1('').then(hash => console.log(hash));
</script>
