import styles from "../Styles/component/signIn.module.css";
import { useContext, useState, useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FormDialogue } from "./FormDialogue";
import { Warning } from "./Warning";
// import { Dropdown } from "./Dropdown";

export const SignIn = () => {
  const [userLogin, setUserLogin] = useState({ email: "", password: "" });
  const [newUser, setNewUser] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [openDialogue, setOpenDialogue] = useState(false);
  const [warningText, setWarningText] = useState({});

  const navigate = useNavigate();

  const createUser = async () => {
    try {
      const response = await fetch("http://localhost:3001/signUp/User", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setWarningText({ severity: "success", label: "user has been insert" });
      setNewUser([]);
    } catch (error) {
      setWarningText({ severity: "error", label: error.message });
    }
    setOpenDialogue(false);
    setShowAlert(true);
  };

  const checkUser = async () => {
    try {
      const response = await fetch("http://localhost:3001/login/user", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userLogin),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        const userInfo = data.user;
        const { email, firstname, lastName, userID, type } = userInfo;
        navigate("/", {
          state: {
            userID: userID,
            type: type,
            firstName: firstname,
            lastName: lastName,
          },
        });
        setWarningText({
          severity: "success",
          label: `Logged in as ${email}, ${firstname}`,
        });
        setShowAlert(true);
      } else {
        const errorData = await response.json();
        setWarningText({ severity: "error", label: errorData.error });
        setShowAlert(true);
      }
    } catch (error) {
      setWarningText({ severity: "error", label: error.message });
      setShowAlert(true);
    }
  };


  return (
    <div className={styles.mainSignin}>
      <div className={styles.topBarStyle}>
        <Warning
          onClick={() => setShowAlert(false)}
          collapseIn={showAlert}
          alertProps={warningText}
        />
      </div>
      <div className={styles.leftSigninPage}>
        <div className={styles.signinTitle}>Login To Your Account</div>
        <div className={styles.inputAll}>
          <div className={styles.inputEmail}>
            <TextField
              label="Email"
              style={{ width: "20em", borderRadius: "4%" }}
              onChange={(e) => {
                setUserLogin({ ...userLogin, email: e.target.value });
              }}
            />
          </div>
          <div className={styles.inputPassword}>
            <TextField
              label="Password"
              style={{ width: "20em" }}
              onChange={(e) =>
                setUserLogin({ ...userLogin, password: e.target.value })
              }
              type="password"
            />
          </div>
        </div>
        <div className={styles.signinButton}>
          <Button
            variant="contained"
            style={{
              borderRadius: "2em",
              backgroundColor: "#161855",
              fontWeight: "bold",
              width: "15em",
            }}
            onClick={checkUser}
          >
            Sign In
          </Button>
        </div>
      </div>
      <div className={styles.rightSigninPage}>
        <div className={styles.mainRightPage}>
          <div className={styles.descRightPage}>
            <div className={styles.titleRightPage}>New Here?</div>
            Sign up and Discover our Events
          </div>
          <div className={styles.signinButton}>
            <Button
              variant="contained"
              style={{
                borderRadius: "2em",
                backgroundColor: "white",
                color: "#161855",
                fontWeight: "bold",
                width: "15em",
              }}
              onClick={() => setOpenDialogue(true)}
            >
              Sign Up
            </Button>
          </div>
          <div className={styles.powered}>Powered © By Lebanon Luxe Events</div>
        </div>
        <FormDialogue
          show={openDialogue}
          acceptLabel={"Save"}
          dialogueTitle={"Create Your Account"}
          onClose={() => setOpenDialogue(false)}
          titleStyle={{ height: "1000px" }}
          fullwidth={"100%"}
          onAccept={createUser}
        >
          <div>
            <img
              src={require("../assets/nightParty.jpg")}
              style={{ width: "100%", height: "230px" }}
            />
          </div>
          <div className={styles.dialogueContainer}>
            <TextField
              variant="outlined"
              label="First Name"
              onChange={(e) =>
                setNewUser({ ...newUser, firstName: e.target.value })
              }
              value={newUser.firstName || ""}
              size="small"
              fullWidth
            />
            <TextField
              variant="outlined"
              label="Last Name"
              onChange={(e) =>
                setNewUser({ ...newUser, lastName: e.target.value })
              }
              value={newUser.lastName || ""}
              size="small"
              fullWidth
            />
            <TextField
              variant="outlined"
              label="Email"
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              value={newUser.email || ""}
              size="small"
              fullWidth
            />
            <TextField
              variant="outlined"
              label="Password"
              type="password"
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              value={newUser.password || ""}
              size="small"
              fullWidth
            />
            <TextField
              variant="outlined"
              label="UserName"
              onChange={(e) =>
                setNewUser({ ...newUser, userName: e.target.value })
              }
              value={newUser.userName || ""}
              size="small"
              fullWidth
            />
            <TextField
              variant="outlined"
              label="Phone Number"
              onChange={(e) =>
                setNewUser({ ...newUser, phoneNumber: e.target.value })
              }
              value={newUser.phoneNumber || ""}
              size="small"
              fullWidth
            />
          </div>
        </FormDialogue>
      </div>
    </div>
  );
};
