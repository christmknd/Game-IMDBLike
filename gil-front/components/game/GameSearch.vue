<script setup>
import { ref } from 'vue';

const config = useRuntimeConfig();
const apiKey = config.public.RAWG_API_KEY



const searchQuery = ref('');
const games = ref([]);
const loading = ref(false);

const searchGames = async () => {
  if (!searchQuery.value) {
    return;
  }

  loading.value = true;

  try {
    const response = await $fetch(
      `https://api.rawg.io/api/games?page_size=10&search=${searchQuery.value}&key=${apiKey}`
    );
    games.value = response.results;
    console.log(games.value)
  } catch (error) {
    console.error('Erreur lors de la recherche de jeux : ', error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div>
    <form @submit.prevent="searchGames">
      <input v-model="searchQuery" placeholder="Rechercher un jeu" />
      <button type="submit">Rechercher</button>
    </form>

    <div v-if="loading">Chargement en cours...</div>

    <div v-else>
      <ul>
        <li v-for="game in games" :key="game.id">
          
          {{ game.name }} <br>
        <img :src="game.background_image" alt="Image du jeu" style="height: 200px; width: 200px;object-fit: cover;"> <br> 
        Date de sortie :   {{ game.released }}<br>
        Genres : 
          <ul>
            <li v-for="genre in game.genres" :key="genre.id">
              {{ genre.name }}
            </li>
          </ul> 
          Plateformes :
          <ul>
            <li v-for="platform in game.platforms" :key="platform.id">
              {{ platform.name || platform.platform.name }}
            </li>
          </ul> <br>
        </li> <br>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.gameSearch {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

ul {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}


</style>
