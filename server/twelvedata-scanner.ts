import { Candle } from '../src/types.js';

const htfCache: Record<string, {data: Candle[], timestamp: number}> = {};
const HTF_CACHE_TTL = 60 * 60 * 1000; // 1 hour

export async function fetchCandles(pair: string, interval: '1min' | '5min' | '15min' | '4h'): Promise<Candle[] | null> {
  if (!process.env.TWELVEDATA_API_KEY) {
      return null;
  }

  if (interval === '4h' && htfCache[pair] && (Date.now() - htfCache[pair].timestamp < HTF_CACHE_TTL)) {
      return htfCache[pair].data;
  }
  
  // Format pair. EURUSD -> EUR/USD
  let symbol = pair;
  if (pair.length === 6) {
      symbol = pair.substring(0, 3) + '/' + pair.substring(3);
  } else if (pair.length > 6 && pair.endsWith('USD')) {
      symbol = pair.substring(0, pair.length - 3) + '/USD';
  }

  const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&outputsize=100&timezone=UTC&apikey=${process.env.TWELVEDATA_API_KEY}`;
  
  try {
    const res = await fetch(url);
    if (!res.ok) {
        if (res.status === 429) {
           console.error(`Rate limit exceeded for ${symbol}`);
        }
        return null;
    }
    const data = await res.json();
    if (data.status === 'error') {
      if (data.code === 429) {
          console.error(`Rate limit exceeded for ${symbol} (Plan limit reached)`);
      } else {
          console.error(`TwelveData Error (${symbol}):`, data.message);
      }
      return null;
    }
    if (!data.values) return null;
    
    const fetchedCandles = data.values.map((v: any) => ({
      timestamp: v.datetime,
      open: parseFloat(v.open),
      high: parseFloat(v.high),
      low: parseFloat(v.low),
      close: parseFloat(v.close),
    })).reverse(); // Oldest to newest
    
    if (interval === '4h' && fetchedCandles.length > 0) {
        htfCache[pair] = { data: fetchedCandles, timestamp: Date.now() };
    }
    
    return fetchedCandles;
  } catch (error: any) {
    if (!error?.message?.includes('terminated')) {
      console.error(`Network Error fetching ${symbol}:`, error);
    }
    return null;
  }
}
