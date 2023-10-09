<template>
  <div>
    <Head>
      <Title>Modifier {{ game.name }} </Title>
    </Head>
    <Body>
      <h1>Modifier le jeu : {{ game.name }}</h1>
    <form @submit.prevent="updateGame">
      <div class="mb-3">
        <label for="name" class="form-label">Nom du jeu</label>
        <input v-model="updatedGame.name" type="text" class="form-control" id="name">
      </div>
      <div class="mb-3">
        <label for="releaseYear" class="form-label">Année de sortie</label>
        <input v-model="updatedGame.releaseYear" type="number" class="form-control" id="releaseYear">
      </div>
      <button type="submit" class="btn btn-primary">Enregistrer</button>
    </form>
    </Body>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "user",
});

import { ref } from 'vue';
import auth from '~/services/auth';
const accessToken = auth.getAccessToken();
const router = useRouter();

const { id } = useRoute().params;
const uri = `http://localhost:5000/game/${id}`;

const { data: game } = await useFetch(uri, {
  headers: {
    'Authorization': `Bearer ${accessToken}`,
  }
});

const updatedGame = ref({}); // Créez un objet vide pour stocker les données mises à jour

const updateGame = async () => {
  try {
    await fetch(`http://localhost:5000/game/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedGame.value), // Envoyez les données mises à jour
    });
    console.log('Jeu modifié avec succès !')
    router.push(`/game/${id}`); 
  } catch (error) {
    console.log('Une erreur s\'est produite : le jeu n\'a pas pu être mis à jour. \n', error);
  }
};
</script>

<style scoped></style>
