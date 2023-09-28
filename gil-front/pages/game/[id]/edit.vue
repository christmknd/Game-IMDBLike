<template>
    <div>
      <h1>Modifier le jeu</h1>
      <form @submit.prevent="updateGame">
        <div class="mb-3">
          <label for="name" class="form-label">Nom du jeu</label>
          <input type="text" class="form-control" id="name" v-model="gameData.name" required>
        </div>
        <div class="mb-3">
          <label for="releaseYear" class="form-label">Année de sortie</label>
          <input type="number" class="form-control" id="releaseYear" v-model="gameData.releaseYear" required>
        </div>
        <!-- Ajoutez d'autres champs pour les autres informations du jeu -->
        <button type="submit" class="btn btn-primary">Enregistrer les modifications</button>
      </form>
    </div>
  </template>
  
  <script setup>
</script>
