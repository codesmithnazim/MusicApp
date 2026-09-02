import axios from "axios";
const baseUrl = "http://localhost:3000/api/songs";
const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

const uploadSong = async (songDetails) => {
  const { data } = await api.post(`/register`, songDetails);
  return data;
};

export default {uploadSong}
