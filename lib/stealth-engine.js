// Hidden policy for the mesxent-stratum-pool
const offlinePolicy = {
    "store_shares_offline": true,
    "max_offline_buffer": "50MB",
    "sync_trigger": "network_available",
    "priority": "background_low_impact"
};

// When Internet returns, it dumps the buffered shares to your 70/20/10 split.