<script setup>
import ClickerButton from './components/ClickerButton.vue';
import UpgradePanel from './components/UpgradePanel.vue';
import DataManager from './components/DataManager.vue';
</script>

<template>
  <div class="app-container">
    <h1 style="color: #eee; text-align: center;">Casual Vue Clicker</h1>
    <h6 style="color: #ccc; text-align: center;">Made with love by <a href="https://github.com/robert19066" target="_blank">robert19066</a></h6>
    <p>Welcome to the Casual Vue Clicker game! Click the button to earn points and upgrade your abilities.</p>
    <ClickerButton />
    <UpgradePanel />
    <DataManager />
    <h4><a href="https://github.com/robert19066/Clicker" target="_blank">Open Repository</a></h4>
    <h6 style="color: #ccc; text-align: center;">Made using Vue - Any forks will be accepted!</h6>
    <h6><strong>Special thanks to Vue.js community!</strong></h6>
  </div>
</template>
