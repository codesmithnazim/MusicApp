import { useState } from "react";
import { useEffect } from "react";
import usersService from "../services/users.service";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    try {
      const getProfile = async () => {
        const userRecord = await usersService.getMe();
        if (userRecord.success) {
          console.log("user Record", userRecord);
          setIsAuthenticated(!isAuthenticated);
          setUser(userRecord);
        }
      };
      getProfile();
    } catch (error) {
      if(error.response.data.message==='No token'){
        console.error("user have no valid auth token");
      }
    }

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
