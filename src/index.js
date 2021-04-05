import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "normalize.css";
import "./static/bootstrap.min.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

//ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
