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
        <textarea id="rating" class="form-control" v-model="review_rating"></textarea>
       </div>
        <button type="submit" class="btn btn-success">Continuer </button>
        <SuccessAlert v-if="success">Jeu ajouté avec succès !</SuccessAlert>

      <ErrorAlert v-if="error">Une erreur s'est produite lors de l'ajout du jeu.</ErrorAlert>
      </form>
    </div>
  </template>
  
  <script >
  import SuccessAlert from '@/components/ui/alert/SuccessAlert.vue';
  import ErrorAlert from '@/components/ui/alert/ErrorAlert.vue';
  export default {
    components: {
      SuccessAlert,
      ErrorAlert,
    },
    data() {
      return {
        review_title : "",
        review_content: "",
        review_genres: "",
        review_pros: "",
        review_cons: "",
        review_rating: "",
        success: false,
        error: false,
      };
    },
    methods: {
      async addReview(){
        try {
          const reviewData = {
            title : this.review_title,
            content : this.review_content,
            pros: this.review_pros,
            cons: this.review_cons,
            rating : this.review_platform
          }
          await $fetch('http://localhost:5000/review', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData),
          })
          this.success = true;
          this.error = false;
          console.log('Jeu ajouté avec succès !');
  
        } catch (error) {
          console.error('Une erreur s\'est produite lors de l\'ajout du jeu : ',error )
        }
      }
    }
  }
  </script>
  
  <style scoped>
  </style>
  