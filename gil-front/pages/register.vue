
<template>
  <div>
    <Head>
      <Title>S'inscrire</Title>
    </Head>
    <Body>
      <AuthRegisterForm/>

    </Body>
  </div>
</template>

<script  setup>
definePageMeta({
  layout: "default",
  middleware: 'auth'
});

</script>


<style scoped></style>
