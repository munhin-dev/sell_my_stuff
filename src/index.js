import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "../src/app/App";
import axios from "axios";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
axios.defaults.withCredentials = true;
