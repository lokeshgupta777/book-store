import axios from "axios";

let baseURL = "http://localhost:3010"
if (process.env.REACT_APP_API_BASE_URL) {
    baseURL = `${process.env.REACT_APP_API_BASE_URL}`;
}
const axiosIns = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosIns;
