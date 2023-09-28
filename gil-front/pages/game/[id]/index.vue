<template>
  <div class="game-card">
    <h2>{{ game.name }}</h2>
    <p>Date de sortie : {{ game.releaseYear }}</p>
    <p>Genre : {{ game.genres }}</p>
    <p>Plateforme : {{ game.platform }}</p>
    <button class="btn btn-warning" @click="editGame">Modifier</button>
    <button class="btn btn-danger" @click="deleteGame">Supprimer</button>
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
const router = useRouter();

const {id} = useRoute().params
const uri = `http://localhost:5000/game/${id}`

//fetch backend 
const {data: game} = await useFetch(uri , {
  headers : {
    'Authorization': `Bearer ${accessToken} `,
  }
})

//editGame 


//deleteGame 
const deleteGame = async () => {
  try {
    await fetch(`http://localhost:5000/game/${id}`, {
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

const editGame = () => {
  router.push(`/game/${id}/edit`);
};

</script>

<style>
</style>