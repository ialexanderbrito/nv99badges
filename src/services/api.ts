import axios from 'axios';

const apiLink = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: apiLink,
});
