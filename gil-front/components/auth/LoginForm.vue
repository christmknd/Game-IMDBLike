<script>
export default {
  data (){
    return {
      form : {
        username : '',
        password : ''
      }
    }
  },
  methods: {
    async login () {
      try {
        const formData = {
          username : this.username,
          password: this.password
        }

        await $fetch('http:localhost:5000/auth/login', {
          headers : {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ${access_token}'
          } ,
          body: JSON.stringify(formData)
          
        })
        this.$emit('user-logged');
        console.log('User enregistré sur la plateforme avec succès')
      } catch (error) {
        console.error('Une erreur s\'est produite lors de l\'enrigistrement du user : ',error )
      }
    }
  }
}
</script>

<template>
  <div>
    <form>
        <label htmlFor='pseudo'>Username</label>
        <input 
          type="text" 
          id="username" 
          placeholder='username'
          v-model="username" 
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