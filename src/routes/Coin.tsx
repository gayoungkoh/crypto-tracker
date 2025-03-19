import { fetchCoinInfo, fetchCoinTickers } from "@/api";
import LoadingSpinner from "@/components/loding-spinner";
import {
  CONTAINER_CLASS_NAME,
  HEADER_CLASSNAME,
  TITLE_CLASS_NAME,
} from "@/constants/class-name";
import { CoinRouteParams, CoinInfo, TickersInfo } from "@/types/coin";
import { useQuery } from "@tanstack/react-query";
import {
  Outlet,
  useLocation,
  useMatch,
  useNavigate,
  useParams,
} from "react-router";

const Coin = () => {
  const { coinId = "" } = useParams<CoinRouteParams>();
  const { state } = useLocation();
  const priceMatch = useMatch("/:coinId/price") !== null;
  const chartMatch = useMatch("/:coinId/chart") !== null;

  const { isLoading: infoLoading, data: infoData } = useQuery<CoinInfo>({
    queryKey: ["info", coinId],
    queryFn: () => fetchCoinInfo(coinId),
    enabled: !!coinId,
  });

  const { isLoading: tickersLoading, data: tickersData } =
    useQuery<TickersInfo>({
      queryKey: ["tickers", coinId],
      queryFn: () => fetchCoinTickers(coinId),
      enabled: !!coinId,
    });

  const loading = infoLoading || tickersLoading;

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
    return infoData?.name || "";
  };

  const navigate = useNavigate();

  const onChangeTab = (tabName: string) => {
    navigate(tabName, {
      state: {
        coinId,
      },
    });
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
              <span>{infoData?.rank || ""}</span>
            </div>
            <div className={overviewItemClassName}>
              <span className={overviewItemTitleClassName}>Symbol:</span>
              <span>{infoData?.symbol || ""}</span>
            </div>
            <div className={overviewItemClassName}>
              <span className={overviewItemTitleClassName}>Open Source:</span>
              <span>{infoData?.open_source ? "Yes" : "No"}</span>
            </div>
          </div>
          <div className={descriptionClassName}>
            {infoData?.description || ""}
          </div>
          <div className={overviewClassName}>
            <div className={overviewItemClassName}>
              <span className={overviewItemTitleClassName}>Total Supply:</span>
              <span>{tickersData?.total_supply || ""}</span>
            </div>
            <div className={overviewItemClassName}>
              <span className={overviewItemTitleClassName}>Max Supply:</span>
              <span>{tickersData?.max_supply || ""}</span>
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
