import { FunctionComponent } from "react";
import styles from "./Notification1.module.css";

const Notification1: FunctionComponent = () => {
  return (
    <div className={styles.notification}>
      <img className={styles.icon} loading="eager" alt="" src="/icon.svg" />
      <div className={styles.text}>
        <div className={styles.div}>Уведомления</div>
        <div className={styles.div1}>10 новых</div>
      </div>
    </div>
  );
};

export default Notification1;
