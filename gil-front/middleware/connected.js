import authService from '~/services/auth';

export default defineNuxtRouteMiddleware( ({ to, from }) => {
  const isAuthenticated = authService.isConnected();
  const userRole = authService.getRole();

  const anonymousPages = ['/login', '/register', '/'];

  if (!isAuthenticated) {
    if (!anonymousPages.includes(to.path)) {
      return navigateTo('/login');
    }
  } else if (isAuthenticated) {
    if (userRole === 'Player' && to.path == '/admin') {
        return navigateTo('/game');
  }
}
});