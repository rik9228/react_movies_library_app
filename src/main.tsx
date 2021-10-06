import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MoviePagesProvider } from "./components/providers/MoviePagesProvider";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/providers/AuthProvider";

ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <MoviePagesProvider>
        <App />
      </MoviePagesProvider>
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById("root")
);
