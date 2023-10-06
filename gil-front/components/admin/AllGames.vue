<template>
  <div>
    <h1>Liste des jeux</h1>
    <div v-for="game in games" :key="game.id">
      <ul>
        <li>
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
