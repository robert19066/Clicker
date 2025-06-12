<script setup>
import { computed } from 'vue';
import { store, clicksToNextRank } from '../store.js';

// rank class (same as before)
const rankClass = computed(() =>
  store.rank.toLowerCase().replace(/\s+/g, '-')
);
</script>

<template>
  <div :class="rankClass">
    <button class="clicker-button" @click="store.incrementClick()">Click me! ({{ store.clickCount }})</button>
    <p>Rank: <strong>{{ store.rank }}</strong></p>
    <p>Clicks to next rank: {{ clicksToNextRank }}</p>

    <!-- rest omitted for brevity -->
  </div>
</template>

<style scoped>
.clicker-button {
  background-color: #ff9800;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-size: 22px;
  font-weight: 700;
  padding: 20px 40px;
  box-shadow: 0 6px 15px rgba(255, 152, 0, 0.7);
  transition: background-color 0.3s ease, transform 0.15s ease;
  user-select: none;
  width: 100%;
  max-width: 400px;
  margin: 20px auto;
  display: block;
}

.clicker-button:hover {
  background-color: #e68900;
  transform: scale(1.05);
}

.clicker-button:active {
  transform: scale(0.95);
  box-shadow: 0 4px 8px rgba(230, 137, 0, 0.8);
}
</style>
<style lang="css">
  body{
    background-color: #121212;
    color: #eee;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    padding: 0;
  }
</style>