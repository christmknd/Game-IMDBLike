<script lang="ts" setup></script>

<template>
  <div>
    <div class="success-alert">
    <slot></slot>
  </div>
  </div>
</template>

<style scoped>
.success-alert {
  background-color: #4caf50; /* Vert */
  color: white;
  padding: 10px;
}
</style>
