import { ErrorBoundary } from 'react-error-boundary'

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

window.onerror = function (message, source, lineno, colno, error) {
  // Customize this logic to handle or suppress specific errors
  console.error('Global error handler:', message, source, lineno, colno, error);
  return true; // Prevent the default handling of the error
};

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

export default ErrorFallback;