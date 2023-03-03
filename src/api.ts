import axios from 'axios';
import cron from 'node-cron';

require('dotenv').config({
  path: '.env',
});

const TOKEN_NV = process.env.NV_KEY;

export const api = axios.create({
  baseURL: 'https://stickers-nv99-2eqj3fl3la-ue.a.run.app/v2',
  headers: {
    'x-firebase-appcheck': process.env.FIREBASE_KEY,
  },
});

export const apiCreators = axios.create({
  baseURL: 'https://creators-flow3r-2eqj3fl3la-ue.a.run.app/v1',
  headers: {
    'x-firebase-appcheck': process.env.FIREBASE_KEY,
  },
});

export const apiNv = axios.create({
  baseURL: 'https://nv99.com.br/api',
});

apiNv.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers['x-firebase-appcheck'] = TOKEN_NV;
  }
  return config;
});

cron.schedule('*/15 * * * *', () => {
  axios
    .get('https://nv99.com.br/api/search/content?q=Flamengo')
    .then((response) => {
      const headers = response.headers;

      const firebaseToken = headers['x-firebase-appcheck'];

      process.env.NV_KEY = firebaseToken;

      console.log('Token atualizado', firebaseToken);
    })
    .catch(() => {
      console.log('Erro ao atualizar token');
    });
});
