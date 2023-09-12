<script >
export default {
  data: () => {
    return {
      form : {
        lastname: '',
        firstname : '',
        pseudo : '',
        password : ''
      }
    }
  }
}
</script>

<template>
  <div>
    <form>
        <label for="lastname">Prénom</label>
            <input 
            type="text"
            id="lastname"
            placeholder="nom"
            v-model="form.lastname">
        <label for="firstname">Nom</label>
            <input 
            type="text"
            id="firstname"
            placeholder="prenom"
            v-model="form.firstname">
        <label htmlFor='pseudo'>Pseudo</label>
            <input 
            type="text" 
            id="pseudo" 
            placeholder='pseudo' 
            v-model="form.pseudo"/>
        <label htmlFor='password'>Mot de passe</label>
            <input 
            type="password" 
            id="password" 
            placeholder="password"
            v-model="form.password"/>
        <button>Se connecter</button>
        </form>
  </div>
</template>

<style scoped></style>
