<template>
  <div class="container-fluid">
    <h1>Se connecter</h1>
    <form @submit.prevent="login">
      <div class="mb-3">
        <label htmlFor='username' class="form-label">Username</label>
        <input 
          class="form-control"
          type="text" 
          id="username" 
          placeholder='username'
          v-model="form_username" 
          />
      </div>
      <div class="mb-3">
        <label htmlFor='password' class="form-label">Mot de passe</label>
          <input 
          class="form-control"
          type="password" 
          id="password" 
          placeholder="password"
          v-model="form_password"
          />
      </div>
          <button type="submit" class="btn btn-primary">Se connecter</button>
      </form>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();

export default {
  data (){
    return {
        form_username : '',
        form_password : ''
    }
  },
  methods: {
    async login () {
      try {
        const formData = {
          username : this.form_username,
          password: this.form_password
        }
        const response = await $fetch('http://localhost:5000/auth/login', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
        useAuthStore().useAuthStore(response.access_token);
        authStore.setUsername(response.username);
        this.$emit('user-logged');
        console.log('User connecté sur la plateforme avec succès')
      } catch (error) {
        console.error('Une erreur s\'est produite lors de l\'enrigistrement du user : ',error )
      }
    }
  }
}
</script>

<style scoped></style>