<script>
export default {
  data() {
    return {
      movie_title : "",
      movie_director: "",
      movie_releaseYear: "",
      movie_summary: "",
      movie_genre: "",
      movie_language:"",
    };
  },
  methods: {
    async addmovie (){
      try {
        const movieData = {
          title: this.movie_title,
          director: this.movie_director,
          releaseYear: this.movie_releaseYear,
          summary: this.movie_summary,
          genre: this.movie_genre,
          language: this.movie_language
        }
        await fetch('http://localhost:5000/movie', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(movieData),
        });
        this.$emit('movie-created');
        console.log('Jeu ajouté avec succès !');
      } catch(error){
        console.error('Une erreur s\'est produite lors de l\'ajout du livre :', error)
      }
    }
  }
  
}
</script>

<template>
  <div>
    <form  @submit.prevent="addmovie">
      <label for="title">Titre du film :</label>
      <input type="text" id="title" v-model="movie_title" required />

      <label for="director">Réalisateur</label>
      <input type="text" id="director" v-model="movie_director" />

      <label for="releaseYear">Année de sortie</label>
      <input type="text" id="releaseYear" v-model="movie_releaseYear" />

      <label for="summary">Résumé</label>
      <input type="textarea" id="summary" v-model="movie_summary" />

      <label for="genre">Genre</label>
      <input type="select" id="genre" v-model="movie_genre">

      <label for="language">Langue</label>
      <input type="text" id="language" v-model="movie_language" /> 
      
      <button type="submit">Continuer </button>
    </form>
  </div>
</template>

<style scoped></style>
