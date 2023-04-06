import axios from "axios";

const api = axios.create({
    baseURL: "https://webappdeploy-backend.azurewebsites.net/",
});

export default api;