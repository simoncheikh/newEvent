import { useEffect, useState } from "react";
import styles from "../Styles/component/topBar.module.css";
import { Link } from "react-router-dom";
import { SideMenu } from "./SideMenu";

export const TopBar = ({ closeSignIn = true, userName }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSpaceDiv, setOpenSpaceDiv] = useState(false);
  const [usersID, setUsersID] = useState(null);
  const [userInfo, setUserInfo] = useState([]);

  const handleOpenMenu = () => {
    setOpenMenu(true);
    setTimeout(() => {
      setOpenSpaceDiv(true);
    }, 400);
  };
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
          setUsersID(data.userID);
          findUser(data.userID);
        }
      } catch (error) {
        console.error("Error fetching userID:", error);
      }
    };
    fetchData();
  }, []);

  const findUser = async (userID) => {
    try {
      const response = await fetch(
        `http://localhost:3001/userDetails/${userID}`,
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
      setUserInfo(...(data || {}));
    } catch (error) {
      console.error("Error fetching userID:", error);
    }
  };

  return (
    <div className={styles.mainTopBar}>
      <div
        className={styles.sideBarStyle}
        style={{
          transform: openMenu == true ? "translateX(0)" : "translateX(-300vw)",
          transition: "500ms",
        }}
      >
        <SideMenu
          wideSpaceOnClick={() => {
            setOpenSpaceDiv(false);
            setOpenMenu(false);
          }}
          openSpaceDiv={openSpaceDiv}
          closeSignIn={usersID == null ? true : false}
          userName={userInfo?.userName || ""}
        />
      </div>
      <img
        src={require("../assets/menu.png")}
        style={{
          cursor: "pointer",
        }}
        className={styles.menuStyle}
        onClick={handleOpenMenu}
      />
      <div>
        <div className={styles.buttonBar}>
          <Link to="/" className={styles.linkStyle}>
            <div className={styles.buttonName}>Home</div>
          </Link>
          <Link to="/event" className={styles.linkStyle}>
            <div className={styles.buttonName}>Events</div>
          </Link>
          <Link to="/AddEvent" className={styles.linkStyle}>
            <div className={styles.buttonName}>Create Events</div>
          </Link>
        </div>
      </div>
      <Link to="/event" className={styles.linkStyle}>
        <div className={styles.contactButton}>Contact Us</div>
      </Link>
    </div>
  );
};
