<template>
   <div>
    <h2>{{ review.title }}</h2>
    <p>{{ review.content }}</p>
    <p>Note : {{ review.rating }}</p>
    <p>Points forts : {{ review.pros }}</p>
    <p>Points faibles : {{ review.cons }}</p>
    <button class="btn btn-warning" @click="editReview">Modifier la critique</button>
    <button class="btn btn-danger" @click="deleteReview">Supprimer la critique</button>
  </div>
</template>

<script  setup>
definePageMeta({
  layout: "user",
  middleware: 'connected'
});
useHead({
  title: 'Détail de la critique'
});

import auth from '~/services/auth';
const accessToken = auth.getAccessToken();
import { useRouter, useRoute } from 'vue-router';

const route = useRoute();
const router = useRouter();

const gameId = route.params.id;
const reviewId = route.params.reviewId;
const uri = `http://localhost:5000/game/${gameId}/review/${reviewId}`;

// Fetch des données de la critique
const { data: review } = await useFetch(uri, {
  headers: {
    'Authorization': `Bearer ${accessToken}`,
  }
});


const editReview = () => {
  router.push(`/game/${gameId}/review/${reviewId}/edit`);
};

// Fonction pour supprimer la critique
const deleteReview = async () => {
  try {
    await fetch(`http://localhost:5000/game/${gameId}/review/${reviewId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('Critique supprimée avec succès !');
    router.push(`/game/${gameId}`); 
  } catch (error) {
    console.error('Une erreur s\'est produite : la critique n\'a pas pu être supprimée. \n', error);
  }
};
</script>


<style scoped></style>
