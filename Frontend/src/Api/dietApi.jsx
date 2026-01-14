import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/healthbuddy/v1",
  headers: {
    "Content-Type": "application/json"
  }
});

export const getWeeklyDietApi = (profileData) => {
  return API.post("/api/diet/weekly-diet", profileData);
};
