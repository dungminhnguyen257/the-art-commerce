import '../styles/global.css';

import type { AppProps } from 'next/app';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorFallback from '@/pages/error-fallback';

const logError = (error: Error, info: { componentStack: string }) => {
  // eslint-disable-next-line no-console
  console.error(error);
  // eslint-disable-next-line no-console
  console.error(info);
};

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) => (
  <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  </ErrorBoundary>
);

export default MyApp;
