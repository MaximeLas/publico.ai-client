import "./TryIt.css";

const TryIt = () => {
  return (
    <div className="try-it">
      <h1 className="center-align medium-text">Try it below!</h1>
      <div className="publico-demo-iframe-container">
        <iframe
          className="publico-demo-iframe"
          src="http://ec2-54-153-106-76.us-west-1.compute.amazonaws.com:7860/"
          title="Publico.ai Demo App"
        ></iframe>
      </div>
    </div>
  );
};

export default TryIt;
