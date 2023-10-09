
<template>
  <div>
    <Head>
      <Title>Se Connecter</Title>
    </Head>
    <Body>
      <AuthLoginForm/>
    </Body>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "default",
  middleware: 'auth'
});

</script>

<style scoped></style>
