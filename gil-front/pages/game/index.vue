<template>
  <div>
   <AdminAllGames/>
  </div>
</template>

<script>


definePageMeta({
  layout: "user",
  middleware: 'connected'
});
useHead({
  title: 'Tous les jeux de la plateforme'
})
</script>
