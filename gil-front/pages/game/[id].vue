<template>
  <div class="game-card">
    <h2>{{ game.name }}</h2>
    <p>Date de sortie : {{ game.releaseYear }}</p>
    <p>Genre : {{ game.genre }}</p>
    <p>Plateforme : {{ game.platform }}</p>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "user",
  middleware: 'connected'
});
useHead({
  title: 'Détail du jeu'
})

import auth from '~/services/auth';
const accessToken = auth.getAccessToken();

const {id} = useRoute().params
const uri = `http://localhost:5000/game/${id}`

const {data: game} = await useFetch(uri , {
  headers : {
    'Authorization': `Bearer ${accessToken} `,
  }
})
</script>

<style>
</style>