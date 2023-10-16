<template>
  <div>
    <h2>Liste des jeux</h2>
    <div v-for="game in games" :key="game.id">
      <ul class="list-group text-center">
        <li class="list-group-item">
          <NuxtLink :to="`/game/${game.id}`"><h2>{{ game.name }}</h2></NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>


<script setup>
import auth from '~/services/auth';
const accessToken = auth.getAccessToken();

  const { data: games } = await useFetch( `http://localhost:5000/game`, {
      headers : {
      'Authorization': `Bearer ${accessToken}`,
    }
  })

   

</script>
