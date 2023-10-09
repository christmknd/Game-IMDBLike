<template>
  <div>
      <Head>
        <Title>Modifier une critique</Title>
      </Head>
      <Body>
        <h1>Modifier la critique du jeu</h1>
          <form @submit.prevent="updateReview">
            <div class="mb-3">
              <label for="content" class="form-label">Contenu de la critique</label>
              <textarea v-model="updatedReview.content" class="form-control" id="content"></textarea>
            </div>
            <div class="mb-3">
              <label for="rating" class="form-label">Note</label>
              <input v-model="updatedReview.rating" type="number" class="form-control" id="rating">
            </div>
            <div class="mb-3">
              <label for="pros" class="form-label">Points forts</label>
              <input v-model="updatedReview.pros" type="text" class="form-control" id="pros">
            </div>
            <div class="mb-3">
              <label for="cons" class="form-label">Points faibles</label>
              <input v-model="updatedReview.cons" type="text" class="form-control" id="cons">
            </div>
            <button type="submit" class="btn btn-primary">Enregistrer</button>
          </form>
      </Body>
    </div>
  </template>
  
  <script setup>
  definePageMeta({
    layout: "user",
    middleware: 'auth'
  });
  useHead({
    title: 'Modifier une review'
  })
  import { ref } from 'vue';
  import auth from '~/services/auth';
  const accessToken = auth.getAccessToken();
  import { useRouter, useRoute } from 'vue-router';
  
  const route = useRoute();
  const router = useRouter();
  
  
  const gameId  = route.params.id;
  const reviewId = route.params.reviewId;

  const uri = `http://localhost:5000/game/${gameId}/review/${reviewId}`;
  
  
  const updatedReview = ref({}); // Créez un objet vide pour stocker les données mises à jour
  
  const updateReview = async () => {
    try {
      await fetch(uri, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedReview.value), // Envoyez les données mises à jour
      });
      console.log('Critique modifiée avec succès !');
      router.push(`/game/${gameId}`); 
    } catch (error) {
      console.log('Une erreur s\'est produite : la critique n\'a pas pu être mise à jour. \n', error);
    }
  };
  </script>
  
  <style>
  
  </style>