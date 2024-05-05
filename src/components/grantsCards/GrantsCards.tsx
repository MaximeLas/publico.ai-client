import useDB from "../../hooks/useDB";
import { useEffect, useState } from "react";
import useStore from "../../hooks/state/useStore";
import ChatSession from "../../db/Models/Chat/ChatSession";
import styles from "./GrantsCards.module.css";
import clsx from "clsx";
import {
  Card,
  Col,
  Container,
  Pagination,
  Row,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";


const GrantsCards = () => {
  const db = useDB();
  const user = useStore((state) => state.user);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activePage, setActivePage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const clsn = clsx("h-100", styles.card);
  const sessionsPerPage = 15;

  useEffect(() => {
    if (!user) return;

    db.getUserChatSessions(user.uid).then((res) => {
      setSessions(res);
    });
  }, [user]);

  const indexOfLastSession = activePage * sessionsPerPage;
  const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
  const filteredSessions = sessions.filter((session) =>
    session.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentSessions = filteredSessions.slice(
    indexOfFirstSession,
    indexOfLastSession
  );

  const paginate = (pageNumber: number) => {
    setActivePage(pageNumber);
  };

  const goToFirstPage = () => {
    setActivePage(1);
  };

  const goToLastPage = () => {
    const totalPages = Math.ceil(filteredSessions.length / sessionsPerPage);
    setActivePage(totalPages);
  };

  useEffect(() => {
    if (!filteredSessions.length && activePage !== 1) {
      goToFirstPage();
    }
  }, [searchTerm, filteredSessions.length, activePage]);

  return (
    <Container fluid className="py-4">
      <Row className="mb-3">
        <Col className="d-flex justify-content-center">
          <InputGroup>
            <FormControl
              placeholder="Search by title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.search}            
              />
            <Button
              variant="outline-secondary"
              onClick={() => setSearchTerm("")}
            >
              Clear
            </Button>
          </InputGroup>
        </Col>
      </Row>
      <Row xs={1} lg={3} className="g-4">
        {currentSessions.map((session, index) => (
          <Col key={index}>
            <Card className={clsn} style={{ backgroundColor: "#F3F9F1" }}>
              <Card.Body>
                <Card.Title style={{ color: "#116466", fontSize: "1.25rem" }}>
                  {session.title}
                </Card.Title>
                <Card.Text style={{ color: "#116466" }}>Created At: {session.createdAt.toDate().toLocaleString()}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Row className="mt-4">
        <Col className="d-flex justify-content-center">
          <Pagination>
            <Pagination.First
              onClick={goToFirstPage}
              disabled={activePage === 1}
            />
            <Pagination.Prev
              onClick={() => paginate(activePage - 1)}
              disabled={activePage === 1}
            />
            {Array.from({
              length: Math.ceil(filteredSessions.length / sessionsPerPage),
            }).map((_, index) => (
              <Pagination.Item
                key={index}
                active={index + 1 === activePage}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => paginate(activePage + 1)}
              disabled={
                activePage ===
                Math.ceil(filteredSessions.length / sessionsPerPage)
              }
            />
            <Pagination.Last
              onClick={goToLastPage}
              disabled={
                activePage ===
                Math.ceil(filteredSessions.length / sessionsPerPage)
              }
            />
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
};

export default GrantsCards;
