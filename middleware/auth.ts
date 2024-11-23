export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()

  if (!user.value && to.path !== '/auth/login') {
    return navigateTo('/auth/login')
  }
})