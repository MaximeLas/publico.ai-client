import "./Demo.css";

const SeedsOfHope: React.FC = () => {
  return (
    <>
      <h1 className="center-align medium-text">Welcome, Seeds Of Hope!</h1>
      <div className="publico-demo-iframe-container">
        <iframe
          className="publico-demo-iframe"
          src="https://b6db57cd72f44e4487.gradio.live"
          title="Publico.ai Seeds Of Hope"
        ></iframe>
      </div>
    </>
  );
};

export default SeedsOfHope;
