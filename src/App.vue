<script setup>
import { onMounted, onUnmounted } from 'vue';
import { store } from './store.js';

import ClickerButton from './components/ClickerButton.vue';
import UpgradePanel from './components/UpgradePanel.vue';
import DataManager from './components/DataManager.vue';

let interval;

onMounted(() => {
  interval = setInterval(() => {
    if (store.autoClickCPS > 0) {
      store.clickCount += store.autoClickCPS;
      store.updateRank();
    }
  }, 1000);
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<template>
  <div class="app-container">
    <h1 style="color: #eee; text-align: center;">Casual Vue Clicker V2.3 LATEST</h1>
    <h6 style="color: #ccc; text-align: center;">
      Made with love by
      <a href="https://github.com/robert19066" target="_blank">robert19066</a>
    </h6>
    <p style="text-align: center;">
      Welcome to the Casual Vue Clicker game! Click the button to earn points and upgrade your abilities.
    </p>
    <ClickerButton />
    <UpgradePanel />
    <DataManager />
    <h4 style="text-align: center">
      <a href="https://github.com/robert19066/Clicker" target="_blank">Open Repository</a>
    </h4>
    <h6 style="color: #ccc; text-align: center;">Made using Vue - Any forks will be accepted!</h6>
    <h6 style="text-align: center"><strong>Special thanks to Vue.js community!</strong></h6>
  </div>
</template>
