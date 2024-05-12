import React from "react";
import styles from "./EndSessionPopUp.module.css"; 
import { useNavigate } from "react-router-dom";
import useStore from "../../hooks/state/useStore";
import useFetchAndSaveSession from "../../hooks/helpers/useFetchAndSaveSession";



interface PopupProps {
  onClose: () => void;
}

const EndSessionPopUp: React.FC<PopupProps> = ({ onClose }) => {
    const navigate = useNavigate();
    const clearChatSession = useStore((state) => state.clearChatSession);
    const fetchAndSaveSession = useFetchAndSaveSession();

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h2>Session Ended Successfully</h2>
        <p>All tasks were completed successfully.</p>
        <div className={styles.buttons}>
          <button className={styles.dashboardButton} onClick={ () => {
            onClose();
            clearChatSession();
            navigate("/dashboard");
          }}>
            Go to the Dashboard
          </button>
          <button className={styles.newGrantButton} onClick={ () => {
            onClose();
            clearChatSession();
            fetchAndSaveSession();
            navigate("/demo");
          }}>
            Start a New Grant
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndSessionPopUp;
