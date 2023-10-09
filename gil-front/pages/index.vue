<script setup>
useHead({
  title: 'IMDBLike'
})
definePageMeta({
  layout: "default",
  middleware: 'auth'
});

</script>

<template>
  <div>
    <Head>
      <Title>HomePage</Title>
    </Head>
    <Body>
      <h1>Home</h1>
    </Body>
  </div>
</template>

<style scoped></style>
