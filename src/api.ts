/** Copyright © 2025 Qcells. All rights reserved.
This software is proprietary and confidential. Unauthorized use,
duplication, or distribution of software is strictly prohibited.
*/
import { fetchData } from "@/utils/api-helper";
import { Coin, CoinHistoryInfo, CoinInfo, TickersInfo } from "@/types/coin";

const BASE_URL = "https://api.coinpaprika.com/v1";

const HISTORY_BASE_URL = "https://ohlcv-api.nomadcoders.workers.dev";

export const fetchCoins = async (): Promise<Coin[]> => {
  return await fetchData<Coin[]>(`${BASE_URL}/coins`);
};

export const fetchCoinInfo = async (coinId: string): Promise<CoinInfo> => {
  return await fetchData<CoinInfo>(`${BASE_URL}/coins/${coinId}`);
};

export const fetchCoinTickers = async (
  coinId: string
): Promise<TickersInfo> => {
  return await fetchData<TickersInfo>(`${BASE_URL}/tickers/${coinId}`);
};

export const fetchCoinHistory = async (
  coinId: string
): Promise<CoinHistoryInfo> => {
  return await fetchData<CoinHistoryInfo>(
    `${HISTORY_BASE_URL}?coinId=${coinId}`
  );
};
