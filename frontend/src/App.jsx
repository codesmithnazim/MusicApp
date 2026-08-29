import { Route, Routes } from "react-router-dom";
import "./App.css";
import LSMain from "./components/leftSideBar/LSMain";
import Browse from "./components/pages/Browse";
import { useThemeContext } from "./contexts/ThemeProvider";
import Header from "./components/Header/Header";
import Register from "./components/pages/Register"
import Login from "./components/pages/LogIn";

function App() {
  const { isDark } = useThemeContext();
  return (
    <div
      className={`${isDark ? "dark" : ""} musicApp flex  max-w-screen min-h-screen bg-background text-foreground `}
    >
      <LSMain className={`justify-self-start`} />
      <div className="flex flex-col flex-1 ">
        <Header />
        <Routes>
          <Route path="/" element={<Browse/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
