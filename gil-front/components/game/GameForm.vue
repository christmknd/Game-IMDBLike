<script>
import SuccessAlert from '@/components/ui/alert/SuccessAlert.vue';
import ErrorAlert from '@/components/ui/alert/ErrorAlert.vue';

import {Genre} from '../../gil-back/src/game/enums/genre-enum.ts'
import {Platform} from '../../gil-back/src/game/enums/platform-enum.ts'

export default {
  components: {
    SuccessAlert,
    ErrorAlert,
  },
  data() {
    return {
      game_name: "",
      game_releaseDate: "",
      game_genres: "",
      game_platforms: "",
      success: false,
      error: false,
    };
  },
  methods: {
    async addGame(){
      try {
        const gameData = {
          name : this.game_name,
          releaseDate : this.game_releaseDate,
          genres: this.game_genres,
          platforms : this.game_platforms
        }
        await $fetch('http://localhost:5000/game', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(gameData),
        });
        this.success = true;
        this.error = false;
        console.log('Jeu ajouté avec succès !');

      } catch (error) {
        console.error('Une erreur s\'est produite lors de l\'ajout du jeu : ',error )
      }
    }
  }
}
</script>

<template>
  <div>
    <form  @submit.prevent="addGame">
      <label for="name">Nom du jeu :</label>
      <input type="text" id="name" v-model="game_name" required />

      <label for="releaseDate">Date de sortie</label>
      <input type="text" id="releaseDate" v-model="game_releaseDate" />

      <label for="genres">Genre(s)</label>
      <select id="genres" v-model="game_genres">
        <option v-for="genre in Genre" :key="genre">{{ genre }}</option>
      </select>

      <label for="platforms">Plateformes</label>
      <select id="platforms" v-model="game_platform">
        <option v-for="platform in Platform" :key="platform">{{ platform }}</option>
      </select>        
      <button type="submit">Continuer </button>

      <SuccessAlert v-if="success">Jeu ajouté avec succès !</SuccessAlert>

      <ErrorAlert v-if="error">Une erreur s'est produite lors de l'ajout du jeu.</ErrorAlert>
    </form>
  </div>
</template>

<style scoped>
.button {
  background-color: #4caf50; /* Vert */
  color: white;
  padding: 10px;
}
</style>
