import axios from "axios";

const baseUrl = process.env.API_URL || "http://localhost:1313";

export const axiosBase = axios.create({ baseURL: baseUrl });
