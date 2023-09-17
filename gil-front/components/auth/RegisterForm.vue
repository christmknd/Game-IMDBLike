<script >
export default {
  data () {
    return {
        username : '',
        password : ''
      }
    }, 
  methods: {
    async register () {
      try {
        const formData = {
          username : this.username,
          password: this.password
        }

        await $fetch('http:localhost:5000/auth/register', {
          headers : {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ${access_token}'
          } ,
          body: JSON.stringify(formData)
          
        })
        this.$emit('user-registered');
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
    <form @submit.prevent="register">
        <label htmlFor='username'>Username</label>
            <input 
            type="text" 
            id="username" 
            placeholder='username' 
            v-model="form.username"/>
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
