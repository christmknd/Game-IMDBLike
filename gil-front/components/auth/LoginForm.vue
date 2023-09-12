<script>
export default {
  data: () => {
    return {
      form : {
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
        <label htmlFor='pseudo'>pseudo</label>
        <input 
          type="text" 
          id="pseudo" 
          placeholder='pseudo'
          v-model="form.pseudo" 
          />
        <label htmlFor='password'>Mot de passe</label>
          <input 
          type="password" 
          id="password" 
          placeholder="password"
          v-model="form.password"
          />
          <button>Se connecter</button>
      </form>
  </div>
</template>

<style scoped></style>