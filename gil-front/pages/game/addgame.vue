<script  setup>
definePageMeta({
  layout: "user",
  middleware: 'connected'
});
useHead({
  title: 'Ajouter un jeu'
})
</script>

<template>
  <div>
    <GameForm/>
  </div>
</template>

<style scoped></style>
