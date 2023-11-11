import { Button } from "@mui/material";
import styles from "../Styles/eventPage.module.css";
import { EventCard } from "../Components/EventCard";
import { TopBar } from "../Components/TopBar";
import { Dropdown } from "../Components/Dropdown";
import { useState } from "react";
import { SearchInput } from "../Components/SearchInput";
import { DownBar } from "../Components/DownBar";

export const EventPage = () => {

  return (
    <div className={`${styles.mainPageEvent} page`}>
      <div className={styles.topBarStyle}>
        <TopBar />
      </div>
      <br />

      <div className={styles.eventPageContainer}>
        <h2>Discover your Events</h2>
        <div className={styles.mainSearchInput}>
          <SearchInput />
        </div>
        <div className={styles.eventCardStyle}>
          <EventCard width={"23.8%"} />
          <EventCard width={"23.8%"} />
          <EventCard width={"23.8%"} />
          <EventCard width={"23.8%"} />
          <EventCard width={"23.8%"} />
          <EventCard width={"23.8%"} />
        </div>
      </div>
      <DownBar/>
    </div>
  );
};
