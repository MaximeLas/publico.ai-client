import { Container, Card, Button } from 'react-bootstrap';
import styles from './ErrorFallback.module.scss';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <Container className={styles.container}>
      <Card className={styles.card}>
        <Card.Header className={styles.cardHeader}>
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          Oops! Something went wrong
        </Card.Header>
        <Card.Body className={styles.cardBody}>
          <Card.Text className={styles.errorMessage}>
            Something went wrong:
          </Card.Text>
          <pre className={styles.preformattedText}>{error.message}</pre>
          <Button className={styles.animatedButton} variant="success" onClick={() => {
            resetErrorBoundary();
            window.location.reload();
          }}>Try Again</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ErrorFallback;
