<script>
export default {
  props: {
    shop: Object,
    required: true
  },
  methods: {
    async deleteShop() {
      try {
        await $fetch(`/shop/${this.shop.id}` , {
          method : 'DELETE',
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<template>
  <div class="shop-card">
    <h2>{{ shop.name }}</h2>
    <button @click="deleteShop">Supprimer</button>
  </div>
</template>

<style scoped></style>
