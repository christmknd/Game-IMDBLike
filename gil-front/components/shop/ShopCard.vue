<script>
export default {
  props: {
    shopId: Number 
  },
  data() {
    return {
      shop: null 
    };
  },
  created() {
    this.getShopById();
  },
  methods: {
    async getShopById(){
      try {
        const response = await $fetch(`http://localhost:5000/shop/${this.shopId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        this.shop = await response;
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération du shop :', error);
      }
    }
  }
}
</script>

<template>
  <div class="shop-card">
    <div v-if="shop">
    <h2>{{ shop.name }}</h2>
    </div>
    <div v-else>
    <p>Chargement en cours...</p>
    </div>
  </div>
</template>

<style scoped></style>
