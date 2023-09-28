<template>
  <div>
    <h1>Toutes les utilisateurs</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        <ul>
          <li>{{ user.username }}</li>
          <li>{{ user.email }}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>

import auth from '~/services/auth';
const accessToken = auth.getAccessToken();


  const { data: users } = await useFetch(`http://localhost:5000/users`, {
    'Authorization': `Bearer ${accessToken} `,
  });
</script>


<style scoped></style>
