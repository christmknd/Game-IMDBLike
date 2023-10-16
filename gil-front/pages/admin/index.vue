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
    <div class="container">
      <div class="container-fluid">
        <section>
            <AdminAllGames/>
         </section>
      </div>
      <div class="container-fluid">
        <section>
            <AdminAllReviews/>
       </section>
      </div>
      <div class="container-fluid">
        <section>
      <AdminAllUsers/>
    </section>
      </div>
    </div>
   

  </Body>
  </div>
</template>

<style >
.container-fluid{
  margin-top: 3rem;
  margin-bottom: 1.5rem;
}
</style>
