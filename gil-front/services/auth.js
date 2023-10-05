

export default {
    async login(username, password) {
      try {
        const response = await $fetch('http://localhost:5000/auth/login', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
        });
        localStorage.setItem('accessToken', response.access_token);
        localStorage.setItem('username',response.username)
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
        return response;
      } catch (error) {
        throw error;
      }
    },
   
    getAccessToken() {
      return localStorage.getItem('accessToken');
    },

    getUsername(){
      return localStorage.getItem(username)
    },

    async fetchBackend (url , method = 'GET', body = null) {
      const accesstoken = this.getAccessToken();

      const headers = {
        'Authorization': `Bearer ${accesstoken}`,
      };

      const options = {
        method,
        headers,
      };

      if (body !== null) {
        options.body = JSON.stringify(body);
        headers['Content-Type'] = 'application/json';
      }
    
      const response = await fetch(url, options);
      return response;
    },
  

    isConnected() {
      const accessToken = this.getAccessToken();
      return accessToken !== null;
    },

    logout() {
      localStorage.removeItem('accessToken');
    },

  };
  