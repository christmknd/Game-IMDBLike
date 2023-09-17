<script>
export default {

data() {
  return {
    games : []
  };
},
methods: {
  async getAllGames () {
    try {
      const response = await $fetch('http://localhost:5000/game', {
        method: 'GET',
        headers: {
          'Content-Type' : 'application/json',
        }
      });

      const data = await response;
      this.games.push(...data)
      console.log(data)
    } catch(error) {
      console.error('Erreur lors de la recupérations des critiques')
    }
  },
  created() {
    this.getAllGames()
  }
}
}
</script>

<template>
  <div>
    <h1>Listes des jeux</h1>
    <ul>
      <li v-for="game in games" :key="game.id">
        <ul>
          <li> <h2>{{ game.name }}</h2></li>
          <li> <em> {{ game.releaseYear }}</em></li>
          <li>{{ game.genre }}</li>
          <li>{{ game.platform  }}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
