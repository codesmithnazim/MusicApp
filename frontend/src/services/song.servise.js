import axios from "axios";
const baseUrl = "http://localhost:3000/api/song";
const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

const getSong = async (id) => {
  const { data } = await api.get(id);
  return data;
};

const liker = async (id) => {
  const { data } = await api.patch(`${id}`, {});
  return data;
};



export default { getSong, liker};
