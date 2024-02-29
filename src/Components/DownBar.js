import styles from '../Styles/component/downBar.module.css'
export const DownBar = () => {
  return (
    <div className={styles.mainSponsor}>
      <img src={require("../assets/aut.jpg")} className={styles.sponsorImage} />
    </div>
  );
};
