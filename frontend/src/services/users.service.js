import axios from "axios";
import { UNSAFE_getTurboStreamSingleFetchDataStrategy } from "react-router-dom";
const baseUrl = "http://localhost:3000/api/user";
const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

const getProfile = async (id) => {
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

const userAllSongs = async (id) => {
  const { data } = await api.get(`/user-songs/${id}`);
  return data;
};


const userAllFollowers = async (id) => {
  const { data } = await api.get(`/user-followers/${id}`);
  return data;
};



const getFavoriteSongs = async (id) => {
  const { data } = await api.get(`/user-liked-songs/${id}`);
  return data;
};


const updateProfilePicture= async (id , file)=>{
  const formFormat= new FormData()
  formFormat.append('profilePic',file)
  const {data}= await api.put(`/${id}/update/profilePicture`,formFormat)
  return data 
}



export default { registerUser, logInUser, getMe, TopArtists, followArtist , getProfile, userAllSongs, userAllFollowers, getFavoriteSongs, updateProfilePicture};
