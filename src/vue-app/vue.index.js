import { createApp, h } from "vue";
import singleSpaVue from "single-spa-vue";
import App from "./App.vue";

const vueLifeCycles = singleSpaVue({
  createApp,
  appOptions: {
    el: "#vue",
    render: () => h(App),
  },
});

export const bootstrap = [vueLifeCycles.bootstrap];
export const mount = [vueLifeCycles.mount];
export const unmount = [vueLifeCycles.unmount];
