<template>
  <div>
    <Head>
      <Title>Ajouter une critique</Title>
    </Head>
    <Body>
      <ReviewForm/>
    </Body>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "user",
  middleware: 'auth'
});
</script>

<style scoped></style>
