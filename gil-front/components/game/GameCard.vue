<script>
export default {
  props: {
    gameId: Number 
  },
  data() {
    return {
      game: null 
    };
  },
  created() {
    this.getShopById();
  },
  methods: {
    async getShopById(){
      try {
        const response = await $fetch(`http://localhost:5000/game/${this.shopId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        this.game = await response;
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération du shop :', error);
      }
    }
  }
}
</script>

<template>
    <div class="shop-card">
      <div v-if="loading">Chargement en cours...</div>

      <div v-else>
        <ul>
          <li v-for="game in games" :key="game.id">
            
            {{ game.name }} <br>
          <img :src="game.background_image" alt="Image du jeu" style="height: 200px; width: 200px;object-fit: cover;"> <br> 
          Date de sortie :   {{ game.released }}<br>
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
          </li> <br>
        </ul>
      </div>
    </div>
</template>

<style scoped></style>
