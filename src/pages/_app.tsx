import '../styles/global.css';

import type { AppProps } from 'next/app';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorFallback from '@/pages/error-fallback';

const logError = (error: Error, info: { componentStack: string }) => {
  // eslint-disable-next-line no-console
  console.error(error);
  // eslint-disable-next-line no-console
  console.error(info);
};

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
    <Component {...pageProps} />
  </ErrorBoundary>
);

export default MyApp;
