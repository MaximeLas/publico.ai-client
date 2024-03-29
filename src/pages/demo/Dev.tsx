import styles from "./Demo.module.scss";

const Dev: React.FC = () => {
  return (
    <>
      <h1 className="center-align medium-text">
        Welcome in DEV Mode, thanks so much for improving the product... and the
        world at large!
      </h1>
      <div className={styles.publicoDemoIframeContainer}>
        <iframe
          className={styles.publicoDemoIframe}
          src="https://78e43c9e1a7be251e3.gradio.live"
          title="Publico.ai Dev Mode"
        ></iframe>
      </div>
    </>
  );
};

export default Dev;
