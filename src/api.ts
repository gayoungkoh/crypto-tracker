/** Copyright © 2025 Qcells. All rights reserved.
This software is proprietary and confidential. Unauthorized use,
duplication, or distribution of software is strictly prohibited.
*/
import { fetchData } from "@/utils/api-helper";
import { Coin } from "@/types/coin";

export const fetchCoins = async (): Promise<Coin[]> => {
  return await fetchData<Coin[]>("https://api.coinpaprika.com/v1/coins");
};
