<script  setup>

</script>

<template>
  <div class="container-fluid">
    <header>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">GameIMDBLike</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/">Home</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/login">Se connecter</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/register">S'inscrire</nuxt-link>
        </li>
      </ul>
    </div>
      </nav>
    </header>
    <slot />
    <footer class="bg-light fixed-bottom  ">
      <div class="text-center p-3" >
        <p class="text-dark" >Site crée par Christ M. - All Rights Reserved - 2023</p>
      </div>
    </footer>
  </div>
</template>

<style scoped></style>