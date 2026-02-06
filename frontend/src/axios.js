import axios from "axios";

export default axios.create({
    baseURL: "https://cravella.onrender.com",
    withCredentials: true
});