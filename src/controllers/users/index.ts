import { Router } from "express";
import { apiUser } from "../../api";

const routes = Router();

routes.get('/users/:id', async (request, response) => {
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

routes.get('/users/count/:id', async (request, response) => {
  const { id } = request.params;

  try {
    const { data } = await apiUser.get(`count?username=${id}`);

    return response.json(data);

  } catch (error) {
    return response.status(500).json({ message: 'Internal server error' });
  }

});

export default routes;