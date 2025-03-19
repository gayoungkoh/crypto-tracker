import { fetchCoinHistory } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router";

const Chart = () => {
  const { state } = useLocation();

  const { isLoading, data } = useQuery({
    queryKey: ["ohlcv", state.coinId],
    queryFn: () => fetchCoinHistory(state.coinId),
  });
  return <h1>Chart</h1>;
};

export default Chart;
