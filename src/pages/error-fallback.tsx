import React from 'react';
import type { FallbackProps } from 'react-error-boundary';

import SubmitButton from '@/lib/common-ui/submit-button';

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => (
  <div role="alert">
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
    <SubmitButton onClick={resetErrorBoundary} text="try again"></SubmitButton>
  </div>
);

export default ErrorFallback;
