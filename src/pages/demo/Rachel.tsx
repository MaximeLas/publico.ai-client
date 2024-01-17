import "./Demo.css";

const Rachel: React.FC = () => {
  return (
    <>
      <h1 className="center-align medium-text">Welcome, Rachel!</h1>
      <div className="publico-demo-iframe-container">
        <iframe
          className="publico-demo-iframe"
          src="https://a372acf75e18fa51d3.gradio.live"
          title="Publico.ai Rachel"
        ></iframe>
      </div>
    </>
  );
};

export default Rachel;
