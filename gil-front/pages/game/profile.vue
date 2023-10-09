
<template>
  <div>
    <Head>
      <Title>User Profile</Title>
    </Head>
    <h1>{{ user.username }}</h1>

    <h2>{{ user.player_type }}</h2>

    <p>Mode favori : {{ user.favorite_mode }}</p>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "user",
});

const {data : user} = await useFetch(`http://localhost:5000/auth/profile`)

</script>


<style scoped></style>
