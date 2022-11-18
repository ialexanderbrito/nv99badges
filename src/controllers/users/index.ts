import { api } from './../../api';
import { Router } from 'express';

const routes = Router();

routes.get('/users/:id', async (request, response) => {
  const { id } = request.params;
  const { page = 1, limit = 10, order = 'asc' } = request.query;

  try {
    const { data } = await api.get(`badges/user_badges_search?username=${id}`);

    const { data: profile } = await api.get(
      `badges/profile_card?username=${id}`,
    );

    const profileStats = profile.statistics;

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
        const dateA = new Date(a.expires_at);
        const dateB = new Date(b.expires_at);

        return dateB.getTime() - dateA.getTime();
      }

      if (order === 'serial') {
        return a.serial_number - b.serial_number;
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

    results.profile = profileStats;

    return response.status(200).json(results);
  } catch (error) {
    return response.status(500).json({ message: 'Internal server error' });
  }
});

export default routes;
