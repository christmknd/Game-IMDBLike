
<template>
  <div>
    <Head>
      <Title>{{ user.username }} Profile</Title>
    </Head>
    <h1>{{ user.username }}</h1>

    <h3>{{ user.email }}</h3>

    <p>player_type : {{ user.player_type }}</p>
    <p>Mode de jeu favori : {{ user.favorite_mode }}</p>
  </div>
</template>

<script setup>
import auth from '../../services/auth'
definePageMeta({
  layout: "user",
});

const accessToken = auth.getAccessToken() ;

const response = await useFetch(`http://localhost:5000/auth/profile`, {
  headers : {
    'Authorization': `Bearer ${accessToken} `,
  }
})

console.log(parseInt(response.data.value.userId))
const userId = parseInt(response.data.value.userId);


const {data : user} = await useFetch(`http://localhost:5000/users/${userId}`, {
  headers : {
    'Authorization': `Bearer ${accessToken} `,
  }
})

</script>


<style scoped></style>
