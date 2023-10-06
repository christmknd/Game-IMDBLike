

export default {
    async login(username, password) {
      try {
        const response = await $fetch('http://localhost:5000/auth/login', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
        });
        localStorage.setItem('accessToken', response.access_token);
        localStorage.setItem('username',response.username)
        localStorage.setItem('role',response.roles)
        localStorage.setItem('email',response.email)
        return response;
      } catch (error) {
        throw error;
      }
    },
  
    async register(username, email, password,player_type, player_mode) {
      try {
        const response = await $fetch('http://localhost:5000/auth/register', {
          method: 'POST',
          body: JSON.stringify({ username, email, password, player_type, player_mode }),
        });
        localStorage.setItem('accessToken', response.access_token);
        localStorage.setItem('username',response.username)
        localStorage.setItem('role',response.roles)
        localStorage.setItem('email',response.email)
        return response;
      } catch (error) {
        throw error;
      }
    },
   
    getAccessToken() {
      return localStorage.getItem('accessToken');
    },

    getUsername(){
      return localStorage.getItem('username')
    },

    getRole(){
      return localStorage.getItem('role')
    },

    getEmail(){
      return localStorage.getItem('email')
    },


    isConnected() {
      const accessToken = this.getAccessToken();
      return accessToken !== null;
    },

    logout() {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('username');
      localStorage.removeItem('role');
      localStorage.removeItem('email');
    },

  };
  