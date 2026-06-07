export default defineNuxtRouteMiddleware((to) => {
  const { logout } = useSession()
  const user = useUser()

  if (to.path === '/') {
    if (to.query.logout !== undefined) {
      logout()
      return navigateTo('/')
    }

    if (user.value.loggedIn) {
      return navigateTo('/dashboard')
    }

    return
  }

  if (!user.value.loggedIn) {
    return navigateTo('/')
  }
})
