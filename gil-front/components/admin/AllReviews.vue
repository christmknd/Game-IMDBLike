

<template>
  <div>
    <h1>Toutes les critiques</h1>
    <ul>
      <div v-for="review in reviews" :key="review.id">
        <h2>{{ review.title }}</h2>
        <ul>
          <li>{{ review.content }}</li>
          <li>{{ review.rating }}</li>
          <li>{{ review.pros }}</li>
          <li>{{ review.cons }}</li>
        </ul>
      </div>
    </ul>
  </div>
</template>

<script setup>
  const { data: reviews } = await useFetch(
      `http://localhost:5000/review`
    );
</script>

<style scoped></style>
