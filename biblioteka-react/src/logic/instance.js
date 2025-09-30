import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

const token = sessionStorage.getItem("token");

if (token) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default apiClient;
