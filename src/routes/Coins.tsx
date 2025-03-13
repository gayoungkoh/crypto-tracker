import LoadingSpinner from "@/components/loding-spinner";
import { Coin } from "@/types/coin";
import { fetchData } from "@/utils/api-helper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Coins = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const navigateToDetail = (coinId: string) => {
    navigate(`/${coinId}`);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchData<Coin[]>(
          "https://api.coinpaprika.com/v1/coins"
        );
        setCoins(response.slice(0, 10));
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const containerClassName = "px-5 max-w-[480px] m-auto";
  const headerClassName = "h-[10vh] flex justify-center items-center";
  const titleClassName = "text-5xl text-purple-400";
  const coinsListClassName = "";
  const coinClassName =
    "bg-white text-black mb-2.5 p-5 rounded-2xl cursor-pointer hover:text-purple-400";

  return (
    <div className={containerClassName}>
      <header className={headerClassName}>
        <h1 className={titleClassName}>Coins</h1>
      </header>
      {loading ? (
        <LoadingSpinner className="w-100" />
      ) : (
        <ul className={coinsListClassName}>
          {coins.map((coin) => (
            <li
              key={coin.id}
              className={coinClassName}
              onClick={() => navigateToDetail(coin.id)}
            >
              {coin.name} &rarr;
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Coins;
