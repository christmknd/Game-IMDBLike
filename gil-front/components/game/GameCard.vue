<template>
  <div class="game-card">
    <h2>{{ game.name }}</h2>
    <p>Date de sortie : {{ game.releaseYear }}</p>
    <p>Genre : {{ game.genre }}</p>
    <p>Plateforme : {{ game.platform }}</p>
  </div>
</template>

<script>
import { ref, defineProps } from 'vue';
const { game } = defineProps(['game']);
</script>

<style scoped>
.game-card {
  border: 1px solid #ddd;
  padding: 16px;
  margin: 16px;
}
</style>
