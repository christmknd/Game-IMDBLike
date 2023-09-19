<template>
    <div>
      <form  @submit.prevent="addReview">
        <label for="title">Titre</label>
        <input type="text" id="title" v-model="review_title" required />
  
        <label for="content">Contenu</label>
        <input type="textarea" id="content" v-model="review_content" />
  
        <label for="pros">Points forts</label>
        <input id="pros" v-model="review_pros">
   
  
        <label for="platforms">Points faibles</label>
        <input id="platforms" v-model="review_cons"/>

        <label for="rating">Note</label>
        <input id="rating" v-model="review_rating"/>
              
        <button type="submit">Continuer </button>
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
  