<template>
  <div>
    <form  @submit.prevent="addGame">
      <div class="mb-3">
        <label for="name" class="form-label">Nom du jeu :</label>
      <input type="text" class="form-control" id="name" v-model="game_name" required />
      </div>
      <div class="mb-3">
        <label for="platforms" class="form-label">Plateformes</label>
      <select id="platforms" class="form-select" v-model="game_platform">
        <option v-for="platform in platforms" :key="platform" :value="platform">{{ platform }}</option>
      </select>  
      </div>
      <div class="mb-3">
        <label for="releaseYear" class="form-label">Date de sortie</label>
      <input type="text"  class="form-control" id="releaseYear" v-model="game_releaseYear" />
      </div>
      <div class="mb-3">
        
      <label for="genres" class="form-label">Genre(s)</label>
      <select id="genres" class="form-select" v-model="game_genres">
        <option v-for="genre in genres" :key="genre" :value="genre">{{ genre }}</option>
      </select>
      </div>
      <button type="submit" class="btn btn-success">Continuer </button>
      <SuccessAlert v-if="success">Jeu ajouté avec succès !</SuccessAlert>
      <ErrorAlert v-if="error">Une erreur s'est produite lors de l'ajout du jeu.</ErrorAlert>
    </form>
  </div>
</template>

<script >
import SuccessAlert from '@/components/ui/alert/SuccessAlert.vue';
import ErrorAlert from '@/components/ui/alert/ErrorAlert.vue';
import {Genre} from '../../../gil-back/src/game/enums/genre-enum';
import {Platform} from '../../../gil-back/src/game/enums/platform-enum';
import auth from '~/services/auth';

export default {
  components: {
    SuccessAlert,
    ErrorAlert,
  },
  data() {
    return {
      genres:Object.values(Genre),
      platforms : Object.values(Platform),
      game_name: "",
      game_releaseYear: "",
      game_genres: "",
      game_platform: "",
      success: false,
      error: false,
    };
  },
  methods: {
    async addGame(){
      const accesstoken = auth.getAccessToken()
      try {
        const gameData = {
          name : this.game_name,
          releaseYear : parseInt(this.game_releaseYear),
          genres: this.game_genres,
          platform : this.game_platform
        }
        await $fetch('http://localhost:5000/game', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accesstoken}`,

          },
          body: JSON.stringify(gameData),
        })
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

<style>
</style>
