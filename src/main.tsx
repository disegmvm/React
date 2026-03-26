import { createRoot } from "react-dom/client";
import { App } from "./components/app/app";
import { ThemeProvider } from "./components/themeContext/themeContext";
import { UserProvider } from "./components/userContext/userContext";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const root = document.getElementById("root");

if (root) {
  createRoot(root).render(
    <Provider store={store}>
      <ThemeProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </ThemeProvider>
    </Provider>,
  );
}
