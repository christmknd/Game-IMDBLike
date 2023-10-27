<template>
  <div class="card">
    <div class="card-header">
      <h2>Toutes les utilisateurs</h2>
    </div>
      <div class="card-body" v-for="user in users" :key="user.id">
        <ul class="list-group">
          <li class="list-group-item">{{ user.username }} | {{ user.email }} </li>
        </ul>
        <button  class="btn btn-danger" @click="deleteUser(user.id)">Supprimer l'utilisateur</button>
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

  const deleteUser = (userId) => {
  if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
    sendDeleteRequest(userId);
  }
};

const sendDeleteRequest = async (userId) => {
  try {
    await $fetch(`http://localhost:5000/users/${userId}`, {
      
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    console.log('Utilisateur supprimé avec succès !');
    // Vous pouvez mettre à jour la liste des utilisateurs après la suppression si nécessaire
    router.go(); // Cela recharge la page
  } catch (error) {
    console.error('Une erreur s\'est produite : l\'utilisateur n\'a pas pu être supprimé.\n', error);
  }
};


</script>


<style scoped></style>
