import { registerApplication, start } from "single-spa";
import { createStore } from "./store";

window.store = createStore();

registerApplication({
  name: "react",
  app: () => import("./react-app/react.index.js"),
  activeWhen: "/",
});

registerApplication({
  name: "vue",
  app: () => import("./vue-app/vue.index.js"),
  activeWhen: "/",
});

start();
