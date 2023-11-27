import { React, useState } from "react";
import styles from "../Styles/component/listSearch.module.css";

export const ListSearch = ({ data }) => {
  return (
    <div className={styles.mainList}>
      {data.map((item) => (
        <div className={styles.listField} key={item.id}>
          <img src={item.image} className={styles.imageSearch} />
          <div className={styles.nameSearch}>{item.text}</div>
        </div>
      ))}
    </div>
  );
};
