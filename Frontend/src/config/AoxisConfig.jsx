import axios from 'axios';

const Api = axios.create({
  baseURL: 'http://localhost:4000/healthbuddy/v1/',
  withCredentials: true, // ✅ REQUIRED for cookies
});

export default Api;
