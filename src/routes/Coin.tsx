import LoadingSpinner from "@/components/loding-spinner";
import {
  CONTAINER_CLASS_NAME,
  HEADER_CLASSNAME,
  TITLE_CLASS_NAME,
} from "@/constants/class-name";
import { CoinRouteParams, InfoData, PriceData } from "@/types/coin";
import { fetchData } from "@/utils/api-helper";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";

const Coin = () => {
  const { coinId } = useParams<CoinRouteParams>();
  const [loading, setLoading] = useState(true);
  const { state } = useLocation();
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();

  useEffect(() => {
    (async () => {
      try {
        const infoData = await fetchData<InfoData>(
          `https://api.coinpaprika.com/v1/coins/${coinId}`
        );
        const priceData = await fetchData<PriceData>(
          `https://api.coinpaprika.com/v1/tickers/${coinId}`
        );
        setInfo(infoData);
        setPriceInfo(priceData);

        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className={CONTAINER_CLASS_NAME}>
      <header className={HEADER_CLASSNAME}>
        <h1 className={TITLE_CLASS_NAME}>{state?.name || ""}</h1>
      </header>
      {loading ? <LoadingSpinner className="w-100" /> : null}
    </div>
  );
};

export default Coin;
