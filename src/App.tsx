import { BrowserRouter } from 'react-router-dom';

import { MainRoutes } from 'routes';

import { BadgeProvider } from 'contexts/Badges';
import { ToastProvider } from 'contexts/Toast';

export function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <BadgeProvider>
          <MainRoutes />
        </BadgeProvider>
      </BrowserRouter>
    </ToastProvider>
  );
}
