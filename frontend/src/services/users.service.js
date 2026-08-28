import axios from "axios";
const baseUrl = "http://localhost:3000/api/user";
const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

const registerUser = async (user) => {
  const { data } = await api.post(`/register`, user);
  return data;
};

const logInUser = async (user) => {
  const { data } = await api.post(`/login`, user);
  return data;
};

const getProfile = async () => {
  const { data } = await api.get(`/profile`);
  return data;
};
export default { registerUser, logInUser, getProfile };
