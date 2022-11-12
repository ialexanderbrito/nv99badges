import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { App } from './App';

const queryClient = new QueryClient();

const devtools = process.env.NODE_ENV === 'development' && (
  <ReactQueryDevtools initialIsOpen={false} />
);

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {devtools}
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
