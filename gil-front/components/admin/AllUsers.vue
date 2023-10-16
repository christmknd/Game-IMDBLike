<template>
  <div class="card">
    <div class="card-header">
      <h2>Toutes les utilisateurs</h2>
    </div>
      <div class="card-body" v-for="user in users" :key="user.id">
        <ul class="list-group">
          <li class="list-group-item">{{ user.username }} | {{ user.email }} </li>
        </ul>
      </div>
  </div>
</template>

<script setup>

import auth from '~/services/auth';
const accessToken = auth.getAccessToken();


  const { data: users } = await useFetch(`http://localhost:5000/users`, {
    headers : {
      'Authorization': `Bearer ${accessToken} `,
    }
  });
</script>


<style scoped></style>
