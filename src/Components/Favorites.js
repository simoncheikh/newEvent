import { TextField } from "@mui/material";
import styles from "../Styles/component/favorites.module.css";
import { EventCard } from "./EventCard";
import { useEffect, useState } from "react";

export const Favorites = () => {
  const [favEvent, setFavEvent] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/profile/add-fav-event/1",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setFavEvent(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  console.log(favEvent)

  return (
    <div className={styles.mainFavorites}>
      <EventCard 

      
      
      />
    </div>
  );
};
