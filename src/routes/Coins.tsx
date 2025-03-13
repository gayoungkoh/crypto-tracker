import LoadingSpinner from "@/components/loding-spinner";
import {
  CONTAINER_CLASS_NAME,
  HEADER_CLASSNAME,
  TITLE_CLASS_NAME,
} from "@/constants/class-name";
import { Coin } from "@/types/coin";
import { fetchData } from "@/utils/api-helper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Coins = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const navigateToDetail = (coinId: string, name: string) => {
    navigate(`/${coinId}`, {
      state: {
        name,
      },
    });
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

  const coinsListClassName = "";
  const coinClassName =
    "bg-white text-black mb-2.5 p-5 rounded-2xl cursor-pointer hover:text-purple-400 flex items-center gap-2 light:border-1";
  const coinImageClassName = "w-5 h-5";

  return (
    <div className={CONTAINER_CLASS_NAME}>
      <header className={HEADER_CLASSNAME}>
        <h1 className={TITLE_CLASS_NAME}>Coins</h1>
      </header>
      {loading ? (
        <LoadingSpinner className="w-100" />
      ) : (
        <ul className={coinsListClassName}>
          {coins.map((coin) => (
            <li
              key={coin.id}
              className={coinClassName}
              onClick={() => navigateToDetail(coin.id, coin.name)}
            >
              <img
                className={coinImageClassName}
                src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`}
              />
              {coin.name} &rarr;
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Coins;
