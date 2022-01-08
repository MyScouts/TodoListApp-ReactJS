import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { Provider } from 'react-redux'
import { storeApp } from "./resources/redux/store";


// INDEX.TSX
ReactDOM.render(
  <React.StrictMode>
    <Provider store={storeApp}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
