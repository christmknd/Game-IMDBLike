<script>
export default {
  data (){
    return {
        email : '',
        password : ''
    }
  },
  methods: {
    async login () {
      try {
        const formData = {
          email : this.email,
          password: this.password
        }

        await $fetch('http:localhost:5000/auth/login', {
          headers : {
            'Content-Type': 'application/json',
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
        <label htmlFor='email'>Email</label>
        <input 
          type="text" 
          id="email" 
          placeholder='email'
          v-model="email" 
          />
        <label htmlFor='password'>Mot de passe</label>
          <input 
          type="password" 
          id="password" 
          placeholder="password"
          v-model="password"
          />
          <button>Se connecter</button>
      </form>
  </div>
</template>

<style scoped></style>