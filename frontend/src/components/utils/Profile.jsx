// import { useThemeContext } from "../../contexts/ThemeProvider";
import { useAuth } from "../../contexts/AuthProvider";
import Avator from "./Avator";

function Profile() {
  // const { isDark } = useThemeContext();
  const {user}= useAuth()
  return <div>
    <Avator user={user}/>
  </div>;
}

export default Profile;
