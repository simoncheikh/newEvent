import { Button, Pagination } from "@mui/material";
import styles from "../Styles/eventPage.module.css";
import { EventCard } from "../Components/EventCard";
import { TopBar } from "../Components/TopBar";
import { Dropdown } from "../Components/Dropdown";
import { useState } from "react";
import { SearchInput } from "../Components/SearchInput";
import { DownBar } from "../Components/DownBar";

const eventCardValue = [
  {
    id: 1,
    title: "VIRTUAL SOFTWARE DEVELOPMENT CONFERENCE",
    date: "Wed, Nov 15, 10:00 AM",
    status: "Online",
    location: "Beirut, 98000",
    fees: 9,
    tickets: "10 Tickets Left",
  },
  {
    id: 2,
    title: "VIRTUAL SOFTWARE DEVELOPMENT CONFERENCE",
    date: "Wed, Nov 15, 10:00 AM",
    status: "Online",
    location: "Beirut, 98000",
    fees: 1,
    tickets: "10 Tickets Left",
  },
  {
    id: 3,
    title: "VIRTUAL SOFTWARE DEVELOPMENT CONFERENCE",
    date: "Wed, Nov 15, 10:00 AM",
    status: "Online",
    location: "Beirut, 98000",
    fees: 10,
    tickets: "10 Tickets Left",
  },
  {
    id: 4,
    title: "VIRTUAL SOFTWARE DEVELOPMENT CONFERENCE",
    date: "Wed, Nov 15, 10:00 AM",
    status: "Online",
    location: "Beirut, 98000",
    fees: 11,
    tickets: "10 Tickets Left",
  },
  {
    id: 5,
    title: "VIRTUAL SOFTWARE DEVELOPMENT CONFERENCE",
    date: "Wed, Nov 15, 10:00 AM",
    status: "Online",
    location: "Beirut, 98000",
    fees: 19,
    tickets: "10 Tickets Left",
  },
  {
    id: 6,
    title: "VIRTUAL SOFTWARE DEVELOPMENT CONFERENCE",
    date: "Wed, Nov 15, 10:00 AM",
    status: "Online",
    location: "Beirut, 98000",
    fees: 25,
    tickets: "10 Tickets Left",
  },
  {
    id: 7,
    title: "VIRTUAL SOFTWARE DEVELOPMENT CONFERENCE",
    date: "Wed, Nov 15, 10:00 AM",
    status: "Online",
    location: "Beirut, 98000",
    fees: 100,
    tickets: "10 Tickets Left",
  },
  {
    id: 8,
    title: "VIRTUAL SOFTWARE DEVELOPMENT CONFERENCE",
    date: "Wed, Nov 15, 10:00 AM",
    status: "Online",
    location: "Beirut, 98000",
    fees: 110,
    tickets: "10 Tickets Left",
  },
  {
    id: 9,
    title: "dasdadasda",
    date: "Wed, Nov 15, 10:00 AM",
    status: "Online",
    location: "Beirut, 98000",
    fees: 110,
    tickets: "10 Tickets Left",
  },
];

export const EventPage = () => {
  const [sortByPrice, setSortByPrice] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const sortedEventCardValue = sortByPrice
    ? [...eventCardValue].sort((a, b) => a.fees - b.fees)
    : eventCardValue;

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
              key={value.id}
              title={value.title}
              date={value.date}
              status={value.status}
              location={value.location}
              fees={value.fees + "$"}
              tickets={value.tickets}
              width={"23.8%"}
              marginBottom={"2%"}
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
