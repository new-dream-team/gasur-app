import axios from "axios";

const api = axios.create({
    baseURL: "https://gasur-dev.herokuapp.com/"
});

export default api;     