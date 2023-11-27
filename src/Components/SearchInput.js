import React, { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import styles from "../Styles/component/searchInput.module.css";
import { ListSearch } from "./ListSearch";

export const SearchInput = ({ width }) => {
  const [inputText, setInputText] = useState("");
  const inputRef = useRef(null);

  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  useEffect(() => {
    function handleOutsideClick(event) {
      setInputText("");
    }
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const searchValue = [
    {
      id: 1,
      text: "VIRTUAL SOFTWARE DEVELOPMENT CONFERENCE",
      image: require("../assets/Party.jpg"),
    },
    {
      id: 2,
      text: "VIRTUAL SOFTWARE DEVELOPMENT CONFERENCE",
      image: require("../assets/Event1.jpeg"),
    },
    {
      id: 3,
      text: "VIRTUAL SOFTWARE DEVELOPMENT CONFERENCE",
      image: require("../assets/POSTER.jpeg"),
    },
    {
      id: 4,
      text: "VIRTUAL SOFTWARE DEVELOPMENT CONFERENCE",
      image: require("../assets/POSTER.jpeg"),
    },
    {
      id: 5,
      text: "VIRTUAL SOFTWARE DEVELOPMENT CONFERENCE",
      image: require("../assets/POSTER.jpeg"),
    },
    {
      id: 6,
      text: "Party",
      image: require("../assets/POSTER.jpeg"),
    },
  ];

  const filteredSearchValue = searchValue.filter((item) =>
    item.text.toLowerCase().includes(inputText)
  );

  return (
    <div className={styles.main} >
      <div className={styles.search}>
        <TextField
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          fullWidth
          label="Search"
        />
        <div className={styles.listSearchStyle}>
          {inputText ? <ListSearch data={filteredSearchValue} /> : null}
        </div>
      </div>
    </div>
  );
};
