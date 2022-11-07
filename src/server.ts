import express from 'express';
import cors from 'cors';
import { apiUser, apiBadges } from './api';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/badges', async (request, response) => {
  const { page = 1, limit = 10, order = 'asc' } = request.query;

  try {
    const { data } = await apiBadges.get(`market/badges?order=oldest&min_value=0&max_value=1000&has_normal=true&has_secret=true&in_market=true&not_in_market=true`);

    const badges = data.badges;

    let arrayPrincipal: any = [];

    for (const item of badges) {
      arrayPrincipal = [].concat(arrayPrincipal, item);
    }

    const startIndex = (Number(page) - 1) * Number(limit);

    const endIndex = Number(page) * Number(limit);

    const orderBy = arrayPrincipal.sort((a: any, b: any) => {
      if (order === 'asc') {
        return a.count - b.count;
      }

      if (order === 'recent') {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);

        return dateB.getTime() - dateA.getTime();
      }

      return b.count - a.count;
    });

    if (startIndex > arrayPrincipal.length) {
      return response.status(404).json({ message: 'Page not found' });
    }

    if (orderBy.length === 0) {
      return response.status(404).json({ message: 'Not found' });
    }

    const results: any = {};

    if (endIndex < arrayPrincipal.length) {
      results.next = {
        page: Number(page) + 1,
        limit: Number(limit),
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: Number(page) - 1,
        limit: Number(limit),
      };
    }

    results.results = orderBy.slice(startIndex, endIndex);

    results.results = arrayPrincipal.slice(startIndex, endIndex);

    return response.status(200).json(results);

  } catch (error) {
    return response.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/badge/:id', async (request, response) => {
  const { id } = request.params;

  try {
    const { data } = await apiBadges.get(`market/badges?order=oldest&min_value=0&max_value=1000&has_normal=true&has_secret=true&in_market=true&not_in_market=true`);

    const badges = data.badges;

    let arrayPrincipal: any = [];

    for (const item of badges) {
      arrayPrincipal = [].concat(arrayPrincipal, item);
    }

    const badge = arrayPrincipal.find((badge: any) => badge.code === id);

    return response.json(badge);

  } catch (error) {
    return response.status(500).json({ message: 'Error badge not found' });
  }
});

app.get('/badges/creator/:id', async (request, response) => {
  const { id } = request.params;
  const { page = 1, limit = 10, order = 'asc' } = request.query;

  try {
    const { data } = await apiBadges.get(`market/badges?order=oldest&min_value=0&max_value=1000&has_normal=true&has_secret=true&in_market=true&not_in_market=true`);

    const badges = data.badges;

    let arrayPrincipal: any = [];

    for (const item of badges) {
      arrayPrincipal = [].concat(arrayPrincipal, item);
    }

    const creatorBadges = arrayPrincipal.filter((badge: any) => badge.creator_profile_id === id);

    const startIndex = (Number(page) - 1) * Number(limit);

    const endIndex = Number(page) * Number(limit);

    const orderBy = creatorBadges.sort((a: any, b: any) => {
      if (order === 'asc') {
        return a.count - b.count;
      }

      if (order === 'recent') {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);

        return dateB.getTime() - dateA.getTime();
      }

      return b.count - a.count;
    });

    if (startIndex > creatorBadges.length) {
      return response.status(404).json({ message: 'Page not found' });
    }

    if (orderBy.length === 0) {
      return response.status(404).json({ message: 'Not found' });
    }

    const results: any = {};

    if (endIndex < creatorBadges.length) {
      results.next = {
        page: Number(page) + 1,
        limit: Number(limit),
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: Number(page) - 1,
        limit: Number(limit),
      };
    }


    results.results = orderBy.slice(startIndex, endIndex);

    results.results = creatorBadges.slice(startIndex, endIndex);

    return response.status(200).json(results);

  } catch (error) {
    return response.status(500).json({ message: 'Error on get badge' });
  }
});

app.get('/badges/search', async (request, response) => {
  const { code } = request.query;

  try {
    const { data } = await apiBadges.get(`market/badges?order=oldest&min_value=0&max_value=1000&has_normal=true&has_secret=true&in_market=true&not_in_market=true`);

    const badges = data.badges;

    let arrayPrincipal: any = [];

    for (const item of badges) {
      arrayPrincipal = [].concat(arrayPrincipal, item);
    }

    const results = arrayPrincipal.filter((badge: any) => (badge.name.toLowerCase().includes(code?.toString().toLowerCase())) || (badge.code.toLowerCase().includes(code?.toString().toLowerCase())) || (badge.description.toLowerCase().includes(code?.toString().toLowerCase())));

    return response.json(results);

  } catch (error) {
    return response.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/user/:id', async (request, response) => {
  const { id } = request.params;
  const { page = 1, limit = 10, order = "asc" } = request.query;

  try {
    const { data } = await apiUser.get(`return/${id}/list?limit=50000`);

    const badges = data.badges;

    const startIndex = (Number(page) - 1) * Number(limit);

    const endIndex = Number(page) * Number(limit);

    const orderBy = badges.sort((a: any, b: any) => {

      if (order === 'asc') {
        return a.count - b.count;
      }

      if (order === 'recent') {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);

        return dateB.getTime() - dateA.getTime();
      }

      if (order === 'serial') {
        return a.serial_number - b.serial_number;
      }

      return b.count - a.count;
    });

    if (startIndex > badges.length) {
      return response.status(404).json({ message: 'Badges not found' });
    }

    if (badges.length === 0) {
      return response.status(404).json({ message: 'Badges not found' });
    }

    const results: any = {};

    if (endIndex < badges.length) {
      results.next = {
        page: Number(page) + 1,
        limit: Number(limit),
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: Number(page) - 1,
        limit: Number(limit),
      };
    }

    results.results = orderBy.slice(startIndex, endIndex);

    results.results = badges.slice(startIndex, endIndex);

    return response.json(results);

  } catch (error) {
    return response.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/badge/count/:id', async (request, response) => {
  const { id } = request.params;

  try {
    const { data } = await apiUser.get(`count?username=${id}`);

    return response.json(data);

  } catch (error) {
    return response.status(500).json({ message: 'Internal server error' });
  }

});

app.listen(process.env.PORT || 3333, () => {
  console.log('🚀 Server started on port 3333!');
});
