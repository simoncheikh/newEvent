import { TextField } from "@mui/material";
import styles from "../Styles/component/myAccount.module.css";
import { useEffect, useState } from "react";

export const MyAccount = () => {
  const [userData, setUserData] = useState([]);
  const [getUserID, setGetUserID] = useState([]);

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
        if (data.error) {
          console.error("Error fetching userID:", data.error);
        } else {
          getUserInfo(data.userID);
          setGetUserID(data.userID);
        }
      } catch (error) {
        console.error("Error fetching userID:", error);
      }
    };
    fetchData();
  }, []);
  const getUserInfo = async (userID) => {
    try {
      const response = await fetch(
        `http://localhost:3001/profile/user_profile/${userID}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setUserData(...data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.mainAccount}>
      <div className={styles.accountRow}>
        <TextField
          label="FirstName"
          disabled
          style={{ width: "48%" }}
          value={userData?.firstname || ""}
        />
        <TextField
          label="LastName"
          disabled
          style={{ width: "48%" }}
          value={userData?.lastName || ""}
        />
      </div>
      <div className={styles.accountRow}>
        <TextField
          label="Email"
          disabled
          style={{ width: "48%" }}
          value={userData.email || ""}
        />
        <TextField
          label="UserName"
          disabled
          style={{ width: "48%" }}
          value={userData?.userName || ""}
        />
      </div>
    </div>
  );
};
