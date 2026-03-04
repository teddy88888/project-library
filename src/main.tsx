import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./app/store";
import App from "./App";
import "./index.css";

// 1. Buat client di luar komponen
const queryClient = new QueryClient();

const rootElement = document.getElementById("root");

if (rootElement) {
  // 2. Render tanpa StrictMode sementara untuk debugging
  ReactDOM.createRoot(rootElement).render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>,
  );
}
