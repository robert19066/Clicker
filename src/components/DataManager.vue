<<script setup>
import { ref } from 'vue';
import CryptoJS from 'crypto-js';
import { store } from '../store.js';

const encryptionKey = ref(generateRandomKey());

function generateRandomKey() {
  return CryptoJS.lib.WordArray.random(16).toString();
}

const exportData = () => {
  const data = JSON.stringify({
    clickCount: store.clickCount.value,
    upgradeAmount: store.upgradeAmount.value,
    upgradeCost: store.upgradeCost.value,
    autoClickLevel: store.autoClickLevel.value,
    autoClickCPS: store.autoClickCPS.value,
    rank: store.rank.value,
  });

  const encryptedData = CryptoJS.AES.encrypt(data, encryptionKey.value).toString();
  const blob = new Blob([encryptedData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'game_data.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  // Save key
  const keyBlob = new Blob([encryptionKey.value], { type: 'text/plain' });
  const keyUrl = URL.createObjectURL(keyBlob);
  const keyFile = document.createElement('a');
  keyFile.href = keyUrl;
  keyFile.download = 'encryption_key.txt';
  document.body.appendChild(keyFile);
  keyFile.click();
  document.body.removeChild(keyFile);
};

const importData = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const userKey = prompt('Enter your encryption key:');
    if (!userKey) return alert('Invalid key!');

    try {
      const decryptedData = CryptoJS.AES.decrypt(e.target.result, userKey).toString(CryptoJS.enc.Utf8);
      const parsedData = JSON.parse(decryptedData);

      store.clickCount.value = parsedData.clickCount ?? 0;
      store.upgradeAmount.value = parsedData.upgradeAmount ?? 1;
      store.upgradeCost.value = parsedData.upgradeCost ?? 10;
      store.autoClickLevel.value = parsedData.autoClickLevel ?? 0;
      store.autoClickCPS.value = parsedData.autoClickCPS ?? 0;
      // rank is computed so no need to restore
    } catch {
      alert('Failed to decrypt file. Incorrect key!');
    }
  };
  reader.readAsText(file);
};
</script>

<template>
  <div class="data-manager">
    <button @click="exportData">Export Data 🔒</button>
    <input type="file" @change="importData" />
  </div>
</template>

<style scoped>
.data-manager {
  margin-top: 25px;
  padding: 20px;
  background-color: #222;
  border-radius: 8px;
  box-sizing: border-box;
  max-width: 100%;
  width: 100%;
  color: #eee;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
}

button {
  background-color: #ff9800;
  border: none;
  padding: 16px 0;
  cursor: pointer;
  color: white;
  font-size: 18px;
  font-weight: 700;
  border-radius: 8px;
  width: 100%;
  max-width: 100%;
  box-shadow: 0 5px 12px rgba(255, 152, 0, 0.6);
  transition: background-color 0.3s ease;
  margin-bottom: 15px;
}

button:hover {
  background-color: #e68900;
}

input[type="file"] {
  display: block;
  margin: 0 auto;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #444;
  background-color: #333;
  color: #eee;
  cursor: pointer;
  font-weight: 600;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

input[type="file"]::-webkit-file-upload-button {
  background-color: #ff9800;
  color: white;
  border: none;
  padding: 10px 0;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 700;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

input[type="file"]::-webkit-file-upload-button:hover {
  background-color: #e68900;
}
</style>
