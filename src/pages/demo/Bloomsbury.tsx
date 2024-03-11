import "./Demo.css";

const Bloomsbury: React.FC = () => {
  return (
    <>
      <h1 className="center-align medium-text">Welcome, Bloomsbury!</h1>
      <div className="publico-demo-iframe-container">
        <iframe
          className="publico-demo-iframe"
          src="https://bac0c867871cf4ca17.gradio.live"
          title="Publico.ai Bloomsbury"
        ></iframe>
      </div>
    </>
  );
};

export default Bloomsbury;
