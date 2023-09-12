<script>
export default {
  data() {
    return {
      shopName: ""
    };
  }

  methods: {
    async createShop() {
      try {
        await $fetch('http://localhsot:5000/shop')
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
