import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    accessToken: '',
    username: '',
  }),
  mutations: {
    setAccessToken(token) {
      this.accessToken = token;
    },
    setUsername(username) {
      this.username = username;
    },
    clearAuthData() {
      this.accessToken = '';
      this.username = '';
    },
  },
});
