import axios from "axios";

const instance = axios.create({
  baseURL: "https://social-freaks.vercel.app/",
});

export default instance;
