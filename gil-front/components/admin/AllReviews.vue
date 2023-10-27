

<template>
    <div class="card text-center">
      <div class="card-header">
        <h2 class="card-title">Toutes les critiques</h2>
      </div>
      <div class="card-body">
        <div v-for="review in reviews" :key="review.id">
        <h2>{{ review.title }}</h2>
        <ul class="list-group">
          <li class="list-group-item">{{ review.content }}</li>
          <li class="list-group-item">Note : {{ review.rating }}</li>
          <li class="list-group-item">Points posifitfs : {{ review.pros }}</li>
          <li class="list-group-item">Points négatifs :{{ review.cons }}</li>
        </ul>
      </div>
      </div>
    </div>   
</template>

<script setup>

import auth from '~/services/auth';
const accessToken = auth.getAccessToken();

  const { data: reviews } = await useFetch(`http://localhost:5000/review`, {
    headers : {
      'Authorization': `Bearer ${accessToken} `,
    }
  });

</script>

<style scoped></style>
