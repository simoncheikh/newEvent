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
  height,
  data,
  image,
  onClick,
}) => {
  return (
    <Link
      to={"/EventInfo"}
      className={styles.mainEventCard}
      style={{ width: width, marginBottom: marginBottom, height }}
      state={data}
    >
      <img src={image} className={styles.cardImage} />
      <div className={styles.mainActionButton}>
        <IconButton className={styles.favoriteButton} onClick={onClick}>
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
