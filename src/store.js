import { reactive, computed } from 'vue';

const thresholds = [
  0, 10, 50, 100, 250, 500, 1000, 2500, 5000, 7500, 10000, 20000, 50000,
];
const ranks = [
  'Noob', 'Beginner', 'Common', 'Uncommon', 'Rare Clicker', 'Expert Clicker',
  'Spam Recruit', 'Spammer', 'Pro Spammer', 'Ultra Spammer', 'Giga Spammer',
  'NR_OVERFLOW Spammer', 'God of Clicks', 'Cheater',
];

export const store = reactive({
  clickCount: 0,
  upgradeAmount: 1,
  upgradeCost: 10,
  autoClickLevel: 0,
  autoClickCPS: 0,
  rank: 'Noob',

  incrementClick() {
    this.clickCount += this.upgradeAmount;
    this.updateRank();
  },

  buyUpgrade() {
    // Check if enough clicks
    if (this.clickCount >= this.upgradeCost) {
      this.clickCount -= this.upgradeCost;
      this.upgradeAmount += 1;       // Increment upgrade amount by 1 each upgrade
      this.upgradeCost = Math.floor(this.upgradeCost * 1.5); // Increase cost by 50%
      this.updateRank();
    }
  },

  upgradeAutoClick() {
    const cost = Math.floor((this.autoClickLevel + 1) * 100);
    if (this.clickCount >= cost) {
      this.clickCount -= cost;
      this.autoClickLevel += 1;
      this.autoClickCPS += 1;
      this.updateRank();
    }
  },

  updateRank() {
    for (let i = thresholds.length - 1; i >= 0; i--) {
      if (this.clickCount >= thresholds[i]) {
        this.rank = ranks[i];
        return;
      }
    }
    this.rank = ranks[0];
  },
});

// Computed for clicks needed for next rank:
export const clicksToNextRank = computed(() => {
  for (let i = 0; i < thresholds.length; i++) {
    if (store.clickCount < thresholds[i]) {
      return thresholds[i] - store.clickCount;
    }
  }
  return 0;
});
