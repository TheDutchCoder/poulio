export function useApi() {
  const $config = useRuntimeConfig()

  const baseURL = $config.public.predApiBase

  const save = (user: string, prediction: any) =>
    $fetch(`/p/${encodeURIComponent(user)}`, {
      baseURL,
      method: "PUT",
      body: prediction,
    })

  const load = (user: string) =>
    $fetch(`/p/${encodeURIComponent(user)}`, { baseURL })

  const list = () => $fetch(`/p`, { baseURL })

  const upsertUser = (id: string, username: string, email?: string) =>
    $fetch(`/u/${encodeURIComponent(id)}`, {
      baseURL,
      method: "PUT",
      body: { username, email },
    });

  const listUsers = () => $fetch(`/u`, { baseURL });

  return {
    save,
    load,
    list,

    upsertUser,
    listUsers,
  }
}
