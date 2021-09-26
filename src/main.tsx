import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MoviePagesProvider } from "./components/providers/MoviePagesProvider";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <MoviePagesProvider>
      <App />
    </MoviePagesProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
