import { CoinRouteParams } from "@/types/coin";
import { useParams } from "react-router";

const Coin = () => {
  const { coinId } = useParams<CoinRouteParams>();
  return <h1>Coin: {coinId}</h1>;
};

export default Coin;
