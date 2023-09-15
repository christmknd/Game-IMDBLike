<script>
definePageMeta({
  layout: "user",
});
export default {

  data() {
    return {
      shops: [] 
    };
  },
  methods: {
    async getAllShops() {
      try {
        const response = await $fetch('http://localhost:5000/shop/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      
          const data = await response;
          this.shops.push(...data)
          console.log('Liste des shops mise à jour avec succès !', data);
      } catch (error) {
        console.error('Une erreur s\'est produite : la liste des shops n\'a pas pu être récupérée');
      }
    },
  },
  created() {
    // Chargez la liste des shops lorsque le composant est créé
    this.getAllShops();
  },
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

<style scoped>
.div {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

li {
  text-decoration: none;
}
</style>
