import useDB from "../../hooks/useDB";
import { useEffect, useState } from "react";
import useStore from "../../hooks/state/useStore";
import ChatSession from "../../db/Models/Chat/ChatSession";
import styles from "./GrantsCards.module.css";
import clsx from "clsx";
import ChatSessionDTO from "../../db/DTOs/ChatSessionDTO";
import useStoreApi from "../../hooks/state/useStoreApi";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Col,
  Container,
  Pagination,
  Row,
  InputGroup,
  FormControl,
  Button,
  Form,
} from "react-bootstrap";

const GrantsCards = () => {
  const db = useDB();
  const user = useStore((state) => state.user);
  const { setState } = useStoreApi();
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activePage, setActivePage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState("Created Time");
  const [sortOrder, setSortOrder] = useState("desc");
  const clsn = clsx("h-100", styles.card);
  const sessionsPerPage = 15;

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

  const handleDeleteSession = (session: ChatSession) => {
    db.deleteSession(session.id).then(() => {
      setSessions(sessions.filter((s) => s.id !== session.id));
    });
  };

  useEffect(() => {
    if (!user) return;
    db.getUserChatSessions(user.uid).then((res) => {
      setSessions(res.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis()));
    });
  }, [user]);

  useEffect(() => {
    if (!filteredSessions.length && activePage !== 1) {
      goToFirstPage();
    }
  }, [searchTerm, filteredSessions.length, activePage]);

  useEffect(() => {
    let sortedSessions = [...sessions];

    if (sortBy === "Created Time") {
      sortedSessions.sort((a, b) =>
        sortOrder === "asc"
          ? a.createdAt.toMillis() - b.createdAt.toMillis()
          : b.createdAt.toMillis() - a.createdAt.toMillis()
      );
    } else if (sortBy === "Edited Time") {
      sortedSessions.sort((a, b) => {
        const lastEditedA = a["messages"][a["messages"].length - 1].createdAt.toMillis();
        const lastEditedB = b["messages"][b["messages"].length - 1].createdAt.toMillis();
        return sortOrder === "asc" ? lastEditedA - lastEditedB : lastEditedB - lastEditedA;
      }
      );
    } else if (sortBy === "alphabetical") {
      sortedSessions.sort((a, b) =>
        sortOrder === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title)
      );
    }

    setSessions(sortedSessions);
    goToFirstPage();
  }, [sortBy, sortOrder]);

  return (
    <div className={styles.scrollableContainer}>
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
                variant="light"
                onClick={() => setSearchTerm("")}
              >        
                Clear
              </Button>
            </InputGroup>
          </Col>
        </Row>
        <Form className="d-flex align-items-center mb-3">
          <Form.Label className={styles.sortTitle}>Sort the results by:</Form.Label>
          <Form.Select
            className={styles.sortSelect}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="Created Time">Created Time</option>
            <option value="Edited Time">Edited Time</option>
            <option value="alphabetical">Alphabetical</option>
          </Form.Select>
          <Form.Select
            className={styles.sortSelect}
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </Form.Select>
        </Form>

        <Row xs={1} lg={3} className="g-4">
          {currentSessions.map((session, index) => (
            <Col key={index}>
              <Card className={clsn} style={{ backgroundColor: "#F3F9F1" }}>
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <div>
                    <Card.Title
                      style={{ color: "#116466", fontSize: "1.25rem" }}
                    >
                      Title: <strong>{session.title}</strong>
                    </Card.Title>
                    {"messages" in session && (
                      <Card.Text style={{ color: "#116466" , "fontSize": "1rem"}}>
                        Last Edit:{" "}
                        {session["messages"][
                          session["messages"].length - 1
                        ].createdAt
                          .toDate()
                          .toLocaleString()}
                          <br />
                          Created Time: {session.createdAt.toDate().toLocaleString()}
                      </Card.Text>
                    )}
                  </div>
                  <div>
                    <Button
                      onClick={() => {
                        const dto = ChatSessionDTO.toState(session);
                        setState(dto);
                        navigate("/demo");
                      }}
                      className={styles.openButton}
                    >
                      Open Session
                    </Button>
                    <Button
                      variant="danger"
                      className={styles.deleteButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteSession(session);
                      }}
                    >
                      Delete Session
                    </Button>
                  </div>
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
    </div>
  );
};

export default GrantsCards;