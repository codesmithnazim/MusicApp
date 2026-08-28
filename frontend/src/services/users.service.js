import axios from "axios";
const baseUrl= 'http://localhost:3000/api/users'

const registerUser = async (user) => {
  const { data } = await axios.post(`${baseUrl}/register`, user);
  console.log(data);
  return data;
};

const logInUser=async (user)=>{
   const {data}= await axios.post(`${baseUrl}/login`, user)
   return data
}
export default { registerUser, logInUser };
