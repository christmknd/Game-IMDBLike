
import { useAuthStore } from '@/stores/authStore';

export default function ({ redirect }) {
  const authStore = useAuthStore();

  if (!authStore.accessToken) {
    return redirect('/login');
  }
}
