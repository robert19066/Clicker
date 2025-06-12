<script setup>
import { store, clicksToNextRank } from '../store.js';

const nextAutoClickCost = () => (store.autoClickLevel + 1) * 100;
const clicksToNextAutoClickUpgrade = () => {
  const cost = nextAutoClickCost();
  return store.clickCount >= cost ? 0 : cost - store.clickCount;
};
</script>

<template>
  <div class="upgrade-panel">
    <p>Upgrade Click Power: {{ store.upgradeAmount }}</p>
    <p>Next Upgrade Cost: {{ store.upgradeCost }} clicks</p>
    <button @click="store.buyUpgrade()" :disabled="store.clickCount < store.upgradeCost">
      Upgrade (+1)
    </button>

    <hr />

    <p>Auto Click Level: {{ store.autoClickLevel }}</p>
    <p>Auto Click CPS: {{ store.autoClickCPS }}</p>
    <p>Clicks to next auto-click upgrade: {{ clicksToNextAutoClickUpgrade() }}</p>
    <button 
      @click="store.upgradeAutoClick()" 
      :disabled="store.clickCount < nextAutoClickCost()"
    >
      Upgrade Auto-Click (+1 CPS)
    </button>
  </div>
</template>

<style scoped>
.upgrade-panel {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #222;
  border-radius: 8px;
  max-width: 100%;
  width: 100%;
  box-sizing: border-box;
  color: #eee;
}

.upgrade-panel p {
  margin: 8px 0;
  font-weight: 600;
  font-size: 16px;
}

button {
  background-color: #ff9800;
  border: none;
  padding: 14px 0;
  cursor: pointer;
  color: white;
  font-size: 18px;
  font-weight: 700;
  border-radius: 8px;
  width: 100%;
  max-width: 100%;
  box-shadow: 0 5px 12px rgba(255, 152, 0, 0.6);
  transition: background-color 0.3s ease;
}

button:disabled {
  background-color: #555;
  cursor: not-allowed;
  box-shadow: none;
}

button:hover:not(:disabled) {
  background-color: #e68900;
}
</style>
