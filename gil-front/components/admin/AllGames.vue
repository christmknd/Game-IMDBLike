<template>
  <div>
    <h1>Liste des jeux</h1>
      <li v-for="game in games" :key="game.id">
        <ul>
          <li><h2>{{ game.name }}</h2></li>
          <li><em>{{ game.releaseYear }}</em></li>
          <li>{{ game.genre }}</li>
          <li>{{ game.platform }}</li>
        </ul>
      </li>
    </div>
</template>


<script>
export default {

  data () {
    return {
      games : [],
    }
  },
  method: {
   async getAllgames () {
    try {
    const response = await $fetch('http://localhost:5000/game', {
      method : 'GET',
      headers: {
          'Content-Type' : 'application/json',
      }
    })
    const data = await response;
    this.games.push(...data)
    return this.games
  } catch (error) {
    console.error('Erreur lors de la recupérations des jeux', error)
  }
   },
  },
}


</script>
