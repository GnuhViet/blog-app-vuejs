import axios from 'axios';

const URL = 'https://localhost:7185/';

const instance = axios.create({
  baseURL: URL,
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  // @ts-ignore
  config.headers.Authorization = `Bearer ${sessionStorage.getItem('JWT')}`;
  return config;
});

export default instance;
