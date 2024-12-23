import "./Demo.css";

const Demo: React.FC = () => {
  return (
    <>
      <h1 className="center-align medium-text">Try our demo below!</h1>
      <div className="publico-demo-iframe-container">
        <iframe
          className="publico-demo-iframe"
          src="https://7877f4c01ffd2128f0.gradio.live"
          title="Publico.ai Demo App"
        ></iframe>
      </div>
    </>
  );
};

export default Demo;
