<template>
  <div class="container-fluid">
    <h1>Se connecter</h1>
    <form @submit.prevent="login">
      <div class="mb-3">
          <label class="form-label">Username</label>
          <input
            class="form-control"
            type="text"
            id="username"
            placeholder='username'
            v-model="form_username"
          />
      </div>
      <div class="mb-3">
          <label class="form-label">Mot de passe</label>
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
      <div>
        <p>Si vous n'êtes pas inscrit , cliquez <NuxtLink to="/register">ici</NuxtLink> </p>
      </div>
  </div>
</template>

<script>
import auth from '~/services/auth';
import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'


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
       await auth.login(this.form_username, this.form_password);
        this.$emit('user-logged');
        this.$router.push('/game')
        console.log('User connecté sur la plateforme avec succès')
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la connexion du user : ',error )
      }
    }
  }
}
</script>