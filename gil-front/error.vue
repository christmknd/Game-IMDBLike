<template>
    <div class="container-fluid">
        <h1>{{ error.statusCode }}</h1>
        <hr>
        <p class="md-6">{{ error.message }}</p>
    </div>
</template>

<script setup>
    defineProps(['error'])
</script>

<style>

</style>