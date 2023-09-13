<script>
export default {
  data() {
    return {
      shopName: ""
    };
  },
  methods: {
    async createShop() {
      try {
        const shopData = {name : this.shopName}
       const response =  await $fetch('http://localhost:5000/shop' , {
          method : 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(shopData) 
        });
        if (response.ok) {
          this.$emit('shop-created');
          console.log('Shop créé avec succès !');
        } else {
          console.error('Erreur lors de la création du shop.');
        }
      } catch(error) {
        console.error('Une erreur s\'est produite :', error);

      }
    }
  }
}
</script>

<template>
  <div>
    <form @submit.prevent="createShop">
      <div>
        <label for="name">Nom du Shop:</label>
        <input type="text" id="name" v-model="shopName" required />
      </div>
      <div>
        <button type="submit">Créer Shop</button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
