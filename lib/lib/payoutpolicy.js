// Mesxent Global Payout Intelligence
// Organization ID: 11270629836102

module.exports = {
    calculateSplit: function(totalAmount) {
        // 1. Calculate the 30% Annual Recommitment (Stored for Node maintenance)
        const recommitment = totalAmount * 0.30;
        const netAmount = totalAmount - recommitment;

        // 2. Apply the 70/20/10 Split on the remaining 70%
        return {
            nodeOwner: netAmount * 0.70,     // 70% to Node Owner
            mesxentGlobal: netAmount * 0.20, // 20% to Mesxent Global Services
            subscribers: netAmount * 0.10,   // 10% to Subscribers
            recommitmentPool: recommitment    // 30% Total Recommitment
        };
    }
};