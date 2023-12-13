import styles from "../Styles/component/eventHistory.module.css";

export const EventHistory = () => {
  return (
    <div className={styles.mainEventHistory}>
      <div className={styles.eventRow}>
        <img
          src={require("../assets/Event1.jpeg")}
          className={styles.eventImage}
        />
        <div>dsadas</div>
        <div>dsadas</div>
        <div>dsadas</div>
      </div>
    </div>
  );
};
