<script setup>
definePageMeta({
  layout: "admin",
  middleware: 'connected'
});
useHead({
  title: 'Admin Dashboard'
})
</script>

<template>
  <div>
    <h1>Admin Dashboard</h1>
    <AdminAllGames/>
    <AdminAllReviews/>
    <AdminAllUsers/>
  </div>
</template>

<style scoped></style>
