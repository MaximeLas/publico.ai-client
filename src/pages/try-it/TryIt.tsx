import "./TryIt.css";

const TryIt = () => {
  return (
    <div className="try-it">
      <h1 className="center-align medium-text">Try it below!</h1>
      <div className="publico-demo-iframe-container">
        <iframe
          className="publico-demo-iframe"
          src="https://f3c897ed632845224e.gradio.live"
          title="Publico.ai Demo App"
        ></iframe>
      </div>
    </div>
  );
};

export default TryIt;
