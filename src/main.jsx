import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./components/store/theme-context.jsx";
import TodosProvider from "./components/store/todo-context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <TodosProvider>
        <App />
      </TodosProvider>
    </ThemeProvider>
  </StrictMode>
);
