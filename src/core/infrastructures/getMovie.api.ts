import axios, { AxiosInstance, AxiosResponse } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 1000,
  headers: {
    'x-api-key': process.env.API_KEY,
  },
});
