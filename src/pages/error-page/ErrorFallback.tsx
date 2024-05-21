import { Container, Card, Button } from 'react-bootstrap';
import styles from './ErrorFallback.module.scss';
import useStore from "../../hooks/state/useStore";
import ChatSessionDTO from "../../db/DTOs/ChatSessionDTO";
import useStoreApi from "../../hooks/state/useStoreApi";
import useDB from "../../hooks/useDB";
import { useEffect } from 'react';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  const user = useStore((state) => state.user);
  const { setState } = useStoreApi();
  const db = useDB();
  useEffect(() => {
    let isMounted = true;

    const fetchUserChatSessions = async () => {
      try {
        if (user) {
          const res = await db.getLastUserChatSession(user.uid);
          if (res) {
            const dto = ChatSessionDTO.toState(res);
            if (isMounted) {
              setState(dto);
          }
        }
      } 
    }
      catch (error) {
        console.error("Failed to fetch user chat sessions", error);
      }
    };

    fetchUserChatSessions();

    return () => {
      isMounted = false;
    };
  }, [user, db, setState]);
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
          }}>Try Again</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ErrorFallback;
