import styles from "./Demo.module.scss";

const Bloomsbury: React.FC = () => {
  return (
    <>
      <h1 className={`center-align ${styles.mediumText}`}>
        Welcome, Bloomsbury!
      </h1>
      <div className={styles.publicoDemoIframeContainer}>
        <iframe
          src="https://bac0c867871cf4ca17.gradio.live"
          className={styles.publicoDemoIframe}
          title="Publico.ai Bloomsbury"
        ></iframe>
      </div>
    </>
  );
};

export default Bloomsbury;
