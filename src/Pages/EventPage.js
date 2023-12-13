import { Button, Pagination } from "@mui/material";
import styles from "../Styles/eventPage.module.css";
import { EventCard } from "../Components/EventCard";
import { TopBar } from "../Components/TopBar";
import { useEffect, useState } from "react";
import { SearchInput } from "../Components/SearchInput";
import { DownBar } from "../Components/DownBar";
import { Warning } from "../Components/Warning";

export const EventPage = () => {
  const [sortByPrice, setSortByPrice] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [event, setEvent] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [warningText, setWarningText] = useState({});

  const itemsPerPage = 8;

  useEffect(() => {
    getEvent();
  }, []);

  const getEvent = async () => {
    try {
      const response = await fetch("http://localhost:3001/event_getAll", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setEvent(data);
    } catch (error) {
      setShowAlert(true);
      setWarningText({
        severity: "error",
        label: error.message,
        error,
      });
    }
  };

  const insertFavEvent = async (eventID, userID) => {
    try {
      const response = await fetch("http://localhost:3001/profile/fav-event", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventID: eventID,
          userID: userID,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setWarningText({
        severity: "success",
        label: "Favorite event inserted successfully",
      });
    } catch (error) {
      setWarningText({
        severity: "error",
        label: error.message,
      });
    }
    setShowAlert(true);
  };

  const sortedEventCardValue = sortByPrice
    ? [...event].sort((a, b) => a.eventPrice - b.eventPrice)
    : event;

  const totalItems = sortedEventCardValue.length;

  const indexOfLastItem = Math.min(currentPage * itemsPerPage, totalItems);
  const indexOfFirstItem = Math.max((currentPage - 1) * itemsPerPage, 0);

  const currentItems = sortedEventCardValue.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const originalDate = (formattedDate) => {
    const date = new Date(`${formattedDate}`);
    return date.toDateString();
  };

  return (
    <div className={`${styles.mainPageEvent} page`}>
      <div className={styles.topBarStyle}>
        <TopBar />
        <Warning
          onClick={() => setShowAlert(false)}
          collapseIn={showAlert}
          alertProps={warningText}
        />
      </div>
      <br />

      <div className={styles.eventPageContainer}>
        <h2>Discover your Events</h2>
        <div className={styles.mainSearchInput}>
          <SearchInput />
          <Button
            onClick={() => setSortByPrice(!sortByPrice)}
            className={styles.sortBtn}
          >
            {sortByPrice ? "Sort by Default" : "Sort by Price"}
          </Button>
        </div>
        <div className={styles.eventCardStyle}>
          {currentItems.map((value) => (
            <EventCard
              key={value.eventID}
              title={value.eventName}
              date={originalDate(value.eventDate)}
              // status={value.status}
              location={value.eventLocation}
              fees={
                value.eventPrice == "free"
                  ? `${value.eventPrice}`
                  : ` ${value.eventPrice}$`
              }
              image={require(`../assets/${value.eventImage}`)}
              tickets={value.eventTicket + " Tickets"}
              width={"23.8%"}
              marginBottom={"2%"}
              height={"50vh"}
              data={{ eventID: value.eventID }}
              onClick={(e) => {
                e.preventDefault();
                insertFavEvent(value.eventID, value.userID);
              }}
            />
          ))}
          <div className={styles.mainPagination}>
            <Pagination
              count={Math.ceil(totalItems / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
      <DownBar />
    </div>
  );
};
