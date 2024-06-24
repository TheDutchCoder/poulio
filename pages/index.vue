<template>
  <form @submit.prevent="login" class="max-w-sm w-full m-auto">
    <div class="rounded-lg shadow-lg bg-white p-6 flex flex-col gap-4">
      <h2 class="text-xl font-semibold"><span class="text-indigo-700">Poulio</span><span class="font-thin">.net</span> login</h2>
      <div class="text-sm">
        <label for="email" class="block mb-1 font-semibold cursor-pointer">Email <sup class="text-indigo-600">*</sup></label>
        <input type="text" id="email" placeholder="Email" class="p-2 border outline-2 outline-transparent rounded w-full transition-all focus:outline-indigo-500" required v-model="email">
      </div>
      <div class="text-sm">
        <label for="password" class="block mb-1 font-semibold cursor-pointer">Password <sup class="text-indigo-600">*</sup></label>
        <input type="password" id="password" placeholder="Password" class="p-2 border outline-2 outline-transparent rounded w-full transition-all focus:outline-indigo-500" v-model="password" required>
      </div>
      <div v-if="error" class="rounded border border-red-300 bg-red-50 text-red-700 p-2 text-sm">Incorrect username or password.</div>
      <button type="submit" class="rounded p-2 bg-indigo-600 text-white font-semibold mt-4 transition-colors hover:bg-indigo-800 focus:bg-indigo-800">Log in</button>
    </div>
  </form>
</template>

<script setup>
definePageMeta({
  middleware: [
    function (to, from) {
      const user = useUser()
      const userCookie = useCookie('poulio_user')

      if (to.query.logout) {
        userCookie.value = null
        // user.value = undefined
      } else {
        user.value = userCookie.value

        if (user.value) {
          return navigateTo('/dashboard')
        }
      }
    }
  ],
  hideHeader: true
})

const email = ref('')
const password = ref('')
const error = ref(false)
const users = useUsers()
const user = useUser()
user.value = undefined

async function login() {
  const shaEmail = await generateSHA1(email.value)
  const shaPassword = await generateSHA1(password.value)

  const foundUser = users.value.find(user => user.email === shaEmail && user.password === shaPassword)

  const userCookie = useCookie('poulio_user', {
    expires: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000) // 60 days from now
  })
  userCookie.value = foundUser

  if (foundUser) {
    user.value = foundUser
    await navigateTo('/dashboard')
  } else {
    error.value = true
  }
}
</script>
