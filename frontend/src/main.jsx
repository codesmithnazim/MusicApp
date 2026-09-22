// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./contexts/AuthProvider.jsx";
import ThemeProvider from "./contexts/ThemeProvider.jsx";
import SongsQueueContextP from "./contexts/songsQueue.jsx";
import ReactQueryContextProvider from "./contexts/ReactQueryContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {/* <StrictMode> */}
    <AuthProvider>
      <SongsQueueContextP>
        <ThemeProvider>
          <ReactQueryContextProvider>
            <App />
          </ReactQueryContextProvider>
        </ThemeProvider>
      </SongsQueueContextP>
    </AuthProvider>
    {/* </StrictMode> */}
  </BrowserRouter>,
);
