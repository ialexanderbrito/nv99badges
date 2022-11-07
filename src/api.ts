
import axios from 'axios';

export const apiUser = axios.create({
  baseURL: process.env.API_USER,
  headers: {
    'x-firebase-appcheck': process.env.FIREBASE_AUTH
  }
});

export const apiBadges = axios.create({
  baseURL: process.env.API_BADGES,
  headers: {
    'x-firebase-appcheck': process.env.FIREBASE_AUTH
  }
});


