import axios from "axios";
const baseUrl = "http://localhost:3000/api/user";
const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

const getUser = async (id) => {
  const { data } = await api.get(id);
  return data;
};

const registerUser = async (user) => {
  const { data } = await api.post(`/register`, user);
  return data;
};

const logInUser = async (user) => {
  const { data } = await api.post(`/login`, user);
  return data;
};


const getMe = async () => {
  const { data } = await api.get(`/me`);
  return data;
};

const TopArtists = async () => {
  const { data } = await api.get(`/top-artists`);
  return data;
};

const followArtist = async (id) => {
  const { data } = await api.post(`/follow/${id}`);
  return data;
};

export default { registerUser, logInUser, getMe, TopArtists, followArtist , getUser};
