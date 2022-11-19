import { BrowserRouter } from 'react-router-dom';

import { MainRoutes } from 'routes';

import { ButtonTopPage } from 'components/ButtonTop';
import { Footer } from 'components/Footer';
import { Layout } from 'components/Layout';

import { disabledPathname } from 'utils/disabledPathname';

import { BadgeProvider } from 'contexts/Badges';
import { ToastProvider } from 'contexts/Toast';

const pathname = window.location.pathname;

export function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <BadgeProvider>
          <Layout disabled={disabledPathname(pathname)}>
            <MainRoutes />
            <Footer />
            <ButtonTopPage />
          </Layout>
        </BadgeProvider>
      </BrowserRouter>
    </ToastProvider>
  );
}
