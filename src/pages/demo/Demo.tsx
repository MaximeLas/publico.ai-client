import "./Demo.css";

const Demo: React.FC = () => {
  return (
    <>
      <h1 className="center-align medium-text">Try our demo below!</h1>
      <div className="publico-demo-iframe-container">
        <iframe
          className="publico-demo-iframe"
          src="https://bac0c867871cf4ca17.gradio.live"
          title="Publico.ai Demo App"
        ></iframe>
      </div>
    </>
  );
};

export default Demo;
