<template>
  <div>
    <Head>
      <Title>GameIMDBLike</Title>
    </Head>
    <Body>
      <AdminAllGames/>
   <button class="btn btn-success" @click="addGame">Ajouter un jeu</button>
    </Body>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "user",
  middleware: 'auth'
});

const router = useRouter();


const addGame = () => {
  router.push(`/game/addreview`);
};

</script>
