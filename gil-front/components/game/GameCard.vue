<template>
  <div class="game-card">
    <h2>{{ game.name }}</h2>
    <p>Date de sortie : {{ game.releaseYear }}</p>
    <p>Genre : {{ game.genre }}</p>
    <p>Plateforme : {{ game.platform }}</p>
  </div>
</template>

<script>
export default {
  methods: {
    async getGameById(gameId) {
      try {
        await $fetch(`http://localhost:5000/game/${gameId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (error) {
          console.error('Une erreur s\'est produite lors de la récupération du jeu :', error);
          return;
        }

        this.game = data;
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération du jeu :', error);
      }
    },
  },
};
</script>

<style scoped>
.game-card {
  border: 1px solid #ddd;
  padding: 16px;
  margin: 16px;
}
</style>
