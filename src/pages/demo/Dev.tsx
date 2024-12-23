import "./Demo.css";

const Dev: React.FC = () => {
  return (
    <>
      <h1 className="center-align medium-text">Welcome in DEV Mode, thanks so much for improving the product... and the world!</h1>
      <div className="publico-demo-iframe-container">
        <iframe
          className="publico-demo-iframe"
          src="https://ac7505fcd32a11f974.gradio.live"
          title="Publico.ai Dev Mode"
        ></iframe>
      </div>
    </>
  );
};

export default Dev;
