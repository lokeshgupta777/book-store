import axios from "axios";

let baseURL = "http://localhost:3010"
if (process.env.API_BASE_URL) {
    baseURL = `${process.env.API_BASE_URL}`;
}
const axiosIns = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosIns;
