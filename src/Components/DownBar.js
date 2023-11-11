import styles from '../Styles/component/downBar.module.css'
export const DownBar = () => {
  return (
    <div className={styles.mainSponsor}>
      <img
        src={require("../assets/beirut beer.png")}
        className={styles.sponsorImage}
      />
      <img src={require("../assets/mtv.jpg")} className={styles.sponsorImage} />
      <img src={require("../assets/xxl.jpg")} className={styles.sponsorImage} />
    </div>
  );
};
