import { fetchCoinHistory } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router";

import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import { Options } from "highcharts";
import LoadingSpinner from "@/components/loding-spinner";
import { useTheme } from "@/components/theme-provider";

import { zip } from "lodash-es";

const Chart = () => {
  const { state } = useLocation();

  const { theme } = useTheme();

  const { isLoading, data } = useQuery({
    queryKey: ["ohlcv", state.coinId],
    queryFn: () => fetchCoinHistory(state.coinId),
  });

  const chartOptions: Options = {
    credits: { enabled: false },
    rangeSelector: {
      enabled: false,
    },
    chart: {
      styledMode: true,
    },
    xAxis: {
      type: "datetime",
    },
    yAxis: {
      visible: false,
    },
    series: [
      {
        name: "Price",
        data: zip(
          data?.map((price) => new Date(price.time_close * 1000).getTime()) ||
            [],
          data?.map((price) => Number(price.close)) || []
        ),
        type: "spline",
      },
    ],
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner className="w-100" />
      ) : (
        <div className={`highcharts-${theme}`}>
          <HighchartsReact
            highcharts={Highcharts}
            constructorType={"stockChart"}
            options={chartOptions}
          />
        </div>
      )}
    </>
  );
};

export default Chart;
