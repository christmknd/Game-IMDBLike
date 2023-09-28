

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

import auth from '~/services/auth';
const accessToken = auth.getAccessToken();

  const { data: reviews } = await useFetch(`http://localhost:5000/review`, {
    'Authorization': `Bearer ${accessToken} `,
  });
</script>

<style scoped></style>
