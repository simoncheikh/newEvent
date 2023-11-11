import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import styles from "../Styles/component/searchInput.module.css";
import { ListSearch } from "./ListSearch";

export const SearchInput = () => {
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const searchValue = [
    { id: 1, text: "sadas" },
    { id: 2, text: "sadas" },
    { id: 3, text: "sadas" },
    { id: 4, text: "sadas" },
    { id: 5, text: "sadas" },
    { id: 6, text: "sadas" },
  ];
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
        <div className={styles.listSearchStyle}>
          {inputText ? <ListSearch data={searchValue} /> : null}
        </div>
      </div>
    </div>
  );
};
