import { React, useState } from "react";
import styles from "../Styles/component/listSearch.module.css";
import { Link } from "react-router-dom";

export const ListSearch = ({ data }) => {
  return (
    <div className={styles.mainList}>
      {data.map((item) => (
        <Link
          to={"/EventInfo"}
          className={styles.mainList}
          state={{ eventID: item.eventID }}
        >
          <div className={styles.listField} key={item.eventID}>
            <img
              src={require(`../assets/${item.eventImage}`)}
              className={styles.imageSearch}
            />
            <div className={styles.nameSearch}>{item.eventName}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};
