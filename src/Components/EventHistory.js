import { useEffect, useState } from "react";
import styles from "../Styles/component/eventHistory.module.css";

export const EventHistory = () => {
  const [userData, setUserData] = useState(null);
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/get-user-info", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setUserData(data.userID);
        if (data.error) {
          console.error("Error fetching userID:", data.error);
        } else {
          getHistoryEvent(data.userID);
        }
      } catch (error) {
        console.error("Error fetching userID:", error);
      }
    };
    fetchData();
  }, []);

  const getHistoryEvent = async (userID) => {
    try {
      const response = await fetch(
        `http://localhost:3001/profile/history_event/${userID}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setEventData(...data);
    } catch (error) {
      console.error("Error fetching userID:", error);
    }
  };

  return (
    <div
      className={styles.mainEventHistory}
      style={{ boxShadow: eventData?.orderName == null ? "none" : "0px 1px #161855;" }}
    >
      <div className={styles.eventRow}>
        <div>{eventData?.orderName}</div>
        <div>
          {eventData?.orderQuantity == null ? "" : "x"}
          {eventData?.orderQuantity}
        </div>
        <div>
          {eventData?.orderPrice}
          {eventData?.price == null ? "" : "$"}
        </div>
        <div>
          {eventData?.orderTotalPrice}
          {eventData?.orderTotalPrice == null ? "" : "$"}
        </div>
      </div>
    </div>
  );
};
