import { apiNv } from './../../api';
import { Router } from 'express';

const routes = Router();

routes.get('/search', async (request, response) => {
  const { text } = request.query;

  try {
    const { data } = await apiNv.get(`search/content?q=${text}`);

    const users = data.users;
    const studios = data.studios;
    const badges = data.badges;

    return response.json({ users, studios, badges });
  } catch (error) {
    return response.status(404).json({ message: 'Not found' });
  }
});

export default routes;
