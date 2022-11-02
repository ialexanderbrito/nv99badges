import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/badges', async (request, response) => {
  const { page = 1, limit = 10, order = "asc", } = request.query;

  try {
    const { data } = await axios.get(`https://stickers-flow3r-2eqj3fl3la-ue.a.run.app/v1/badges?order=desc`);

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

      return b.count - a.count;
    });

    const total = orderBy.length;

    if (startIndex > badges.length) {
      return response.status(404).json({ message: 'Badges not found' });
    }

    if(orderBy.length === 0) {
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

    results.total = total;

    return response.json(results);

  } catch (error) {
    return response.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/badge/:id', async (request, response) => {
  const { id } = request.params;

  try {
    const { data } = await axios.get(`https://stickers-flow3r-2eqj3fl3la-ue.a.run.app/v1/badges?order=desc`);

    const badges = data.badges;

    const badge = badges.find((badge: any) => badge.code === id);

    return response.json(badge);
  } catch (error) {
    return response.status(500).json({ message: 'Error on get badge' });
  }
});

app.get('/badges/creator/:id', async (request, response) => {
  const { id } = request.params;
  const { page = 1, limit = 10, order = "asc", } = request.query;

  try {
    const { data } = await axios.get(`https://stickers-flow3r-2eqj3fl3la-ue.a.run.app/v1/badges?order=desc`);

    const badges = data.badges;

    const creatorBadges = badges.filter((badge: any) => badge.creator_profile_id === id);

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

    const total = creatorBadges.length;

    if (startIndex > creatorBadges.length) {
      return response.status(404).json({ message: 'Badges not found' });
    }

    if (creatorBadges.length === 0) {
      return response.status(404).json({ message: 'Badges not found' });
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

    results.total = total;

    return response.json(results);

  } catch (error) {
    return response.status(500).json({ message: 'Error on get badge' });
  }
});

app.get('/badges/search', async (request, response) => {
  const { code } = request.query;

  try {
    const { data } = await axios.get(`https://stickers-flow3r-2eqj3fl3la-ue.a.run.app/v1/badges?order=desc`);

    const badges = data.badges;

    const results = badges.filter((badge: any) => (badge.name.toLowerCase().includes(code?.toString().toLowerCase())) || (badge.code.toLowerCase().includes(code?.toString().toLowerCase())) || (badge.description.toLowerCase().includes(code?.toString().toLowerCase())));


    return response.json(results);

  } catch (error) {
    return response.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/user/:id', async (request, response) => {
  const { id } = request.params;
  const { page = 1, limit = 10, order = "asc" } = request.query;

  try {
    const { data } = await axios.get(`https://stickers-nv99-2eqj3fl3la-ue.a.run.app//v1/badges/return/${id}/list?limit=100000`);

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

        if(order === 'serial'){
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
    const { data } = await axios.get(`https://stickers-nv99-2eqj3fl3la-ue.a.run.app//v1/badges/count?username=${id}`);

    return response.json(data);

  } catch (error) {
    return response.status(500).json({ message: 'Internal server error' });
  }

});

app.listen(process.env.PORT || 3333, () => {
  console.log('🚀 Server started on port 3333!');
});
