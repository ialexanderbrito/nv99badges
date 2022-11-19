import { BrowserRouter } from 'react-router-dom';

import { MainRoutes } from 'routes';

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
          </Layout>
        </BadgeProvider>
      </BrowserRouter>
    </ToastProvider>
  );
}
