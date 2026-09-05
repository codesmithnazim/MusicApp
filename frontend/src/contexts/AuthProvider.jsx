import { useState } from "react";
import { useEffect } from "react";
import usersService from "../services/users.service";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getProfile = async () => {
      try {
        const userRecord = await usersService.getMe();
        if (userRecord.success) {
          console.log("user Record", userRecord);
          setIsAuthenticated(!isAuthenticated);
          setUser(userRecord.user);
        }
      } catch (error) {
        
        if(error?.response?.data){
          console.log('the error came during fetching the user data ',error.response.data)
        }
        // console.log("user have no valid auth token", error);
      }
    };
    getProfile();

    return () => {};
  }, []);
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
const useAuth = () => {
  return useContext(AuthContext);
};
export default AuthProvider;
export { useAuth };
