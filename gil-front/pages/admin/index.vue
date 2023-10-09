<script setup>
definePageMeta({
  layout: "admin",
});
</script>

<template>
  <div>
    <Head>
    <Title>Admin Page</Title>
  </Head>
  <Body>
    <h1>Admin Dashboard</h1>
    <AdminAllGames/>
    <AdminAllReviews/>
    <AdminAllUsers/>
  </Body>
  </div>
</template>

<style scoped></style>
