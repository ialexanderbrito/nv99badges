import { Router } from 'express';
import { api } from '../../api';
const routes = Router();
routes.get('/graph', async (request, response) => {
  const { code } = request.query;
  try {
    const { data } = await api.get(
      `market/graph?code=${code}&type=trade&range=7days`,
    );
    const labels = data.labels;
    const dataset = data.dataset;
    return response.json({ labels, dataset });
  } catch (error) {
    return response.status(404).json({ message: 'Not found' });
  }
});
export default routes;
