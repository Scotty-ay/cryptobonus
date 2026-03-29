import { useState, useEffect, useCallback } from "react";

export interface CoinData {
  symbol: string;
  name: string;
  price: number;
}

const COIN_IDS: Record<string, string> = {
  BTC: "bitcoin",
  ETH: "ethereum",
  BNB: "binancecoin",
  SOL: "solana",
  XRP: "ripple",
  DOGE: "dogecoin",
  ADA: "cardano",
  AVAX: "avalanche-2",
  USDT: "tether",
};

const COIN_NAMES: Record<string, string> = {
  BTC: "Bitcoin",
  ETH: "Ethereum",
  BNB: "BNB",
  SOL: "Solana",
  XRP: "Ripple",
  DOGE: "Dogecoin",
  ADA: "Cardano",
  AVAX: "Avalanche",
  USDT: "Tether",
};

const FALLBACK_PRICES: Record<string, number> = {
  BTC: 97500,
  ETH: 3450,
  BNB: 620,
  SOL: 178,
  XRP: 2.18,
  DOGE: 0.32,
  ADA: 0.98,
  AVAX: 35.5,
  USDT: 1.0,
};

export function useCoinPrices(symbols: string[] = Object.keys(COIN_IDS)) {
  const [coins, setCoins] = useState<CoinData[]>(
    symbols.map((s) => ({ symbol: s, name: COIN_NAMES[s] || s, price: FALLBACK_PRICES[s] || 0 }))
  );

  const fetchPrices = useCallback(async () => {
    try {
      const ids = symbols.map((s) => COIN_IDS[s]).filter(Boolean).join(",");
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
      );
      if (!res.ok) return;
      const data = await res.json();

      setCoins(
        symbols.map((s) => ({
          symbol: s,
          name: COIN_NAMES[s] || s,
          price: data[COIN_IDS[s]]?.usd ?? FALLBACK_PRICES[s] ?? 0,
        }))
      );
    } catch {
      setCoins(
        symbols.map((s) => ({
          symbol: s,
          name: COIN_NAMES[s] || s,
          price: FALLBACK_PRICES[s] || 0,
        }))
      );
    }
  }, [symbols.join(",")]);

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, [fetchPrices]);

  return coins;
}
