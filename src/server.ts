import express from 'express';
import cors from 'cors';

import badgesRoutes from './controllers/badges';
import usersRoutes from './controllers/users';
import creatorsRoutes from './controllers/creators';
import graphRoutes from './controllers/graph';

const app = express();

app.use(express.json());
app.use(cors());

app.use(badgesRoutes);
app.use(usersRoutes);
app.use(creatorsRoutes);
app.use(graphRoutes);
app.use('/images', express.static('src/assets'));

app.listen(process.env.PORT || 3333, () => {
  console.log('🚀 Server started on port 3333!');
});