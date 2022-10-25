import { Route, Routes } from 'react-router-dom';

import { Badge } from 'pages/Badge';
import { Homepage } from 'pages/Home';
import { NotFound } from 'pages/NotFound';

export function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/mais-raros" element={<Homepage />} />
      <Route path="/mais-resgatados" element={<Homepage />} />
      <Route path="/mais-recentes" element={<Homepage />} />
      <Route path="/badge/:code" element={<Badge />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
