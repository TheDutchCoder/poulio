<template>
  <div class="w-full">
    <div class="overflow-x-auto">
      <table class="border rounded-lg shadow-lg w-96 mx-auto">
        <thead class="bg-gray-50 text-lg font-semibold">
          <tr>
            <th class="px-4 py-2 border-b text-left">ID</th>
            <th class="px-4 py-2 border-b text-left">Email</th>
            <th class="px-4 py-2 border-b text-left">Username</th>
          </tr>
        </thead>
        <tbody class="bg-white text-lg">
          <tr v-for="user in users" :key="user.username" class="hover:bg-gray-50">
            <td class="px-4 py-2 border-b">{{ user.id }}</td>
            <td class="px-4 py-2 border-b">{{ user.email }}</td>
            <td class="px-4 py-2 border-b">{{ user.username }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'admin',
})

const { listUsers } = useApi();

const users = ref([]);
const isLoading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    users.value = await listUsers();
  } catch (e) {
    error.value = e?.message ?? String(e);
  } finally {
    isLoading.value = false;
  }
});
</script>
