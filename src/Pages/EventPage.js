import { Button } from "@mui/material";
import styles from "../Styles/eventPage.module.css";
import { Link } from "react-router-dom";
import { EventCard } from "../Components/EventCard";

export const EventPage = () => {
  return (
    <div className={`${styles.mainPageEvent} page`}>
      <EventCard/>
      
    </div>
  );
};
