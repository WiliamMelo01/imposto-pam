import axios from "axios";

const httpClient = axios.create({
    baseURL: 'https://impostoapi.onrender.com'
});

export default httpClient;