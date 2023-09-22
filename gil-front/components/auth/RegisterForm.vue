<template>
  <div>
    <form @submit.prevent="register">
        <label htmlFor='username'>Username</label>
            <input 
            type="text" 
            id="username" 
            placeholder='username' 
            v-model="form_username"/>
         <label htmlFor='email'>Email</label>
            <input 
          type="text" 
          id="email" 
          placeholder='email'
          v-model="form_email" 
          />
        <label for="playertype">Type de joueur</label>
        <select id="playertype" v-model="form_playertype">
          <option v-for="playertype in playertypes" :key="playertype" :value="playertype">{{ playertype }}</option>
        </select>

        <label for="playermode">Mode de jeu préféré</label>
        <select id="playermode" v-model="form_playermode">
          <option v-for="playermode in playermodes" :key="playermode" :value="playermode">{{ playermode }}</option>
        </select>    
        <label htmlFor='password'>Mot de passe</label>
            <input 
            type="password" 
            id="password" 
            placeholder="password"
            v-model="form_password"/>
        <button>S'inscrire</button>
        </form>
  </div>
</template>


<script >
import {Playertype} from '../../../gil-back/src/users/enums/playertype.enum';
import {PlayerMode} from '../../../gil-back/src/users/enums/playermode.enum';
import authService from '~/services/auth'

export default {
  data () {
    return {
      playertypes : Object.values(Playertype),
      playermodes:Object.values(PlayerMode) ,
      form_username : '',
      form_email: '',
      form_password : '',
      form_playertype : '',
      form_playermode:'' ,
      }
    }, 
  methods: {
    async register () {
      try {
        const formData = {
          username : this.form_username,
          email : this.form_email,
          password: this.form_password,
          player_type: this.form_playertype,
          player_mode: this.form_playermode,
        }

        await authService.register(this.form_username, this.form_email, this.form_password);
        this.$emit('user-registered');
        this.$router.push('/game')
        console.log('User enregistré sur la plateforme avec succès')
      } catch (error) {
        console.error('Une erreur s\'est produite lors de l\'enrigistrement du user : ',error )
      }
    }
  }
}
</script>


<style scoped></style>
