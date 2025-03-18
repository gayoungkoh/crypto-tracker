import { fetchCoins } from "@/api";
import { CoinListTable } from "@/components/coin-list-table";
import LoadingSpinner from "@/components/loding-spinner";
import {
  CONTAINER_CLASS_NAME,
  HEADER_CLASSNAME,
  TITLE_CLASS_NAME,
} from "@/constants/class-name";
import { Coin } from "@/types/coin";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const Coins = () => {
  const navigate = useNavigate();

  const navigateToDetail = (coinId: string, name: string) => {
    navigate(`/${coinId}`, {
      state: {
        name,
      },
    });
  };

  const { isLoading, data = [] } = useQuery<Coin[]>({
    queryKey: ["allCoins"],
    queryFn: fetchCoins,
  });

  const coinsListClassName = "";
  const coinClassName =
    "bg-white text-black mb-2.5 p-5 rounded-2xl cursor-pointer hover:text-[#9c88ff] flex items-center gap-2 light:border-1";
  const coinImageClassName = "w-5 h-5";

  return (
    <div className={CONTAINER_CLASS_NAME}>
      <header className={HEADER_CLASSNAME}>
        <h1 className={TITLE_CLASS_NAME}>Coins</h1>
      </header>
      {isLoading ? (
        <LoadingSpinner className="w-100" />
      ) : (
        // <ul className={coinsListClassName}>
        //   {data.slice(0, 10).map((coin) => (
        //     <li
        //       key={coin.id}
        //       className={coinClassName}
        //       onClick={() => navigateToDetail(coin.id, coin.name)}
        //     >
        //       <img
        //         className={coinImageClassName}
        //         src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`}
        //       />
        //       {coin.name} &rarr;
        //     </li>
        //   ))}
        // </ul>
        <CoinListTable coinList={data.slice(0, 100)} />
      )}
    </div>
  );
};

export default Coins;
