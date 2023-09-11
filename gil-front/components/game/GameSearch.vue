<script lang=setup>
</script>

<template>
  <div class="gameSearch">
    <h1>Recherchez des jeux</h1>
    <form @submit.prevent="">
    <input placeholder="Rechercher un livre" />
    <input type="button" value="Rechercher">
    </form>
    <div class="result">
      <p>{{  }}</p>
    </div>
  </div>
</template>

<style scoped>
.gameSearch {
  div {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
}
</style>
