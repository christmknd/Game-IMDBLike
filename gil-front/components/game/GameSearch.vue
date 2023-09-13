<script setup>
import { ref } from 'vue';

const config = useRuntimeConfig();
const apiKey = config.public.RAWG_API_KEY

const searchQuery = ref('');
const games = ref([]);
const shops = ref([]);
const loading = ref(false);

const selectedShop = ref(null);

//Rechercher des jeux à partir de l'API Rawg.
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


//CHARGER LA LISTE DES SHOPS 

const loadShops = async () => {
  try {
    const response = await $fetch('http://localhost:5000/shop', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  shops.value = await response;
  } catch (error) {
    console.error('Une erreur s\'est produite lors du chargement des magasins :', error);
  }
};
loadShops();


//AJOUTER UN JEU A LA BASE DE DONNEES 
const addGameToDatabase = async (gameId) => {
  try {
    const response = await $fetch(`http://localhost:5000/game`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ gameId }), // Envoyez l'ID du jeu au backend
    });
      console.log('Jeu ajouté à la base de données avec succès !');
  } catch (error) {
    console.error('Une erreur s\'est produite lors de l\'ajout du jeu à la base de données :', error);
  }
};


//AJOUTER UN JEU A UN SHOP 
const addGameToShop = async (gameId) => {

  await addGameToDatabase(gameId);
  if (!selectedShop.value) {
    console.error('Veuillez sélectionner un magasin.');
    return;
  }
  try {
    const response = await $fetch(`http://localhost:5000/shop/${selectedShop.value}/add-game/${gameId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
      console.log('Le jeu a été ajouté au magasin avec succès.');
  } catch (error) {
    console.error('Une erreur s\'est produite lors de l\'ajout du jeu au magasin :', error);
  }
}

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
          <li>
            <select v-model="selectedShop">
              <option v-for="shop in shops" :key="shop.id" :value="shop.id">{{ shop.name }}</option>
            </select>
            <button @click="addGameToShop(game.id)">Ajouter le jeu à un shop</button>
          </li>
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
