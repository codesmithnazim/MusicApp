import axios from "axios";
const baseUrl = "http://localhost:3000/api/song";
// const baseUrl =  "https://ribbit.bonto.page/api/song";//in case of making dist folder for the bunto deployement
const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

const getSong = async (id) => {
  const { data } = await api.get(id);
  return data;
};

const liker = async (id) => {
  const { data } = await api.patch(`/like/${id}`, {});
  return data;
};

const getSongCover = async (id) => {
  const { data } = await api.get(`/cover/${id}`);
  return data;
};

export default { getSong, liker, getSongCover };
