import { Button, Card } from "react-bootstrap";
import Chat from "../../components/chat/Chat";
import styles from "./Demo.module.scss";

const Demo: React.FC = () => {
  return (
    <div className="text-left mx-4 h-100 mh-100 d-flex flex-column">
      <div className="d-flex flex-wrap justify-content-start mb-2 px-3 py-2">
        <h1 className="mb-0 me-2">DoGood Grant_2023</h1>
        <span className="d-flex flex-grow-1 mt-auto">
          <p className="mb-0">
            <strong>Version</strong>
          </p>
          <p className="mb-0">- Dec 30, 2023</p>
        </span>
        <span className="mt-auto">
          <Button size="sm" className="me-1 rounded-5 px-4">
            View Mode
          </Button>
          <Button
            size="sm"
            variant="outline-primary"
            className="rounded-5 px-4"
          >
            Edit Mode
          </Button>
        </span>
      </div>
      {/* <span
        style={{
          display: "block",
          width: "100%",
          height: "1px",
          backgroundColor: "grey",
        }}
      /> */}
      <div className={styles.content}>
        <Chat />
        <div className={styles.questionsWrapper}>
          <Card>
            <Card.Header className="fw-bold">Question 1</Card.Header>
            <Card.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum. Pri
              posse graeco definitiones cu, id eam populo quaestio adipiscing,
              usu quod malorum te. Offendit eleifend moderatius ex vix, quem
              odio mazim et qui, purto expetendis cotidieque quo cu, veri
              persius vituperata ei nec. Scripta periculis ei eam, te pro movet
              reformidans. Pri posse graeco definitiones cu, id eam populo
              quaestio adipiscing, usu quod malorum te. Offendit eleifend
              moderatius ex vix, quem odio mazim et qui, purto expetendis
              cotidieque quo cu, veri persius vituperata ei nec. Quot populo ad
              qui. Quot populo ad qui. Scripta periculis ei eam, te pro movet
              reformidans. Ad per diam dicant interesset, lorem iusto sensibus
              ut sed. Pri posse graeco definitiones cu, id eam populo quaestio
              adipiscing, usu quod malorum te. Pri posse graeco definitiones cu,
              id eam populo quaestio adipiscing, usu quod malorum te. Pri posse
              graeco definitiones cu, id eam populo quaestio adipiscing, usu
              quod malorum te. moderatius ex vix, quem odio mazim et qui, purto
              expetendis cotidieque quo cu, veri persius vituperata ei nec. Quot
              populo ad qui. Quot populo ad qui. Scripta periculis ei eam, te
              pro movet reformidans. Ad per diam dicant interesset, lorem iusto
              sensibus ut sed. Pri posse graeco definitiones cu, id eam populo
              quaestio adipiscing, usu quod malorum te. Pri posse graeco
              definitiones cu, id eam populo quaestio adipiscing, usu quod
              malorum te. Pri posse graeco definitiones cu, id eam populo
              quaestio adipiscing, usu quod malorum te. moderatius ex vix, quem
              odio mazim et qui, purto expetendis cotidieque quo cu, veri
              persius vituperata ei nec. Quot populo ad qui. Quot populo ad qui.
              Scripta periculis ei eam, te pro movet reformidans. Ad per diam
              dicant interesset, lorem iusto sensibus ut sed. Pri posse graeco
              definitiones cu, id eam populo quaestio adipiscing, usu quod
              malorum te. Pri posse graeco definitiones cu, id eam populo
              quaestio adipiscing, usu quod malorum te. Pri posse graeco
              definitiones cu, id eam populo quaestio adipiscing, usu quod
              malorum te.
            </Card.Body>
            <Card.Header>Question 2</Card.Header>
            <Card.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum. Pri
              posse graeco definitiones cu, id eam populo quaestio adipiscing,
              usu quod malorum te. Offendit eleifend moderatius ex vix, quem
              odio mazim et qui, purto expetendis cotidieque quo cu, veri
              persius vituperata ei nec. Scripta periculis ei eam, te pro movet
              reformidans. Pri posse graeco definitiones cu, id eam populo
              quaestio adipiscing, usu quod malorum te. Offendit eleifend
              moderatius ex vix, quem odio mazim et qui, purto expetendis
              cotidieque quo cu, veri persius vituperata ei nec. Quot populo ad
              qui. Quot populo ad qui. Scripta periculis ei eam, te pro movet
              reformidans. Ad per diam dicant interesset, lorem iusto sensibus
              ut sed. Pri posse graeco definitiones cu, id eam populo quaestio
              adipiscing, usu quod malorum te. Pri posse graeco definitiones cu,
              id eam populo quaestio adipiscing, usu quod malorum te. Pri posse
              graeco definitiones cu, id eam populo quaestio adipiscing, usu
              quod malorum te. moderatius ex vix, quem odio mazim et qui, purto
              expetendis cotidieque quo cu, veri persius vituperata ei nec. Quot
              populo ad qui. Quot populo ad qui. Scripta periculis ei eam, te
              pro movet reformidans. Ad per diam dicant interesset, lorem iusto
              sensibus ut sed. Pri posse graeco definitiones cu, id eam populo
              quaestio adipiscing, usu quod malorum te. Pri posse graeco
              definitiones cu, id eam populo quaestio adipiscing, usu quod
              malorum te. Pri posse graeco definitiones cu, id eam populo
              quaestio adipiscing, usu quod malorum te. moderatius ex vix, quem
              odio mazim et qui, purto expetendis cotidieque quo cu, veri
              persius vituperata ei nec. Quot populo ad qui. Quot populo ad qui.
              Scripta periculis ei eam, te pro movet reformidans. Ad per diam
              dicant interesset, lorem iusto sensibus ut sed. Pri posse graeco
              definitiones cu, id eam populo quaestio adipiscing, usu quod
              malorum te. Pri posse graeco definitiones cu, id eam populo
              quaestio adipiscing, usu quod malorum te. Pri posse graeco
              definitiones cu, id eam populo quaestio adipiscing, usu quod
              malorum te.
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Demo;
