<template>
  <div class="game-card">
    <div v-if="game">
      {{ game.name }} <br>
      <img :src="game.background_image" alt="Image du jeu" style="height: 200px; width: 200px; object-fit: cover;"> <br> 
      Date de sortie : {{ game.released }} <br>
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
    </div>
    <div v-else>
      Chargement en cours...
    </div>
  </div>
</template>

<script>
export default {
  props: {
    gameId: Number,
  },
  data() {
    return {
      game: null,
    };
  },
  created() {
    this.getGameById();
  },
  methods: {
    async getGameById() {
      try {
        const response = await $fetch(`http://localhost:5000/game/${this.gameId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        this.game = await response.json();
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération du jeu :', error);
      }
    },
  },
};
</script>

<style scoped></style>
