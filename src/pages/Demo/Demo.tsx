import "./Demo.css";

const Demo = () => {
  return (
    <div className="demo">
      <h1 className="center-align medium-text">Try our demo below!</h1>
      <div className="publico-demo-iframe-container">
        <iframe
          className="publico-demo-iframe"
          src="https://b1f628c49edc20ccba.gradio.live"
          title="Publico.ai Demo App"
        ></iframe>
      </div>
    </div>
  );
};

export default Demo;
