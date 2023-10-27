import { Button } from "@mui/material";
import styles from "../Styles/eventPage.module.css";
import { Link } from "react-router-dom";

export const EventPage = () => {
  return (
    <div className={`${styles.mainPageEvent} page`}>
      <Link to="/">
        <Button variant="contained">dsadasd</Button>
      </Link>
    </div>
  );
};
