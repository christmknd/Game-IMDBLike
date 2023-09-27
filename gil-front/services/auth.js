import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();

export default {
    async login(username, password) {
      try {
        const response = await $fetch('http://localhost:5000/auth/login', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
        });
        authStore.setAccessToken(response.access_token);
        authStore.setUsername(response.username);

   
        return response;
      } catch (error) {
        throw error;
      }
    },
  
    async register(username, email, password) {
      try {
        const response = await $fetch('http://localhost:5000/auth/register', {
          method: 'POST',
          body: JSON.stringify({ username, email, password }),
        });
        authStore.setAccessToken(response.access_token);
        authStore.setUsername(response.username);
        return response;
      } catch (error) {
        throw error;
      }
    },
  
    logout() {
      const authStore = useAuthStore();
      authStore.clearAuthData();
    },
  };
  