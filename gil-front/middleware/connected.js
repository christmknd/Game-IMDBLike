import authService from '~/services/auth'; 

export default defineNuxtRouteMiddleware((to, from) => {
  const isAuthenticated = authService.isConnected();
  
  if (!isAuthenticated) {
    return navigateTo('/login')
  }
});