import { React, useState } from "react";
import styles from "../Styles/component/listSearch.module.css";

export const ListSearch = ({ data }) => {
  return (
    <div className={styles.mainList}>
      {data.map((item) => (
        <div className={styles.listField} key={item.id}>
          {item.text}
        </div>
      ))}
    </div>
  );
};
