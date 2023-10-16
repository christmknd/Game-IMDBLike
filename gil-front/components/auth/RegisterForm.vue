<template>
  <div>
    <h1>S'inscrire</h1>
    <form @submit.prevent="register">
      <div class="mb-3">
        <label htmlFor='username' class="form-label">Username</label>
            <input 
            class="form-control"
            type="text" 
            id="username" 
            placeholder='username' 
            v-model="form_username"/>
      </div>
      <div class="mb-3">
        <label htmlFor='email' class="form-label">Email</label>
            <input 
            class="form-control"
          type="text" 
          id="email" 
          placeholder='email'
          v-model="form_email" 
          />
      </div>
      <div class="mb-3">
        <label for="playertype" class="form-label">Type de joueur</label>
        <select id="playertype" class="form-select" v-model="form_playertype">
          <option v-for="playertype in playertypes" :key="playertype" :value="playertype">{{ playertype }}</option>
        </select>
      </div>
     <div class="mb-3">
      <label for="playermode" class="form-labe mb-3">Mode de jeu préféré</label>
        <select id="playermode" class="form-select mb-3" v-model="form_playermode">
          <option v-for="playermode in playermodes" :key="playermode" :value="playermode">{{ playermode }}</option>
        </select>    
     </div>
     <div class="mb-3">
      <label htmlFor='password' class="form-label">Mot de passe</label>
            <input 
            class="form-control"
            type="password" 
            id="password" 
            placeholder="password"
            v-model="form_password"/>
            <div id="pwdhelp" class="form-text">Le mot de passe doit contenir au moins 6 caractères<label></label></div>
     </div>
        <button type="submit" class="btn btn-primary">S'inscrire</button>
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
        await authService.register(formData.username, this.form_email, this.form_password, this.form_playertype,this.form_playermode);
        this.$emit('user-registered');
        this.$router.push('/login')
        console.log('User enregistré sur la plateforme avec succès')
      } catch (error) {
        console.error('Une erreur s\'est produite lors de l\'enrigistrement du user : ',error )
      }
    }
  }
}
</script>


<style scoped></style>
