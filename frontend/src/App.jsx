import { Route, Routes } from "react-router-dom";
import "./App.css";
import LSMain from "./components/leftSideBar/LSMain";
import Browse from "./components/pages/Browse";
import { useThemeContext } from "./contexts/ThemeProvider";
import Header from "./components/Header/Header";
import Register from "./components/pages/Register"
import Login from "./components/pages/LogIn";
import Discover from "./components/pages/Discover";
import Charts from "./components/pages/Charts";
import Playlist from "./components/pages/Playlists"
import Likes from "./components/pages/Likes"
import UploadSong from "./components/pages/Upload-song";

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
          <Route path="/" element={<Discover/>} />
          <Route path="/browse" element={< Browse/>} />
          <Route path="/charts" element={<Charts/>} />
          <Route path="/Playlists" element={<Playlist/>} />
          <Route path="/likes" element={<Likes/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/upload-song" element={<UploadSong/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
