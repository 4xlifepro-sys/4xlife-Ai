import { fetchCandles } from './server/twelvedata-scanner.js';

async function testFetch() {
    try {
        console.log("Fetching 4h candles...");
        const htf = await fetchCandles('EURUSD', '4h');
        console.log(`4h candles: ${htf?.length}`);
        
        console.log("Fetching 5min candles...");
        const setup = await fetchCandles('EURUSD', '5min');
        console.log(`5min candles: ${setup?.length}`);
    } catch(e) {
        console.log("Error:", e);
    }
}

testFetch();
