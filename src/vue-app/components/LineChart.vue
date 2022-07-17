<template>
  <Modal
    :open="open"
    :on-close="closeModal"
    title="График колебаний скорости, мс"
  >
    <div :class="$style.LineChart__container">
      <Line
        :width="width"
        :height="height"
        :chart-id="chartId"
        :chart-data="chartData"
        :chart-options="chartOptions"
      /></div
  ></Modal>
</template>

<script>
import Modal from "./Modal.vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  Plugin,
} from "chart.js";

ChartJS.register({
  Title,
  Tooltip,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
});

export default {
  data: function () {
    return {
      open: false,
      chartId: "line-chart",
      width: 600,
      height: 388,
      cssClasses: "",
      plugins: () => [],
      chartData: {
        labels: [],
        datasets: [
          {
            backgroundColor: "#a20bc0",
            data: [],
          },
        ],
      },
      chartOptions: {
        scales: {
          x: {
            display: false,
          },
        },
      },
    };
  },
  methods: {
    openModal(open) {
      this.open = open;
    },
    closeModal() {
      window.store.showChartModal(false);
    },
    setChartData(data, chars) {
      this.chartData.datasets[0].data = data;
      this.chartData.labels = chars;
    },
  },
  mounted() {
    window.store.subscribeVue(() => {
      const { showChart, chartData, chars } = window.store.state;
      this.openModal(showChart);
      if (chartData) this.setChartData(chartData, chars);
    });
  },
  components: { Modal, Line },
};
</script>

<style module>
.LineChart__container {
  width: 600;
  height: 388;
}
</style>
