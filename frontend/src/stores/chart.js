import { ref, computed } from "vue";
import { defineStore } from "pinia";
import dataLap from "../utils/api";

export const useChartStore = defineStore("chart", () => {
  const chartData = ref({
    labels: ["2023-04-01", "2023-05-01", "2023-06-01"],
    datasets: [
      {
        label: "A",
        backgroundColor: "blue",
        borderColor: "blue",
        data: [7.17983, 8.21018, 15.56848],
        tension: 0.3,
      },
      {
        label: "B",
        backgroundColor: "red",
        borderColor: "orange",
        data: [33.32972, 50, 10.34851],
        tension: 0.3,
      },
      {
        label: "C",
        backgroundColor: "green",
        borderColor: "green",
        data: [40.73772, 1.89189, 0.13467],
        tension: 0.3,
      },
    ],
  });

  function setChartList(list) {
    chartList.value = list;
  }

  function makeColor() {
    return "#" + Math.round(Math.random() * 0xffffff).toString(16);
  }

  async function makeChart() {
    try {
      const result = await dataLap.get();

      const chartData = {
        lables: result.data[0].data.map((li) => li.period),
        datasets: result.data.reduce((acc, cur) => {
          const label = cur.title;
          const data = cur.data.map((li) => li.ratio);
          acc.push({ label, data, fill: false, backgroundColor: makeColor(), borderColor: makeColor() });
        }, []),
      };
      setChartList(chartData);
    } catch (error) {
      console.log(error);
    }
  }

  return { chartData, setChartList, makeChart };
});
