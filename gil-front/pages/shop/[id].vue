<script>
import ShopCard from '~/components/shop/ShopCard.vue';
export default {
  components: {
    ShopCard
  },
  data() {
    return {
      shopId: null 
    };
  },
  created() {
  this.shopId = this.$route.params.id;
},

}
</script>

<template>
  <div>
    <ShopCard :shop-id="parseInt(shopId)" /> 
  </div>
</template>

<style scoped></style>
