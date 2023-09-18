<script lang="ts" setup></script>

<template>
  <div>
    <header>
      <nav>
        <ul>
          <li><nuxt-link to="/admin/users">Utilisateurs</nuxt-link></li>
          <li><nuxt-link to="/admin/games">Jeux</nuxt-link></li>
          <li><nuxt-link to="/admin/reviews">Critiques</nuxt-link></li>
          <li><nuxt-link to="#">Se Déconnecter</nuxt-link></li>
        </ul>
      </nav>
    </header>
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