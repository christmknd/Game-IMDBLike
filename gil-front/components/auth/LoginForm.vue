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

<script setup>
import { ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import {required, minLength} from '@vuelidate/validators'

const form_username = ref('');
const form_password = ref('');

const rules = {
  form_username: {
    required
  },
  form_password: {
    required,
    minLength: minLength(8),
  },
};

const v$ = useVuelidate(rules);


const login = async () => {
  v$.validate();

  if (!v.$error) {
    try {
      await auth.login(form_username.value, form_password.value);
      emit('user-logged');
      router.push('/game');
    } catch (error) {
      console.error('Erreur de connexion : ', error);
    }
  }
};
</script>
