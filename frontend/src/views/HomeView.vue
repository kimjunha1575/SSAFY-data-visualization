<template>
  <div>adsf</div>
  <UserForm></UserForm>
  <LineChart></LineChart>
</template>

<script setup>
import { useChartStore } from "../stores/chart";
import LineChart from "../components/LineChart.vue";
import UserForm from "../components/UserForm.vue";
import dataLap from "../utils/api";

dataLap.get().then(li=>console.log(li));

const chartStore = useChartStore();

chartStore.makeChart();

</script>

<style lang="scss" scoped></style>