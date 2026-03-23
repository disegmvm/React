import { createRoot } from "react-dom/client";
import { App } from "./components/app/app";
import { ThemeProvider } from "./components/themeContext/themeContext";
import { UserProvider } from "./components/userContext/userContext";
import "./index.css";

const root = document.getElementById("root");

if (root) {
  createRoot(root).render(
    <ThemeProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </ThemeProvider>,
  );
}