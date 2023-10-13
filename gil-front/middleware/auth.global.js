import auth from '~/services/auth';

export default defineNuxtRouteMiddleware( ({ to, from }) => {
  const isAuthenticated = auth.isConnected();


  if (!isAuthenticated ) {
    navigateTo('/login')
  }

});