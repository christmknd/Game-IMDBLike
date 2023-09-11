<script setup>

const config = useRuntimeConfig()
const apiKey = config.public.RAWG_API_KEY;
console.log(apiKey)

const searchGame = async () => {
  try {
    
  } catch (error) {
    
  }
}
</script>

<template>
  <div class="gameSearch">
    <h1>Recherchez des jeux</h1>
    <form @submit.prevent="searchGame()">
    <input placeholder="Rechercher un livre" />
    <input type="button" value="Rechercher">
    </form>
    <div class="result">
      <p>{{  }}</p>
    </div>
  </div>
</template>

<style scoped>
.gameSearch {
  div {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
}
</style>
