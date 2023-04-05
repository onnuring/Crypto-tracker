import { useQuery } from "react-query";
import { fetchCoinHistory } from "./api";
import ApexChart from "react-apexcharts";
import { useOutletContext } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";

interface ChartProps {
  coinId: string;
}
interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}
const Chart = () => {
  const { coinId } = useOutletContext<ChartProps>();
  const { isLoading, data: chartData } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId)
  );
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={
            [
              {
                name: "Price",
                data: chartData?.map((price) => ({
                  x: price.time_close,
                  y: [
                    Number(price.open),
                    Number(price.high),
                    Number(price.low),
                    Number(price.close),
                  ],
                })),
              },
            ] as any
          }
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 300,
              width: 500,
              background: "transparent",
              toolbar: {
                show: false,
              },
            },
            grid: {
              show: false,
            },
            yaxis: {
              labels: {
                show: true,
              },
              tooltip: {
                enabled: true,
              },
            },
            xaxis: {
              labels: {
                show: true,
              },
              axisTicks: {
                show: true,
              },
              type: "datetime",
              categories: chartData?.map((price) =>
                new Date(price.time_close * 1000).toDateString()
              ),
            },
            tooltip: {
              y: {
                formatter: (value) => `$ ${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default Chart;
