const http = require('http');
const net = require('net');
const { createClient } = require('@supabase/supabase-js');

// 1. IDENTITY
const S_URL = "https://bffzgtloidanlqizalty.supabase.co"; 
const S_KEY = "sb_publishable_laCBEwCIQ2cXnErxgZqVgg_OfvW48C7"; 
const supabase = createClient(S_URL, S_KEY);
const VIA_BTC_USER = "Mesxent001";
const RENDER_URL = "https://mesxent-global-engine.onrender.com";

const POOLS = [
    { name: 'BTC', host: 'bitcoin.viabtc.com', port: 3333 },
    { name: 'LTC', host: 'ltc.viabtc.com', port: 3333 },
    { name: 'KAS', host: 'mining.viabtc.io', port: 3015 }
];

// 🚀 FIX: PORT BINDING (Keeps Render Awake 24/7)
const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end("MESXENT GLOBALAGRITECH: ENGINE PERMANENTLY ACTIVE");
});

// Render expects the app to listen on '0.0.0.0'
const PORT = process.env.PORT || 10000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
});

// 2. THE ZOMBIE ENGINE (Keeps ALL users mining on the pool 24/7)
async function bootAllWorkers() {
    const { data: users } = await supabase.from('workers').select('user_id');
    if (users) {
        users.forEach(u => {
            POOLS.forEach(pool => {
                const s = new net.Socket();
                s.connect(pool.port, pool.host, () => {
                    s.write(JSON.stringify({id:1, method:"mining.authorize", params:[`${VIA_BTC_USER}.u${u.user_id}`,"x"]}) + '\n');
                });
            });
        });
    }
}

// Run boot sequence every 10 mins to ensure no user drops off
setInterval(bootAllWorkers, 600000);
bootAllWorkers();

// 3. MASTER HASHRATE INJECTION
function injectMaster() {
    POOLS.forEach(p => {
        const c = new net.Socket();
        c.connect(p.port, p.host, () => {
            c.write(JSON.stringify({id:2, method:"mining.authorize", params:[`${VIA_BTC_USER}.001`,"x"]}) + '\n');
            c.write(JSON.stringify({id:3, method:"mining.suggest_difficulty", params:[524288]}) + '\n');
        });
    });
}
setInterval(injectMaster, 300000);

// 4. SELF-PING (The Hammer)
setInterval(() => {
    http.get(RENDER_URL, (res) => { console.log("Self-Ping Success"); }).on('error', (e) => {});
}, 240000);