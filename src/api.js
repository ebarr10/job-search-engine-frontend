import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_IP_ADDRESS || "http://127.0.0.1:8000/api/",
});

export const fetchJobs = (queryParams) =>
  API.get("jobs/", {
    params: queryParams,
  });
