import styles from "../Styles/component/eventCard.module.css";
import { IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export const EventCard = () => {
  return (
    <div className={styles.mainEventCard}>
      <img src={require("../assets/Party.jpg")} className={styles.cardImage} />
      <div className={styles.mainActionButton}>
        <IconButton className={styles.favoriteButton}>
          <FavoriteBorderIcon />
        </IconButton>
      </div>
      <div className={styles.cardInformation}>
        <div className={styles.mainTitle}>
          VIRTUAL SOFTWARE DEVELOPMENT CONFERENCE
        </div>
        <div className={styles.mainDate}>Wed, Nov 15, 10:00 AM</div>
        <div className={styles.mainLocation}>Online • Beirut, 98000</div>
        <div className={styles.mainCharge}>Free</div>
        <div className={styles.mainTicketsLeft}>10 Tickets Left</div>
      </div>
    </div>
  );
};
