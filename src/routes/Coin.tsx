import LoadingSpinner from "@/components/loding-spinner";
import {
  CONTAINER_CLASS_NAME,
  HEADER_CLASSNAME,
  TITLE_CLASS_NAME,
} from "@/constants/class-name";
import { CoinRouteParams, InfoData, PriceData } from "@/types/coin";
import { fetchData } from "@/utils/api-helper";
import { useEffect, useState } from "react";
import {
  Outlet,
  useLocation,
  useMatch,
  useNavigate,
  useParams,
} from "react-router";

const Coin = () => {
  const { coinId } = useParams<CoinRouteParams>();
  const [loading, setLoading] = useState(true);
  const { state } = useLocation();
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();
  const priceMatch = useMatch("/:coinId/price") !== null;
  const chartMatch = useMatch("/:coinId/chart") !== null;

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
  }, [coinId]);

  const overviewClassName =
    "flex justify-between bg-black/50 py-2.5 px-5 rounded-[10px]";
  const overviewItemClassName = "flex flex-col items-center";
  const overviewItemTitleClassName = "text-[10px] font-normal uppercase mb-1.5";
  const descriptionClassName = "my-5";
  const tabsClassName = "grid grid-cols-2 my-6 gap-2.5";
  const tabClassName =
    "text-center uppercase text-[12px] font-normal bg-black/50 py-[7px] rounded-[10px]";

  const getTitle = () => {
    if (state && state.name) {
      return state.name;
    }
    if (loading) {
      return "";
    }
    return info?.name || "";
  };

  const navigate = useNavigate();

  const onChangeTab = (tabName: string) => {
    navigate(tabName);
  };

  return (
    <div className={CONTAINER_CLASS_NAME}>
      <header className={HEADER_CLASSNAME}>
        <h1 className={TITLE_CLASS_NAME}>{getTitle()}</h1>
      </header>
      {loading ? (
        <LoadingSpinner className="w-100" />
      ) : (
        <>
          <div className={overviewClassName}>
            <div className={overviewItemClassName}>
              <span className={overviewItemTitleClassName}>Rank:</span>
              <span>{info?.rank || ""}</span>
            </div>
            <div className={overviewItemClassName}>
              <span className={overviewItemTitleClassName}>Symbol:</span>
              <span>{info?.symbol || ""}</span>
            </div>
            <div className={overviewItemClassName}>
              <span className={overviewItemTitleClassName}>Open Source:</span>
              <span>{info?.open_source ? "Yes" : "No"}</span>
            </div>
          </div>
          <div className={descriptionClassName}>{info?.description || ""}</div>
          <div className={overviewClassName}>
            <div className={overviewItemClassName}>
              <span className={overviewItemTitleClassName}>Total Supply:</span>
              <span>{priceInfo?.total_supply || ""}</span>
            </div>
            <div className={overviewItemClassName}>
              <span className={overviewItemTitleClassName}>Max Supply:</span>
              <span>{priceInfo?.max_supply || ""}</span>
            </div>
          </div>
          <div className={tabsClassName}>
            <div
              className={`${tabClassName} ${chartMatch && "text-[#9c88ff]"}`}
              onClick={() => onChangeTab("chart")}
            >
              Chart
            </div>
            <div
              className={`${tabClassName} ${priceMatch && "text-[#9c88ff]"}`}
              onClick={() => onChangeTab("price")}
            >
              Price
            </div>
          </div>
          <Outlet />
        </>
      )}
    </div>
  );
};

export default Coin;
