import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./index.css";
import App from "./App.jsx";
import AdminAuthCheck from "./components/AdminAuthCheck";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AdminAuthCheck />
      <App />
    </Provider>
  </StrictMode>
);
