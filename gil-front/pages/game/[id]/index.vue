<template>
  <div class="game-card">
    <h2>{{ game.name }}</h2>
    <p>Date de sortie : {{ game.releaseYear }}</p>
    <p>Genre : {{ game.genres }}</p>
    <p>Plateforme : {{ game.platform }}</p>
    <button class="btn btn-success" @click="addReview">Ajouter une review</button>
    <button class="btn btn-warning" @click="editGame">Modifier</button>
    <button class="btn btn-danger" @click="deleteGame">Supprimer</button>
    <div v-for="review in reviews" :key="review.id" class="review card">
      <h2>{{ review.title }}</h2>
        <ul>
          <li>{{ review.content }}</li>
          <li>{{ review.rating }}</li>
          <li>{{ review.pros }}</li>
          <li>{{ review.cons }}</li>
          <button class="btn btn-warning" @click="editReview">Modifier la review</button>
          <button class="btn btn-danger">Supprimer la review</button>
        </ul>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "user",
  middleware: 'connected'
});
useHead({
  title: 'Détail du jeu'
})

import auth from '~/services/auth';
const accessToken = auth.getAccessToken();
const route = useRoute();
const router = useRouter();


const gameId = route.params.id
console.log(gameId)

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

//Edit un review 
const editReview = (reviewId) => {
  router.push(`/game/${gameId}/editreview/`)
}

const deleteReview = async (reviewId) => {
  try {
    await fetch(`http://localhost:5000/game/${gameId}/review/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    const { data: updatedReviews } = await useFetch(`http://localhost:5000/game/${gameId}/reviews`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    reviews.value = updatedReviews;
  } catch (error) {
    console.error('Une erreur s\'est produite : la review n\'a pas pu être supprimée. \n', error);
  }
}
//editGame 

</script>

<style>
</style>