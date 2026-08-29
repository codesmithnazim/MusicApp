import { useThemeContext } from "../../contexts/ThemeProvider";
import Avator from "./Avator";

function Profile() {
  const { isDark } = useThemeContext();
  return <div>
    <Avator/>
  </div>;
}

export default Profile;
