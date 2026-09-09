// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./contexts/AuthProvider.jsx";
import ThemeProvider from "./contexts/ThemeProvider.jsx";
import PlayerContextP from "./contexts/PlayerContext.jsx";
import ReactQueryContextProvider from "./contexts/ReactQueryContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {/* <StrictMode> */}
    <AuthProvider>
      <PlayerContextP>
        <ThemeProvider>
          <ReactQueryContextProvider>
            <App />
          </ReactQueryContextProvider>
        </ThemeProvider>
      </PlayerContextP>
    </AuthProvider>
    {/* </StrictMode> */}
  </BrowserRouter>,
);
