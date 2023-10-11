import auth from '~/services/auth';

export default defineNuxtRouteMiddleware( ({ to, from }) => {
  const isAuthenticated = auth.isConnected();

  const role = auth.getRole()

  if (!isAuthenticated ) {
    navigateTo('/login')
  } else {
    if ( role == 'admin') {
      navigateTo('/admin')
    } else if ( role == 'Player') {
      navigateTo('/game')
    }
  }

});