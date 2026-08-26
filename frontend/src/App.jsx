import { Route, Routes } from "react-router-dom";
import "./App.css";
import LSMain from "./components/leftSideBar/LSMain";
import Browse from "./components/pages/Browse";
import  { useThemeContext } from "./contexts/ThemeContext"
import Header from "./components/Header/Header";

function App() {
  const {isDark}= useThemeContext()
  return (
    <div className={`${isDark? "dark":""} musicApp max-w-screen min-h-screen bg-background text-foreground flex `}>
      <LSMain className={`justify-self-start`} />
      <div className="flex flex-col flex-1 justify-start">
      <Header/>
      <Routes>
        <Route path="/" element={<Browse />} />
      </Routes>

      </div>
    </div>
  );
}

export default App;
