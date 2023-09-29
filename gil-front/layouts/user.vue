<script setup>
  import { useRouter } from 'vue-router';
  import auth from '~/services/auth';

  const router = useRouter();

  const logout = async () => {
    auth.logout();
    await router.push('/login'); // Redirige vers la page de connexion
  };
</script>

<template>
  <div class="container-fluid">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">GameIMDBLike</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/game">Jeux</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/game/addreview">Ajouter une review</nuxt-link>
        </li>
        <li class="nav-item">
          <button @click="logout">Se Déconnecter</button>
        </li>
      </ul>
    </div>
      </nav>
    <slot />
    <footer class=" fixed-botttom bg-light text-center text-lg-start">
      <footer class="bg-light fixed-bottom  ">
      <div class="text-center p-3" >
        <p class="text-dark" >Site crée par Christ M. - All Rights Reserved - 2023</p>
      </div>
    </footer>
    </footer>
  </div>
</template>

<style scoped></style>