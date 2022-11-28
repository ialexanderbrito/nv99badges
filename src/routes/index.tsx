import { Route, Routes } from 'react-router-dom';

import { Badge } from 'pages/Badge';
import { Canais } from 'pages/Canais';
import { Favoritos } from 'pages/Favoritos';
import { Homepage } from 'pages/Home';
import { MaisRecentes } from 'pages/MaisRecentes';
import { MaisResgatados } from 'pages/MaisResgatados';
import { NotFound } from 'pages/NotFound';
import { Ranking } from 'pages/Ranking';
import { User } from 'pages/User';

export function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/mais-raros" element={<Homepage />} />
      <Route path="/mais-resgatados" element={<MaisResgatados />} />
      <Route path="/mais-recentes" element={<MaisRecentes />} />
      <Route path="/canais" element={<Canais />} />
      <Route path="/badge/:code" element={<Badge />} />
      <Route path="/user/:id" element={<User />} />
      <Route path="/favoritos" element={<Favoritos />} />
      <Route path="/ranking" element={<Ranking />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
