<template>
  <div>
    <h1>Liste des jeux</h1>
    <div v-for="game in games" :key="game.id">
      <ul>
        <li>
          <h2>{{ game.name }}</h2>
          <button @click="selectGame(game.id)">Voir les détails</button>
        </li>
      </ul>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import auth from '~/services/auth';
const accessToken = auth.getAccessToken();
const selectedGameId = ref(null);

const selectGame = (gameId) => {
  selectedGameId.value = gameId;
};
  const { data: games } = await useFetch( `http://localhost:5000/game`, {
    'Authorization': `Bearer ${accessToken} `,
  });
</script>
