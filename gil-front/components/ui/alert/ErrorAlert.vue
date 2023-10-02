<script lang="ts" setup></script>

<template>
   <div class="error-alert">
    <slot></slot>
  </div>
</template>

<style scoped>
.error-alert {
  background-color: #f44336; /* Rouge */
  color: white;
  padding: 10px;
}
</style>
