import { useEffect, useState } from "react";
import { TopBar } from "../../Components/TopBar";
import { Warning } from "../../Components/Warning";
import styles from "../../Styles/homeAdmin.module.css";
import { PieChart } from "@mui/x-charts/PieChart";
import { useAuth } from "../../AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

export const HomeAdmin = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [warningText, setWarningText] = useState({});
  const [userType, setUserType] = useState([]);
  const [eventPerMonth, setEventPerMonth] = useState([]);
  const [eventPerYear, setEventPerYear] = useState([]);
  const [promotedEvent, setPromotedEvent] = useState([]);
  const [receiptYear, setReceiptYear] = useState([]);
  const [receiptMonth, setReceiptMonth] = useState([]);

  // const navigate = useNavigate(); 

  useEffect(() => {
    console.log("HomeAdmin component rendered");
    getTypeUser();
    getEventPerYear();
    getEventPerMonth();
    getEventPromoted();
    getReceiptYear();
    getReceiptMonth();
  }, []);

  const { authenticated, user } = useAuth();
  const navigate = useNavigate(); 
  
  useEffect(() => {
    if (!authenticated || !user || user.type !== 1) {
      navigate("/SignIn");   // Use the navigate function to redirect
    }
  }, [authenticated, user, navigate]);
  

  const getTypeUser = async () => {
    try {
      const response = await fetch("http://localhost:3001/user/get_all", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setUserType(data);
    } catch (error) {
      setWarningText({ severity: "error", label: error });
    }
    setShowAlert();
  };
  const getEventPerYear = async () => {
    try {
      const response = await fetch("http://localhost:3001/admin/eventPerYear", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setEventPerYear(data);
    } catch (error) {
      setWarningText({ severity: "error", label: error });
    }
    setShowAlert();
  };

  const getEventPerMonth = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/admin/eventPerMonth",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setEventPerMonth(data);
    } catch (error) {
      setWarningText({ severity: "error", label: error });
    }
    setShowAlert();
  };

  const getEventPromoted = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/admin/promotedEvent",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setPromotedEvent(data);
    } catch (error) {
      setWarningText({ severity: "error", label: error });
    }
    setShowAlert();
  };

  const getReceiptYear = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/admin/home/receipt_year",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setReceiptYear(data);
    } catch (error) {
      setWarningText({ severity: "error", label: error });
    }
    setShowAlert();
  };

  const getReceiptMonth = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/admin/home/receipt_month",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setReceiptMonth(data);
    } catch (error) {
      setWarningText({ severity: "error", label: error });
    }
    setShowAlert();
  };

  const modifiedUserType = userType.map((value, index) => ({
    id: index,
    value: value.userCount,
    label: getTypeLabel(value.type),
  }));

  function getTypeLabel(type) {
    switch (type) {
      case 1:
        return "admin";
      case 2:
        return "client";
      case 3:
        return "user";
      default:
        return "unknown";
    }
  }
  return (
    <div>
      <div className={styles.topBarStyle}>
        <TopBar />
        <Warning
          onClick={() => setShowAlert(false)}
          collapseIn={showAlert}
          alertProps={warningText}
        />
      </div>
      <br />
      <br />
      <br />
      <div className={styles.mainPage}>
        <h2 className={styles.mainTitle}>Charts</h2>
        <div className={styles.mainChart}>
          <div className={styles.chartBox}>
            <div className={styles.chartTitle}>Users</div>
            <PieChart
              series={[
                {
                  data: modifiedUserType,
                  highlightScope: { faded: "global", highlighted: "item" },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: "gray",
                  },
                },
              ]}
              width={400}
              height={200}
            />
          </div>
          <div className={styles.chartBox}>
            <div className={styles.chartTitle}>Events{" (Per Year)"}</div>
            <PieChart
              series={[
                {
                  data: eventPerYear,
                  highlightScope: { faded: "global", highlighted: "item" },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: "gray",
                  },
                },
              ]}
              width={400}
              height={200}
            />
          </div>
          <div className={styles.chartBox}>
            <div className={styles.chartTitle}>Events{" (Per Month)"}</div>
            <PieChart
              series={[
                {
                  data: eventPerMonth,
                  highlightScope: { faded: "global", highlighted: "item" },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: "gray",
                  },
                },
              ]}
              width={400}
              height={200}
            />
          </div>
          <div className={styles.chartBox}>
            <div className={styles.chartTitle}>Promoted Events</div>
            <PieChart
              series={[
                {
                  data: promotedEvent,
                  highlightScope: { faded: "global", highlighted: "item" },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: "gray",
                  },
                },
              ]}
              width={400}
              height={200}
            />
          </div>
          <div className={styles.chartBox}>
            <div className={styles.chartTitle}>Receipts{" (Per Year)"}</div>
            <PieChart
              series={[
                {
                  data: receiptYear,
                  highlightScope: { faded: "global", highlighted: "item" },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: "gray",
                  },
                },
              ]}
              width={400}
              height={200}
            />
          </div>
          <div className={styles.chartBox}>
            <div className={styles.chartTitle}>Receipts{" (Per Month)"}</div>
            <PieChart
              series={[
                {
                  data: receiptMonth,
                  highlightScope: { faded: "global", highlighted: "item" },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: "gray",
                  },
                },
              ]}
              width={400}
              height={200}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
