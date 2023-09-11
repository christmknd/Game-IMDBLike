<script lang="ts" setup></script>

<template>
  <div>
    <header>
      <nav>
        <ul>
          <li><nuxt-link to="/">Home</nuxt-link></li>
          <li><nuxt-link to="/login">Se connecter</nuxt-link></li>
          <li><nuxt-link to="/register">S'inscrire</nuxt-link></li>
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