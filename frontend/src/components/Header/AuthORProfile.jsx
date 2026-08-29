import { useAuth } from "../../contexts/AuthProvider";
import AuthenticatingButtons from "./AuthenticatingButtons";
import Profile from "../utils/Profile";

function AuthORProfile() {
  const { isAuthenticated, user } = useAuth();
  console.log(
    "the data from the profile section ",
    isAuthenticated,
    "the user details = ",
    user,
  );
  if (isAuthenticated) {
    return <Profile />;
  }

  return <AuthenticatingButtons />;
}

export default AuthORProfile;
