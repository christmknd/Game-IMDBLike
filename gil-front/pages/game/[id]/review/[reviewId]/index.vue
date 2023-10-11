<template>
   <div>
    <Head>
      <Title>Détail de la critique</Title>
    </Head>
    <Body>
      <h2>{{ review.title }}</h2>
    <p>{{ review.content }}</p>
    <p>Ajouté par {{ review.added_by }}</p>
    <p>Note : {{ review.rating }}</p>
    <p>Points forts : {{ review.pros }}</p>
    <p>Points faibles : {{ review.cons }}</p>
    <p>Ajouté le {{ review.createdOn }}</p>
    <button class="btn btn-warning" @click="editReview">Modifier la critique</button>
    <button class="btn btn-danger" @click="confirmDelete">Supprimer la critique</button>
    <router-link :to="`/game/${gameId}`">Retour à la page du jeux</router-link>
    </Body>
  </div>
</template>

<script  setup>
definePageMeta({
  layout: "user",
});


import auth from '~/services/auth';
const accessToken = auth.getAccessToken();
import { useRouter, useRoute } from 'vue-router';

const route = useRoute();
const router = useRouter();


const gameId = parseInt(route.params.id);
const reviewId = parseInt(route.params.reviewId);
const uri = `http://localhost:5000/game/${gameId}/review/${reviewId}`;

// Fetch des données de la critique
const { data: review  } = await useFetch(uri, {
  headers: {
    'Authorization': `Bearer ${accessToken}`,
  }
});


const editReview = () => {
  router.push(`/game/${gameId}/review/${reviewId}/edit`);
};

const confirmDelete = () => {
      if (window.confirm('Êtes-vous sûr de vouloir supprimer cette critique ?')) {
        deleteReview();
      }
    };


// Fonction pour supprimer la critique
const deleteReview = async () => {
  try {
    await $fetch(`http://localhost:5000/review/${reviewId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
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
