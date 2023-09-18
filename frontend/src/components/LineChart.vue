<template>
    <Line id="my-chart-id" style="width:62vw" :options="chartOptions" :data="chartData"></Line>
</template>

<script setup>
import { ref } from "vue";
import { Line } from "vue-chartjs";
import { useChartStore } from "@/stores/chart";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const chartStore = useChartStore();
console.log(chartStore);
console.log(chartStore.chartData);

const chartData = ref({
    labels: ["2023-04-01", "2023-05-01", "2023-06-01"],
    datasets: [{
        label: "A",
        backgroundColor: "blue", borderColor: "blue",
        data: [7.17983, 8.21018, 15.56848],
    }, {
        label: "B",
        backgroundColor: "red", borderColor: "orange",
        data: [33.32972, 50, 10.34851],
    }, {
        label: "C",
        backgroundColor: "green", borderColor: "green",
        data: [40.73772, 1.89189, 0.13467],
    },],
});

const chartOptions = ref({
    responsive: true,
});
</script>

<style lang="scss" scoped></style>