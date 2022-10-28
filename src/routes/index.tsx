import { Route, Routes } from 'react-router-dom';

import { Badge } from 'pages/Badge';
import { Homepage } from 'pages/Home';
import { MaisRecentes } from 'pages/MaisRecentes';
import { MaisResgatados } from 'pages/MaisResgatados';
import { NotFound } from 'pages/NotFound';

export function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/mais-raros" element={<Homepage />} />
      <Route path="/mais-resgatados" element={<MaisResgatados />} />
      <Route path="/mais-recentes" element={<MaisRecentes />} />
      <Route path="/badge/:code" element={<Badge />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
