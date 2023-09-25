<script setup>
import authService from '~/services/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const logout = async () => {
  authService.logout(); 
  await router.push('/login'); 
};
</script>

<template>
  <div class="container-fluid">
    
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <ul class="navbar-nav">
          <li class="nav-item "><nuxt-link class="nav-link" to="/game">Search</nuxt-link></li>
          <li class="nav-item "><nuxt-link class="nav-link" to="/game/addGame">Ajouter un jeu</nuxt-link></li>
          <li class="nav-item "><button @click="logout">Se Déconnecter</button></li>
    </ul>
    </nav>
  
    <slot />
    <footer class=" fixed-botttom bg-light text-center text-lg-start">
      <ul>
        <li>Site crée par Christ M.</li>
        <li>All Rights Reserved - 2023</li>
    </ul>
    </footer>
  </div>
</template>

<style scoped></style>