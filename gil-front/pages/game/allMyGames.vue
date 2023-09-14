<script>
export default {

data() {
  return {
    games: [] 
  };
},
methods: {
  async getAllGames() {
    try {
      const response = await $fetch('http://localhost:5000/game', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
        const data = await response;
        console.log(response)
        this.games.push(...data)
        console.log('Liste des shops mise à jour avec succès !', data);
    } catch (error) {
      console.error('Une erreur s\'est produite : la liste des shops n\'a pas pu être récupérée');
    }
  },
},
created() {
  // Chargez la liste des shops lorsque le composant est créé
  this.getAllGames();
},
}
</script>

<template>
  <div>
    <h1>Liste des jeux </h1>
    <ul>
      <li v-for="game in games" :key="game.id">
        <ul>
          <li>{{ game.name }}</li>
          <li>{{ game.releaseDate }}</li>
          <li>{{ game.genres }}</li>
          <li>{{ game.platforms }}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
