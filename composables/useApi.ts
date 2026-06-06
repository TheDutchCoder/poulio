export function usePredApi() {
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

  return { save, load, list }
}
