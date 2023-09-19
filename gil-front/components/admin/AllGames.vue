<template>
  <div>
    <h1>Liste des jeux</h1>
      <div v-for="game in games" :key="game.id">
        <ul>
          <li><h2>{{ game.name }}</h2></li>
          <li><em>{{ game.releaseYear }}</em></li>
          <li>{{ game.genre }}</li>
          <li>{{ game.platform }}</li>
        </ul>
      </div>
    </div>
</template>


<script setup>
  const { data: games } = await useFetch(
      `http://localhost:5000/game`
    );
</script>
