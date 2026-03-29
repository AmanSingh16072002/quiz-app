import axios from "axios";

const API = axios.create({
    baseURL: "https://quiz-app-uw5i.onrender.com/api"
});

export default API;