import { fetchCoinHistory } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router";

import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import { GradientColorObject, Options } from "highcharts";
import LoadingSpinner from "@/components/loding-spinner";
import { useTheme } from "@/components/theme-provider";

import { COLOR } from "@/constants/color";
import { THEME } from "@/constants/theme";

const Chart = () => {
  const { state } = useLocation();

  const { theme } = useTheme();

  const checkIsDark = () => {
    let isDark = theme === THEME.DARK;
    if (theme === THEME.SYSTEM) {
      isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    return isDark;
  };

  const { isLoading, data } = useQuery({
    queryKey: ["ohlcv", state.coinId],
    queryFn: () => fetchCoinHistory(state.coinId),
    // refetchInterval: 10000,
  });

  const getChartBackgroundColor = () =>
    checkIsDark() ? COLOR.BACKGROUND_DARK : COLOR.WHITE;

  const getTooltipTextColor = () => (checkIsDark() ? COLOR.WHITE : COLOR.BLACK);

  const chartSeriesGradientColor: GradientColorObject = {
    linearGradient: {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 1,
    },
    stops: [
      [0, "oklch(0.845 0.143 164.978)"],
      [1, "oklch(0.789 0.154 211.53)"],
    ],
  };

  const chartOptions: Options = {
    credits: { enabled: false },
    rangeSelector: {
      enabled: false,
    },
    chart: {
      backgroundColor: getChartBackgroundColor(),
    },
    xAxis: {
      type: "datetime",
    },
    yAxis: {
      visible: false,
    },
    series: [
      {
        type: "candlestick",
        name: "Price",
        data:
          data?.map((price) => [
            price.time_close * 1000,
            Number(price.open),
            Number(price.high),
            Number(price.low),
            Number(price.close),
          ]) || [],
        color: chartSeriesGradientColor,
      },
    ],
    tooltip: {
      backgroundColor: getChartBackgroundColor(),
      style: {
        color: getTooltipTextColor(),
      },
    },
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner className="w-100" />
      ) : (
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={"stockChart"}
          options={chartOptions}
        />
      )}
    </>
  );
};

export default Chart;
