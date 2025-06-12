<script setup>
import ClickerButton from './components/ClickerButton.vue';
import UpgradePanel from './components/UpgradePanel.vue';
import DataManager from './components/DataManager.vue';
</script>

<template>
  <div class="app-container">
    <h1 style="color: #eee; text-align: center;">Clicker Game</h1>
    <ClickerButton />
    <UpgradePanel />
    <DataManager />
  </div>
</template>
