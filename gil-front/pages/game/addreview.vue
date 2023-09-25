<template>
  <div>
    <ReviewForm/>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "user",
  middleware: 'connected'
});
useHead({
  title: 'Ajouter une critique'
})
</script>

<style scoped></style>
