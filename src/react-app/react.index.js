import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import App from "./App";

const reactLiveCycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: App,
  domElementGetter: () => document.getElementById("react"),
  suppressComponentDidCatchWarning: true,
});

export const bootstrap = [reactLiveCycles.bootstrap];
export const mount = [reactLiveCycles.mount];
export const unmount = [reactLiveCycles.unmount];
