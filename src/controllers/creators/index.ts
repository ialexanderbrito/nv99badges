import { Router } from 'express';
import { apiCreators } from '../../api';

const routes = Router();

routes.get('/creators', async (request, response) => {
  const { page = 1, limit = 10, order = 'subs' } = request.query;

  try {
    const { data } = await apiCreators.get(`content/creators`);

    const creators = data.creators;

    let arrayPrincipal: any = [];

    for (const item of creators) {
      arrayPrincipal = [].concat(arrayPrincipal, item);
    }

    const startIndex = (Number(page) - 1) * Number(limit);

    const endIndex = Number(page) * Number(limit);

    const orderBy = arrayPrincipal.sort((a: any, b: any) => {
      if (order === 'subs') {
        return b.subscribers - a.subscribers;
      }

      if (order === 'name') {
        return a.name.localeCompare(b.name);
      }

      return b.subscribers - a.subscribers;
    });

    const total = orderBy.length;

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

    results.total = total;

    return response.status(200).json(results);
  } catch (error) {
    return response.status(400).json({ message: 'Error' });
  }
});

export default routes;
