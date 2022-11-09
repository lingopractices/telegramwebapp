import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'store/store';

import App from './App';

if (import.meta.env.PROD) {
  Sentry.init({
    dsn: 'https://46c75db02bda47c1ad796f448cbff55a@o1398049.ingest.sentry.io/4504125184475136',
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);
