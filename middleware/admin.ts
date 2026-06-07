const ADMIN_USER_ID = 'a20b27c37502fc5020b5f18bc094705534078603'

export default defineNuxtRouteMiddleware(() => {
  const user = useUser()

  if (user.value.id !== ADMIN_USER_ID) {
    return navigateTo('/dashboard')
  }
})
