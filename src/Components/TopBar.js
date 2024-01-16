import { useEffect, useState } from "react";
import styles from "../Styles/component/topBar.module.css";
import { Link } from "react-router-dom";
import { SideMenu } from "./SideMenu";

export const TopBar = ({}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSpaceDiv, setOpenSpaceDiv] = useState(false);
  const [usersID, setUsersID] = useState(null);
  const [userInfo, setUserInfo] = useState([]);
  const [dataUser, setDataUser] = useState([]);

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
          setDataUser(data);
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
        {dataUser?.type == 1 ? (
          <div className={styles.buttonBar}>
            <Link to="/admin/Home" className={styles.linkStyle}>
              <div className={styles.buttonName}>Home</div>
            </Link>
            <Link to="/admin/users" className={styles.linkStyle}>
              <div className={styles.buttonName}>Users</div>
            </Link>
            <Link to="/admin/events" className={styles.linkStyle}>
              <div className={styles.buttonName}>Events</div>
            </Link>
            <Link to="/admin/methodPayment" className={styles.linkStyle}>
              <div className={styles.buttonName}>Methods Payment</div>
            </Link>
            <Link to="/admin/Order" className={styles.linkStyle}>
              <div className={styles.buttonName}>Orders</div>
            </Link>
            <Link to="/admin/Receipt" className={styles.linkStyle}>
              <div className={styles.buttonName}>Receipts</div>
            </Link>
          </div>
        ) : dataUser?.type == 2 ? (
          <div className={styles.buttonBar}>
          </div>
        ) : (
          <div className={styles.buttonBar}>
            <Link to="/" className={styles.linkStyle}>
              <div className={styles.buttonName}>Home</div>
            </Link>
            <Link to="/event" className={styles.linkStyle}>
              <div className={styles.buttonName}>Events</div>
            </Link>
            <Link to="/AddEvent" className={styles.linkStyle}>
              <div className={styles.buttonName}>Create Event</div>
            </Link>
          </div>
        )}
      </div>
      {dataUser?.type == null && (
        <Link to="/Contact" className={styles.linkStyle}>
          <div className={styles.contactButton}>Contact Us</div>
        </Link>
      )}
      {dataUser?.type == 3 && (
        <Link to="/Contact" className={styles.linkStyle}>
          <div className={styles.contactButton}>Contact Us</div>
        </Link>
      )}
    </div>
  );
};
