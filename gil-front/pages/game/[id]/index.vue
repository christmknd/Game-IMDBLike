<template>
  <div>
    <Title>{{ game.name }}</Title>
      <div class="container">
          <div class="card text-center">
            <div class="card-header">
              <h1>Détail du jeu</h1>
            </div>
            <div class="card-body">
              <h2 class="card-title">{{ game.name }}</h2>
              <ul class="list-group list-group-flush">
                <li class="list-group-item"><p>Date de sortie : {{ game.releaseYear }}</p></li>
                <li class="list-group-item"><p>Genre : {{ game.genres }}</p></li>
                <li class="list-group-item"><p>Plateforme : {{ game.platform }}</p></li>
              </ul>
              <button class="btn btn-success" @click="addReview">Ajouter une review</button>
              <button class="btn btn-warning" @click="editGame">Modifier</button>
              <button class="btn btn-danger" @click="deleteGame" disabled>Supprimer</button>
              </div>
            <router-link :to="`/game/`">Retour à la page des jeux</router-link>
          </div>
          <div class="card">
            <div class="card-header">
              <h3 class="card-title text-center">Toutes les critiques </h3>
            </div>
            <div v-for="review in reviews" :key="review.id">
            <div class="card-body">
              <h4>{{ review.title }}</h4>
              <ul class="list-group">
                  <router-link :to="`/game/${gameId}/review/${review.id}`">Voir la critique</router-link>
              </ul>
            </div>
          </div>
          </div>
      </div> 
  </div>
</template>

<script setup>
definePageMeta({
  layout: "user",
});


import auth from '~/services/auth';
const accessToken = auth.getAccessToken();
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
.container{
  margin-top: 3rem;
  margin-bottom: 1.5rem;
}
</style>