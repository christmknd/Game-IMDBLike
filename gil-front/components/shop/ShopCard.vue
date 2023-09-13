<script>
import GameCard from '~/components/GameCard.vue'; // Assurez-vous d'importer correctement le composant GameCard

export default {
  props: {
    shop: Object, // Assurez-vous que shop est un objet contenant un tableau de jeux (games)
  },
  methods: {
    async deleteShop() {
      // Mettez ici votre logique de suppression de shop si nécessaire
    },
  },
  components: {
    GameCard,
  },
};
</script>

<template>
  <div class="shop-card">
    <h2>{{ shop.name }}</h2>
    <button @click="deleteShop">Supprimer</button>
    <div>
      <h3>Jeux dans ce shop :</h3>
      <div v-for="gameId in shop.games" :key="gameId">
        <GameCard :gameId="gameId" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
