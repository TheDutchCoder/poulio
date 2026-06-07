<template>
  <form @submit.prevent="login" class="max-w-sm w-full m-auto">
    <div class="rounded-lg shadow-lg bg-white p-6 flex flex-col gap-4">
      <h2 class="text-xl font-semibold"><span class="text-indigo-700">Poulio</span><span class="font-thin">.net</span> login</h2>
      <div class="text-sm">
        <label for="email" class="block mb-1 font-semibold cursor-pointer">Email <sup class="text-indigo-600">*</sup></label>
        <input type="text" id="email" placeholder="Email" class="p-2 border outline-2 outline-transparent rounded w-full transition-all focus:outline-indigo-500" required v-model="email">
      </div>
      <div class="text-sm">
        <label for="username" class="block mb-1 font-semibold cursor-pointer">Name <sup class="text-indigo-600">*</sup></label>
        <input type="text" id="username" placeholder="Username" class="p-2 border outline-2 outline-transparent rounded w-full transition-all focus:outline-indigo-500" v-model="username" required>
      </div>
      <div v-if="error" class="rounded border border-red-300 bg-red-50 text-red-700 p-2 text-sm">Incorrect username or password.</div>
      <button type="submit" class="rounded p-2 bg-indigo-600 text-white font-semibold mt-4 transition-colors hover:bg-indigo-800 focus:bg-indigo-800">Log in</button>
    </div>
  </form>
</template>

<script setup>
const email = ref('')
const username = ref('')
const error = ref(false)

async function login() {
  try {
  const user = useUser();
  const { login } = useSession();

  const canonicalEmail = email.value.trim().toLowerCase();
  const name = username.value.trim();

  if (!canonicalEmail) throw new Error("Email required");
  if (!name) throw new Error("Name required");

  const id = await generateSHA1(canonicalEmail);

  login(id, name, canonicalEmail)

  await navigateTo("/dashboard");
} catch (e) {
  error.value = true
} finally {}
}
</script>
