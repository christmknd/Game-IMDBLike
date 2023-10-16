
<template>
  <div>
    <Head>
      <Title>{{ user.username }} Profile</Title>
    </Head>
    <div class="card text-center">
      <div class="card-header">
        <h1>Mon profil</h1>
      </div>
      <div class="card-body">
        <h2 class="card-title">{{ user.username }}</h2>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Mail : {{ user.email }}</li>
          <li class="list-group-item"><p>player_type : {{ user.player_type }}</p></li>
          <li class="list-group-item">Mode de jeu favori : {{ user.favorite_mode }}</li>
        </ul>
      </div>
    </div>
    

    <h3></h3>

    
    <p></p>
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

const userId = parseInt(response.data.value.userId);


const {data : user} = await useFetch(`http://localhost:5000/users/${userId}`, {
  headers : {
    'Authorization': `Bearer ${accessToken} `,
  }
})

</script>


<style scoped></style>
