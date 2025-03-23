import { fetchCoinHistory } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router";

import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import { GradientColorObject, Options, Tooltip } from "highcharts";
import LoadingSpinner from "@/components/loding-spinner";
import { useTheme } from "@/components/theme-provider";

import isNil from "lodash-es/isNil";
import zip from "lodash-es/zip";
import { DateTime } from "luxon";
import { COLOR } from "@/constants/color";
import { THEME } from "@/constants/theme";
import { DATE_YEAR_MONTH_DAY_FORMAT } from "@/constants/date";

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

  const tooltipFormatter = (tooltip: Tooltip) => {
    if (isNil(tooltip.chart.hoverPoints)) return "";

    const xValue = DateTime.fromMillis(tooltip.chart.hoverPoints[0].x).toFormat(
      DATE_YEAR_MONTH_DAY_FORMAT
    );

    const tooltipBySeries: string[] = [];
    tooltip.chart.hoverPoints.forEach((point) => {
      if (!isNil(point.y)) {
        tooltipBySeries.push(`● ${point.series.name}: $${point.y}`);
      }
    });

    return `${xValue}<br />${tooltipBySeries.join("<br />")}`;
  };

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
        name: "Price",
        data: zip(
          data?.map((price) => new Date(price.time_close * 1000).getTime()) ||
            [],
          data?.map((price) => Number(price.close)) || []
        ),
        type: "spline",
        color: chartSeriesGradientColor,
        lineWidth: 3,
      },
    ],
    tooltip: {
      backgroundColor: getChartBackgroundColor(),
      style: {
        color: getTooltipTextColor(),
      },
      formatter: tooltipFormatter,
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
