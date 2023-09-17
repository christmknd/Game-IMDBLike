<script>
export default {
  data() {
    return {
      game_name: "",
      game_releaseDate: "",
      game_genres: "",
      game_platforms: "",
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
        this.$emit('game-created');
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
      <input type="select" id="genres" v-model="game_genres">

      <label for="platforms">Plateformes</label>
      <input type="select" id="platforms" v-model="game_platforms" />      
      <button type="submit">Continuer </button>
    </form>
  </div>
</template>

<style scoped></style>
