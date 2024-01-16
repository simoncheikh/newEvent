import React, { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import styles from "../Styles/component/searchInput.module.css";
import { ListSearch } from "./ListSearch";

export const SearchInput = ({ width }) => {
  const [inputText, setInputText] = useState("");
  const [event, setEvent] = useState([]);
  const [loading, setLoading] = useState(true);
  const listSearchRef = useRef(null);

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
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      setLoading(false);
    }
  };

  const inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  useEffect(() => {
    function handleOutsideClick(event) {
      if (listSearchRef.current && !listSearchRef.current.contains(event.target)) {
        setInputText("");
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    getEvent();

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const filteredSearchValue = event.filter((item) =>
    (item.eventName?.toLowerCase() || "").includes(inputText)
  );

  return (
    <div className={styles.main}>
      <div className={styles.search}>
        <TextField
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          fullWidth
          label="Search"
        />
        <div className={styles.listSearchStyle} ref={listSearchRef}>
          {inputText && !loading ? (
            <ListSearch data={filteredSearchValue} />
          ) : null}
        </div>
      </div>
    </div>
  );
};
