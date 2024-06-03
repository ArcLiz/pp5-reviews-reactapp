import axios from "axios";

axios.defaults.baseURL = "https://pp5-litlounge-7b597e44d7be.herokuapp.com";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();
