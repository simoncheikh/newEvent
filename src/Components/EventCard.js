import styles from "../Styles/component/eventCard.module.css";
import { IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link } from "react-router-dom";

export const EventCard = ({
  width,
  title,
  date,
  status,
  location,
  fees,
  tickets,
  marginBottom,
}) => {
  return (
    <Link
      to={"/EventInfo"}
      className={styles.mainEventCard}
      style={{ width: width, marginBottom: marginBottom }}
    >
      <img src={require("../assets/Party.jpg")} className={styles.cardImage} />
      <div className={styles.mainActionButton}>
        <IconButton
          className={styles.favoriteButton}
          onClick={(e) => e.preventDefault()}
        >
          <FavoriteBorderIcon />
        </IconButton>
      </div>
      <div className={styles.cardInformation}>
        <div className={styles.mainTitle}>{title}</div>
        <div className={styles.mainDate}>{date}</div>
        <div className={styles.mainLocation}>
          {status} • {location}
        </div>
        <div className={styles.mainCharge}>{fees}</div>
        <div className={styles.mainTicketsLeft}>{tickets}</div>
      </div>
    </Link>
  );
};
