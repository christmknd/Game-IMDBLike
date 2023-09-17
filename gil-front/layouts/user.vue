<script lang="ts" setup></script>

<template>
  <div>
    <nav>
      <ul>
          <li><nuxt-link to="/user/search">Search</nuxt-link></li>
          <li><nuxt-link to="/user/addGame">Ajouter un jeu</nuxt-link></li>
          <li><nuxt-link to="#">Se Déconnecter</nuxt-link></li>
    </ul>
    </nav>
  
    <slot />
    <footer>
      <ul>
        <li>Site crée par Christ M.</li>
        <li>All Rights Reserved - 2023</li>
    </ul>
    </footer>
  </div>
</template>

<style scoped></style>