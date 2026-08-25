import { Route, Routes } from "react-router-dom";
import "./App.css";
import LSMain from "./components/leftSideBar/LSMain";
import Browse from "./components/pages/Browse";
import ThemeContext from "./contexts/ThemeContext"

function App() {
  return (
    <ThemeContext>
    <div className="musicApp max-w-screen min-h-screen bg-pink-100 flex">
      <LSMain className={`justify-self-start`} />
      <Routes>
        <Route path="/" element={<Browse />} />
      </Routes>
    </div>
    </ThemeContext>
  );
}

export default App;
