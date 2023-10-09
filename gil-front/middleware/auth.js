import authService from '~/services/auth';

export default defineNuxtRouteMiddleware( ({ to, from }) => {
  const isAuthenticated = authService.isConnected();
  const userRole = authService.getRole();

  if (!isAuthenticated) {
    if (to.path !== '/login') {
      return navigateTo('/login');
    }
  } 
});