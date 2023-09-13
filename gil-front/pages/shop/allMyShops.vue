<script>
//import ShopCard from '~/components/shop/ShopCard.vue'; 

export default {
  data() {
    return {
      shops: [] 
    };
  },
  methods: {
    async loadShops() {
      try {
        await $fetch('http://localhost:5000/shop' , {
          method : 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        
        if (response.ok) {
          const shopsData = await response.json();
          console.log(shopsData)
          this.shops = shopsData;
          console/log(this.shops)
          console.log('Liste des shops mise à jour avec succès !');
        } else {
          console.error('Erreur lors de la récupération de la liste des shops.');
        }
      } catch (error) {
        console.error('Une erreur s\' est produite : la liste des shops n\' a pas pu être récupéré')
      }
    },
    handleShopDeleted(shopId) {
      this.shops = this.shops.filter(shop => shop.id !== shopId);
    },
    created() {
    this.loadShops();
  }
  }
}
</script>

<template>
   <div>
   <ShopForm /> 
   <h2>Liste des shops</h2>
   <ul>
    <li v-for="shop in shops" :key="shop.id">{{ shop.name }}</li>
   </ul>
  </div>
</template>

<style scoped></style>
