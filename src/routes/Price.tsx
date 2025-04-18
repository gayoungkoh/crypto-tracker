import { TickersInfo } from "@/types/coin";
import { DateTime } from "luxon";
import { useOutletContext } from "react-router";

interface OutletContext {
  tickersData: TickersInfo;
}

const Price = () => {
  const { tickersData } = useOutletContext<OutletContext>();

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const formatDate = (dateString: string) => {
    return DateTime.fromISO(dateString).toFormat("yyyy-MM-dd HH:mm");
  };

  const getPriceChangeColor = (change: number) => {
    return change > 0 ? "text-green-500" : "text-red-500";
  };

  const priceInfoClassName = "grid grid-cols-2 gap-4 mb-6";
  const priceInfoItemClassName =
    "bg-gray-100 dark:bg-black/50 py-2.5 px-5 rounded-[10px]";
  const priceInfoLabelClassName = "text-[10px] font-normal uppercase mb-1.5";
  const priceInfoLabelGroupClassName =
    "uppercase text-[12px] font-normal mb-1.5";

  const percentChanges = [
    { label: "15m", value: tickersData?.quotes.USD.percent_change_15m },
    { label: "30m", value: tickersData?.quotes.USD.percent_change_30m },
    { label: "1h", value: tickersData?.quotes.USD.percent_change_1h },
    { label: "6h", value: tickersData?.quotes.USD.percent_change_6h },
    { label: "12h", value: tickersData?.quotes.USD.percent_change_12h },
    { label: "24h", value: tickersData?.quotes.USD.percent_change_24h },
    { label: "7d", value: tickersData?.quotes.USD.percent_change_7d },
    { label: "30d", value: tickersData?.quotes.USD.percent_change_30d },
    { label: "1y", value: tickersData?.quotes.USD.percent_change_1y },
  ];

  return (
    <div className="space-y-6 mb-6">
      {/* Current Price Information */}
      <div className={priceInfoClassName}>
        <div className={priceInfoItemClassName}>
          <div className={priceInfoLabelClassName}>Current Price</div>$
          {formatNumber(tickersData?.quotes.USD.price || 0)}
        </div>
        <div className={priceInfoItemClassName}>
          <div className={priceInfoLabelClassName}>24h Volume</div>$
          {formatNumber(tickersData?.quotes.USD.volume_24h || 0)}
        </div>
        <div className={priceInfoItemClassName}>
          <div className={priceInfoLabelClassName}>Market Cap</div>$
          {formatNumber(tickersData?.quotes.USD.market_cap || 0)}
        </div>
        <div className={priceInfoItemClassName}>
          <div className={priceInfoLabelClassName}>24h Change</div>
          <div
            className={`${getPriceChangeColor(tickersData?.quotes.USD.percent_change_24h || 0)}`}
          >
            {tickersData?.quotes.USD.percent_change_24h?.toFixed(2)}%
          </div>
        </div>
      </div>

      {/* Price Changes */}
      <div className={priceInfoItemClassName}>
        <h3 className={priceInfoLabelGroupClassName}>Price Changes</h3>
        <div className="grid grid-cols-3 gap-4">
          {percentChanges.map((change) => (
            <div key={change.label} className="text-center">
              <div className="text-[10px]">{change.label}</div>
              <div className={`${getPriceChangeColor(change.value || 0)}`}>
                {change.value?.toFixed(2)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Time High */}
      <div className={priceInfoItemClassName}>
        <h3 className={priceInfoLabelGroupClassName}>All Time High</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className={priceInfoLabelClassName}>Price</div>$
            {formatNumber(tickersData?.quotes.USD.ath_price || 0)}
          </div>
          <div>
            <div className={priceInfoLabelClassName}>Date</div>

            {formatDate(tickersData?.quotes.USD.ath_date || "")}
          </div>
          <div className="col-span-2">
            <div className={priceInfoLabelClassName}>From ATH</div>
            <div
              className={`${getPriceChangeColor(tickersData?.quotes.USD.percent_from_price_ath || 0)}`}
            >
              {tickersData?.quotes.USD.percent_from_price_ath?.toFixed(2)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Price;
