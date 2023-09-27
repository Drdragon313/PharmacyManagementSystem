import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./redux/store/store";
import { Provider } from "react-redux";
import { OptionsProvider } from "./optionContext/OptionContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <OptionsProvider>
    <App />
    </OptionsProvider>
  </Provider>
);
