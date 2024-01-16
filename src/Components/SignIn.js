import styles from "../Styles/component/signIn.module.css";
import { useContext, useState, useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FormDialogue } from "./FormDialogue";
import { Warning } from "./Warning";
import { useAuth } from "../AuthContext";
import { TopBar } from "./TopBar";
// import { Dropdown } from "./Dropdown"
import ReCAPTCHA from "react-google-recaptcha";

export const SignIn = () => {
  const [userLogin, setUserLogin] = useState({ email: "", password: "" });
  const [newUser, setNewUser] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [openDialogue, setOpenDialogue] = useState(false);
  const [warningText, setWarningText] = useState({});
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);

  const navigate = useNavigate();
  const { login, user, authenticated } = useAuth();

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@])[A-Za-z\d@!#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/;

  const createUser = async () => {
    try {
      if (!recaptchaVerified) {
        setWarningText({
          severity: "error",
          label: "Please verify ReCAPTCHA before signing up.",
        });
        setShowAlert(true);
        return;
      }

      if (!passwordRegex.test(newUser.password)) {
        setWarningText({
          severity: "error",
          label:
            "Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character (@).",
        });
        setShowAlert(true);
        return;
      }
      const response = await fetch("http://localhost:3001/signUp/User", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        if (response.status === 409) {
          setWarningText({
            severity: "warning",
            label: "Email already exists. Please use a different email.",
          });
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } else {
        setWarningText({ severity: "success", label: "User has been inserted successfully." });
        setNewUser([]);
      }
    } catch (error) {
      setWarningText({ severity: "error", label: error.message });
    }
    setOpenDialogue(false);
    setShowAlert(true);
  };

  const checkUser = async () => {
    login(userLogin, setShowAlert, setWarningText);
  };

  // useEffect(() => {
  //   if (!authenticated) {
  //     navigate('/');
  //   } else if (user && user.type !== 3) {
  //     console.log(user.type);
  //     navigate("/SignIn");
  //   }
  // }, [authenticated, user, navigate]);

  return (
    <div className={styles.mainSignin}>
      <div className={styles.topBarStyle}>
        <TopBar />
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
              label="Phone Number"
              onChange={(e) =>
                setNewUser({ ...newUser, phoneNumber: e.target.value })
              }
              value={newUser.phoneNumber || ""}
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
            <ReCAPTCHA
              sitekey="6LcW3EQpAAAAAA9QStjHryWOXCQsB2isDcAiJl14"
              onChange={(value) => setRecaptchaVerified(!!value)}
            />
          </div>
        </FormDialogue>
      </div>
    </div>
  );
};
