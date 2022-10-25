import axios from 'axios';

export const api = axios.create({
  baseURL: `https://stickers-flow3r-2eqj3fl3la-ue.a.run.app`,
});

export const badgeApi = axios.create({
  baseURL: `https://stickers-nv99-2eqj3fl3la-ue.a.run.app///v1/market/feed`,
});
