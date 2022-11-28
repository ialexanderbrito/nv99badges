import { Router } from 'express';
import { api } from '../../api';

const routes = Router();

routes.get('/ranking', async (request, response) => {
  const { page = 1, limit = 10 } = request.query;

  try {
    const { data } = await api.get('/badges/ranking');

    const ranking = data.ranking;

    let arrayPrincipal: any = [];

    for (const item of ranking) {
      arrayPrincipal = [].concat(arrayPrincipal, item);
    }

    const startIndex = (Number(page) - 1) * Number(limit);

    const endIndex = Number(page) * Number(limit);

    if (startIndex > arrayPrincipal.length) {
      return response.status(404).json({ message: 'Page not found' });
    }

    if (arrayPrincipal.length === 0) {
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

    results.results = arrayPrincipal.slice(startIndex, endIndex);

    return response.status(200).json(results);
  } catch (error) {
    return response.status(500).json({ message: 'Error on get badge' });
  }
});

export default routes;
