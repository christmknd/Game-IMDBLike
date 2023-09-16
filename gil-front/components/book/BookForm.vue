<script>
export default {
  data() {
    return {
      book_title : "",
      book_author: "",
      book_genre: "",
      book_description:"",
    };
  },
  methods: {
    async addBook (){
      try {
        const bookData = {
          title: this.book_title,
          author: this.book_author,
          genre: this.book_genre,
          description: this.book_description
        }
        await fetch('http://localhost:5000/book', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookData),
        });
        this.$emit('book-created');
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
    <form  @submit.prevent="addBook">
      <label for="title">Titre du livre :</label>
      <input type="text" id="title" v-model="book_title" required />

      <label for="author">Auteur</label>
      <input type="text" id="author" v-model="book_author" />

      <label for="genre">Genre</label>
      <input type="text" id="genre" v-model="book_genre">

      <label for="description">Description</label>
      <input type="textarea" id="description" v-model="book_description" />      
      <button type="submit">Continuer </button>
    </form>
  </div>
</template>

<style scoped></style>
