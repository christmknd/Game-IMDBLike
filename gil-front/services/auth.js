

export default {
    async login(username, password) {
      try {
        const response = await $fetch('http://localhost:5000/auth/login', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
        });
        localStorage.setItem('accessToken', response.access_token);
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
        localStorage.setItem('accessToken', response.access_token);
        return response;
      } catch (error) {
        throw error;
      }
    },
  
    logout() {
      localStorage.removeItem('accessToken');
    },

    getAccessToken() {
      return localStorage.getItem('accessToken');
    },

    isConnected() {
      const accessToken = this.getAccessToken();
      return accessToken !== null;
    },
  };
  