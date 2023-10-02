<template>
    <div>
      <form  @submit.prevent="addReview">
        <div class="mb-3">
          <label for="title" class="form-label">Titre</label>
          <input type="text" class="form-control" id="title" v-model="review_title" required />
        </div>
        <div class="mb-3">
          <label for="content" class="form-label">Contenu</label>
        <textarea class="form-control" id="content" v-model="review_content"></textarea>
        </div>
       <div class="mb-3">
        <label for="pros" class="form-label">Points forts</label>
        <input id="pros" class="form-control" v-model="review_pros">
       </div>
       <div class="mb-3">
        <label for="platforms" class="form-label">Points faibles</label>
        <textarea id="platforms" class="form-control" v-model="review_cons"></textarea>
       </div>
       <div class="mb-3">
        <label for="rating" class="form-label">Note</label>
        <input type="rating" class="form-control" v-model="review_rating"/>
       </div>
        <button type="submit" class="btn btn-success">Continuer </button>

      </form>
    </div>
  </template>
  
  <script setup >
  import auth from '~/services/auth';

  const router = useRouter();
  const route = useRoute();
  const gameId = route.params.id;
  console.log(gameId);

  const review_title = ref("");
  const review_content = ref("");
  const review_pros = ref("");
  const review_cons = ref("");
  const review_rating = ref("");
  
  const addReview = async () => {
        const accesstoken = auth.getAccessToken()
        try {
          const reviewData = {
            title : review_title.value,
            content : review_content.value,
            pros: review_pros.value,
            cons: review_cons.value,
            rating : parseInt(review_rating.value)
          }
          await $fetch(`http://localhost:5000/game/${gameId}/review`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accesstoken}`
            },
            body: JSON.stringify(reviewData),
          })
          router.push(`/game/${gameId}`)
          console.log('Jeu ajouté avec succès !');
  
        } catch (error) {
          console.error('Une erreur s\'est produite lors de l\'ajout du jeu : ',error )
        }
      }
  </script>
  
  <style scoped>
  </style>
  