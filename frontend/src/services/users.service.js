import axios from "axios";
const baseUrl = "http://localhost:3000/api/user";

const registerUser = async (user) => {
  try {
    const { data } = await axios.post(`${baseUrl}/register`, user);
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

const logInUser = async (user) => {
  try {
    const { data } = await axios.post(`${baseUrl}/login`, user);
    return data;
  } catch (error) {
    return error;
  }
};

const getProfile = async () => {
  try {
    return axios.get("/profile");
  } catch (error) {
    return error;
  }
};
export default { registerUser, logInUser, getProfile };
