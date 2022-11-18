import { BrowserRouter } from 'react-router-dom';

import { MainRoutes } from 'routes';

import { ButtonTopPage } from 'components/ButtonTop';
import { Footer } from 'components/Footer';

import { BadgeProvider } from 'contexts/Badges';
import { ToastProvider } from 'contexts/Toast';

export function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <BadgeProvider>
          <MainRoutes />
          <Footer />
          <ButtonTopPage />
        </BadgeProvider>
      </BrowserRouter>
    </ToastProvider>
  );
}
