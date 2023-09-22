// auth.ts
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLogged: false, 
    accessToken: '', 
    user: null, 
  }),

  actions: {
    // Mutations pour mettre à jour l'état
    setIsAuthenticated(isAuthenticated: boolean) {
      this.isLogged = isAuthenticated;
    },

    setAccessToken(accessToken: string) {
      this.accessToken = accessToken;
    },

    setUser(user: any) {
      this.user = user;
    },
  },
});
