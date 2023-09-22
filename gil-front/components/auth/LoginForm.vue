<template>
  <div>
    <form @submit.prevent="login">
        <label htmlFor='username'>Username</label>
        <input 
          type="text" 
          id="username" 
          placeholder='username'
          v-model="form_username" 
          />
        <label htmlFor='password'>Mot de passe</label>
          <input 
          type="password" 
          id="password" 
          placeholder="password"
          v-model="form_password"
          />
          <button>Se connecter</button>
      </form>
  </div>
</template>

<script>
export default {
  data (){
    return {
      form_username : '',
        form_password : ''
    }
  },
  methods: {
    async login () {
      try {
        const formData = {
          username : this.form_username,
          password: this.form_password
        }

        await $fetch('http://localhost:5000/auth/login', {
          headers : {
            'Content-Type': 'application/json',
          } ,
          method: 'POST',
          body: JSON.stringify(formData)
          
        })
        this.$emit('user-logged');
        this.$router.push('/game')
        console.log('User connecté sur la plateforme avec succès')
      } catch (error) {
        console.error('Une erreur s\'est produite lors de l\'enrigistrement du user : ',error )
      }
    }
  }
}
</script>

<style scoped></style>