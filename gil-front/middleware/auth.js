import { useAuthStore } from '~/store/auth';

export default function ({ redirect }) {
  const authStore = useAuthStore();

  // Si l'utilisateur n'est pas connecté 
  if (!authStore.isLogged) {
    return redirect('/login');
  }
}