import "./Demo.css";

const Bloomsbury: React.FC = () => {
  return (
    <>
      <h1 className="center-align medium-text">Welcome, Bloomsbury!</h1>
      <div className="publico-demo-iframe-container">
        <iframe
          className="publico-demo-iframe"
          src="https://b6db57cd72f44e4487.gradio.live"
          title="Publico.ai Bloomsbury"
        ></iframe>
      </div>
    </>
  );
};

export default Bloomsbury;
