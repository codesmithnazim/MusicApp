import { Route, Routes } from "react-router-dom";
import "./App.css";
import LSMain from "./components/leftSideBar/LSMain";
import Browse from "./components/pages/Browse";
import { useThemeContext } from "./contexts/ThemeProvider";
import Header from "./components/Header/Header";
import Register from "./components/pages/Register";
import Login from "./components/pages/LogIn";
import Discover from "./components/pages/Discover-page/Discover-Main";
import Charts from "./components/pages/Charts";
import Playlist from "./components/pages/Playlists";
import Likes from "./components/pages/Likes";
import UploadSong from "./components/pages/Upload-song";
import PlayingBar from "./components/PlayingBar";
import ProfileMainPage from "./components/pages/Profile-page/ProfileMainPage";
import UsersAllSongs from "./components/pages/Profile-page/UsersAllSongs";
import UsersAllFollowers from "./components/pages/Profile-page/UsersAllFollowers";
import UsersAllFollowings from "./components/pages/Profile-page/UsersAllFollowings";

function App() {
  const { isDark } = useThemeContext();
  return (
    <div
      className={`${isDark ? "dark" : ""} musicApp relative flex  max-w-screen min-h-screen bg-background text-foreground `}
    >
      <LSMain className={`justify-self-start`} />
      <div className="flex flex-col flex-1 ">
        <Header />
        <Routes>
          <Route path="/" element={<Discover />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/Playlists" element={<Playlist />} />
          <Route path="/likes" element={<Likes />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/upload-song" element={<UploadSong />} />
          <Route path="/user/:id" element={<ProfileMainPage />}>
            <Route path="songs" element={<UsersAllSongs />} />
            <Route path="followers" element={<UsersAllFollowers />} />
            <Route path="followings" element={<UsersAllFollowings />} />
          </Route>
        </Routes>
      </div>
      <PlayingBar />
    </div>
  );
}

export default App;
