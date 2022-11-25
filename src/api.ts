import axios from 'axios';

require('dotenv').config({
  path: '.env',
});

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
  headers: {
    'x-firebase-appcheck': process.env.NV_KEY,
  },
});
