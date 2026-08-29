import { useAuth } from "../../contexts/AuthProvider";
import AuthenticatingButtons from "./AuthenticatingButtons";
import { useThemeContext } from "../../contexts/ThemeProvider";

function AuthORProfile() {
  const { isDark } = useThemeContext();
  const { isAuthenticated, user } = useAuth();
    console.log(
    "the data from the profile section ",
    isAuthenticated,
    "the user details = ",
    user,
  );
  if(isAuthenticated){
    return 
  }
  
  
  return <AuthenticatingButtons/>

}

export default AuthORProfile;
