import "./Demo.css";

const Demo: React.FC = () => {
  return (
    <>
      <h1 className="center-align medium-text">Try our demo below!</h1>
      <div className="publico-demo-iframe-container">
        <iframe
          className="publico-demo-iframe"
          src="https://a454833fd5a6d3a79b.gradio.live"
          title="Publico.ai Demo App"
        ></iframe>
      </div>
    </>
  );
};

export default Demo;