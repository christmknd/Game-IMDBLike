<template>
   <div>
    <Head>
      <Title>Détail de la critique</Title>
    </Head>
    <Body>
      <div class="card text-center">
        <h2 class="card-header">{{ review.title }}</h2>
        <div class="card-body">
          <ul  class="list-group list-group-flush">
            <li class="list-group-item">
              <div class="card-text">
            <p>{{ review.content }}</p>
          </div>
            </li>
            <li class="list-group-item"><p>Ajouté par</p></li>
            <li class="list-group-item"><p>Points forts : {{ review.pros }}</p></li>
            <li class="list-group-item"><p>Points faibles : {{ review.cons }}</p></li>
          </ul>     
            <button class="btn btn-warning" @click="editReview" :disabled="reviewUserId.value !== userId"  >Modifier la critique</button>
            <button class="btn btn-danger" @click="confirmDelete" :disabled="isDisabled">Supprimer la critique</button>
        </div>
        <router-link :to="`/game/${gameId}`">Retour à la page du jeux</router-link>
        <div class="card-footer">
          <p>Note : {{ review.rating }} </p>
        </div>
      </div>
    </Body>
  </div>
</template>

<script  setup>
definePageMeta({
  layout: "user",
});


import auth from '~/services/auth';
const accessToken = auth.getAccessToken();
const number = auth.getUserId()
const userId = parseInt(number)
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


//récuperer le userId de la review 

const {data : reviewUserId} = await useFetch(`http://localhost:5000/game/${gameId}/review/${reviewId}/user`, {
  method: 'GET',
  headers : {
    'Authorization': `Bearer ${accessToken} `
  }
})

const isDisabled = () => {
  if (reviewUserId.value !== userId) {
    return true;
  } else {
    return false;
  }
}

console.log('Review user ID: ',reviewUserId.value)

</script>


<style scoped></style>
