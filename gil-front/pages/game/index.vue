<template>
  <div>
   <AdminAllGames/>
   <button class="btn btn-success" @click="addGame">Ajouter un jeu</button>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "user",
  middleware: 'connected'
});

const router = useRouter();


const addGame = () => {
  router.push(`/game/addreview`);
};

</script>
