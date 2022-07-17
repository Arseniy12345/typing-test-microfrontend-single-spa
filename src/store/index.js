export const createStore = () => {
  const state = {
    diffTime: 0,
    showModal: false,
    printableText: "",
    showChart: false,
    chartData: [],
    chars: [],
  };

  const vueSubscribers = [];
  const reactSubscribers = [];

  const notifyVueSubscribers = () => {
    vueSubscribers.forEach((fn) => fn());
  };

  const notifyReactSubscribers = () => {
    reactSubscribers.forEach((fn) => fn());
  };

  return {
    get state() {
      return state;
    },
    subscribeVue(fn) {
      vueSubscribers.push(fn);
    },
    subscribeReact(fn) {
      reactSubscribers.push(fn);
    },
    showSelectModal(show) {
      state.showModal = show;
      notifyVueSubscribers();
    },
    setPrintableText(text) {
      state.printableText = text;
      notifyReactSubscribers();
    },
    showChartModal(show, data, chars) {
      state.showChart = show;
      if (data) {
        state.chartData = data;
        state.chars = chars;
      }
      notifyVueSubscribers();
    },
  };
};
