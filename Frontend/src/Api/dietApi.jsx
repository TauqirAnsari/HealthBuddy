import API from "../config/AxiosDietApi"

export const getWeeklyDietApi = (profileData) => {
  return API.post("/api/diet/weekly-diet", profileData);
};
