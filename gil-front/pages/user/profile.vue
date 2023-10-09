
<template>
  <div>
    <Head>
      <Title>User Profile</Title>
    </Head>
    <h1>User profile</h1>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "user",
});

const {data : user} = await useFetch(`http://localhost:5000/auth/profile`)

</script>


<style scoped></style>
