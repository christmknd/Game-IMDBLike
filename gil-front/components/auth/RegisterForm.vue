<script lang="ts" setup></script>

<template>
  <div>
    <form>
        <label for="lastname">Prénom</label>
            <input 
            type="text"
            id="lastname"
            placeholder="prenom">
        <label for="firstname">Nom</label>
            <input 
            type="text"
            id="firstname"
            placeholder="prenom">
        <label htmlFor='pseudo'>Pseudo</label>
            <input 
            type="text" 
            id="pseudo" 
            placeholder='pseudo' 
            />
        <label htmlFor='password'>Mot de passe</label>
            <input 
            type="password" 
            id="password" 
            placeholder="password"
            />
        <button>Se connecter</button>
        </form>
  </div>
</template>

<style scoped></style>
