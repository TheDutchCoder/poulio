export function useApi() {
  const { public: { predApiBase } } = useRuntimeConfig()

  const baseURL = predApiBase || '/api'

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

  const loadStandings = () =>
    $fetch(`/g`, { baseURL }).catch((error: { statusCode?: number; status?: number; data?: unknown }) => {
      const status = error?.statusCode ?? error?.status
      if (status === 404) {
        return null
      }
      throw error
    })

  const saveStandings = (payload: Record<string, unknown>) =>
    $fetch(`/g`, {
      baseURL,
      method: 'PUT',
      body: payload,
    })

  return {
    save,
    load,
    list,

    upsertUser,
    listUsers,

    loadStandings,
    saveStandings,
  }
}
