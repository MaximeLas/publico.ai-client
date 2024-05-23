import { Container, Card, Button } from "react-bootstrap";
import styles from "./ErrorFallback.module.scss";
import useStore from "../../hooks/state/useStore";
import ChatSessionDTO from "../../db/DTOs/ChatSessionDTO";
import useStoreApi from "../../hooks/state/useStoreApi";
import useDB from "../../hooks/useDB";
import { useEffect } from "react";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  const currentChatSession = useStore((state) => state.currentChatSession);
  const user = useStore((state) => state.user);
  const { setState } = useStoreApi();
  const db = useDB();
  useEffect(() => {
    let isMounted = true;

    const fetchUserChatSessions = async () => {
      try {
        if (user) {
          const res = await db.getUserChatSessions(user.uid);
          for (let i = 0; i < res.length; i++) {
            if (res[i]?.id === currentChatSession?.id) {
              const dto = ChatSessionDTO.toState(res[i]);
              if (isMounted) {
                setState(dto);
              }
              break;
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
  }, [user, db, currentChatSession, setState]);
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
          <Button
            className={styles.animatedButton}
            variant="success"
            onClick={async () => {
              resetErrorBoundary();
            }}
          >
            Try Again
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ErrorFallback;
