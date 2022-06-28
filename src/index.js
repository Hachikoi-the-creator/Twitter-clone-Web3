import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "web3uikit";


ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider
      appId={"QmWFlIFTkLLZ9Ln7F7wF2poeO0xNZ6TDm4uYIGDh"}
      serverUrl={"https://hmbxpfhjb7lo.usemoralis.com:2053/server"}
    >
      <NotificationProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </NotificationProvider>
    </MoralisProvider>
  </React.StrictMode>, document.getElementById("root")
);
