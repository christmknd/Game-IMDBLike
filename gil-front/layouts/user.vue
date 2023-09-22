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
  <div>
    <nav>
      <ul>
          <li><nuxt-link to="/game">Search</nuxt-link></li>
          <li><nuxt-link to="/game/addGame">Ajouter un jeu</nuxt-link></li>
          <li><button @click="logout">Se Déconnecter</button></li>
    </ul>
    </nav>
  
    <slot />
    <footer>
      <ul>
        <li>Site crée par Christ M.</li>
        <li>All Rights Reserved - 2023</li>
    </ul>
    </footer>
  </div>
</template>

<style scoped></style>