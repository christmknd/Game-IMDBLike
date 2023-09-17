<script>
export default {

data() {
  return {
    users : []
  };
},
methods: {
  async getAllUsers () {
    try {
      const response = await $fetch('http://localhost:5000/users', {
        method: 'GET',
        headers: {
          'Content-Type' : 'application/json',
        }
      });

      const data = await response;
      this.users.push(...data)
    } catch(error) {
      console.error('Erreur lors de la recupérations des critiques')
    }
  },
  created() {
    this.getAllUsers()
  }
}
}
</script>

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

<style scoped></style>
