<template>
  <div class="game-card">
    <Title>{{ game.name }}</Title>
    <h2>{{ game.name }}</h2>
    <h4>{{ username }}</h4>
    <p>Date de sortie : {{ game.releaseYear }}</p>
    <p>Genre : {{ game.genres }}</p>
    <p>Plateforme : {{ game.platform }}</p>
    <button class="btn btn-success" @click="addReview">Ajouter une review</button>
    <button class="btn btn-warning" @click="editGame">Modifier</button>
    <button class="btn btn-danger" @click="deleteGame">Supprimer</button>
    <div v-for="review in reviews" :key="review.id" class="review card">
      <h2>{{ review.title }}</h2>
        <ul>
          <router-link :to="`/game/${gameId}/review/${review.id}`">Voir la critique</router-link>
        </ul>
    </div>
    <router-link :to="`/game/`">Retour à la page des jeux</router-link>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "user",
  middleware: 'auth'
});


import auth from '~/services/auth';
const accessToken = auth.getAccessToken();
const username = auth.getUsername();
const route = useRoute();
const router = useRouter();
const gameId = route.params.id

const uri = `http://localhost:5000/game/${gameId}`

//fetch backend 
const {data: game} = await useFetch(uri , {
  headers : {
    'Authorization': `Bearer ${accessToken} `,
  }
})

const editGame = () => {
  router.push(`/game/${gameId}/edit`);
};

//deleteGame 
const deleteGame = async () => {
  try {
    await fetch(`http://localhost:5000/game/${gameId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  })
  router.push(`/game`);

  } catch (error) {
    console.log('Une erreur s\' est produite : le jeu n\' a pas pu être supprimé . \n')
  } 
}

//Liste de toutes les reviews d'un jeu 

const {data: reviews} = await useFetch(`http://localhost:5000/game/${gameId}/reviews`, {
  method: 'GET',
  headers : {
    'Authorization': `Bearer ${accessToken} `
  }
})

// Ajouter un review 
const addReview = () => {
  router.push(`/game/${gameId}/addreview`)
}


</script>

<style>
</style>