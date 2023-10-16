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
          <div v-if="v$.form_username.$error">Le username est obligatoire.</div>
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
          <div v-if="v$.form_password.$error">
          <span v-if="form_password.required">Le mot de passe est obligatoire.</span>
          <span v-else-if="form_password.minLength">Le mot de passe doit contenir au moins 6 caractères.</span>
        </div>
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
  setup () {
    return { v$: useVuelidate() }
  },
  data (){
    return {
        form_username : '',
        form_password : ''
    }
  },
  validations (){
    return {
      form_username : {required},
      form_password : {required , minLength: minLength(6)}
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