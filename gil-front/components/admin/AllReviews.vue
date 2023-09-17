<script>
export default {

data() {
  return {
    reviews : []
  };
},
methods: {
  async getAllReviews () {
    try {
      const response = await $fetch('http://localhost:5000/review', {
        method: 'GET',
        headers: {
          'Content-Type' : 'application/json',
        }
      });

      const data = await response;
      this.reviews = data
    } catch(error) {
      console.error('Erreur lors de la recupérations des critiques')
    }
  },
  created() {
    this.getAllReviews()
  }
}
}
</script>

<template>
  <div>
    <h1>Toutes les critiques</h1>
    <ul>
      <li v-for="review in reviews" :key="review.id">
        <ul>
          <li>{{ review.content }}</li>
          <li>{{ review.rating }}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
