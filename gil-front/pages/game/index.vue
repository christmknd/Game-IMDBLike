<!-- Index.vue -->
<template>
  <div>
    <AllGames />
    <div v-if="selectedGameId !== null">
      <GameCard :gameId="selectedGameId" />
    </div>
  </div>
</template>

<script setup>
import AllGames from '~/components/admin/AllGames.vue';
import GameCard from '~/components/game/GameCard.vue';

import { selectedGameId } from '~/components/AllGames.vue';

definePageMeta({
  layout: "user",
});
</script>
