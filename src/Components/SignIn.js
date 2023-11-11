import styles from "../Styles/component/signIn.module.css";
import { useContext, useState, useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { FormDialogue } from "./FormDialogue";
import { Dropdown } from "./Dropdown";
// import { Dropdown } from "./Dropdown";

export const SignIn = () => {
  const [userLogin, setUserLogin] = useState({ Email: "", password: "" });
  const [newUser, setNewUser] = useState({});
  const [openDialogue, setOpenDialogue] = useState(false);

  const typeOptions = [{ value: "dsad", label: "Dsadsa" }];
  // const navigate = useNavigate();
  // const location = useLocation();

  // const checkUser = async () => {
  //     try {
  //         const response = await fetch("http://localhost:3000/login", {
  //             method: "POST",
  //             body: JSON.stringify(userLogin),
  //             headers: {
  //                 Accept: "application/json",
  //                 "Content-Type": "application/json",
  //             },
  //         });
  //         const data = await response.json();
  //         navigate("/userData", { state: data });
  //     } catch (error) {
  //         console.log(error.message);
  //     }
  //     setUserLogin({ Email: "", password: "" });
  // };

  // const createUser = async () => {
  //     try {
  //         const response = await fetch('http://localhost:3000/signup', {
  //             method: "POST",
  //             body: JSON.stringify(newUser),
  //             headers: {
  //                 Accept: "application/json",
  //                 "Content-Type": "application/json",
  //             },
  //         });
  //         const data = await response.json()
  //     } catch (error) {
  //         window.alert(error.message)
  //     }
  //     setOpenDialogue(false)
  // }

  // const typeOptions=[
  //     {value:'admin',label:"Admin"},
  //     {value:'user',label:"User"},
  // ]

  return (
    <div className={styles.mainSignin}>
      <div className={styles.leftSigninPage}>
        <div className={styles.signinTitle}>Login To Your Account</div>
        <div className={styles.inputAll}>
          <div className={styles.inputEmail}>
            <TextField
              label="Email"
              style={{ width: "20em", borderRadius: "4%" }}
              // onChange={(e) => {
              //     setUserLogin({ ...userLogin, Email: e.target.value })
              // }}
            />
          </div>
          <div className={styles.inputPassword}>
            <TextField
              label="Password"
              style={{ width: "20em" }}
              // onChange={(e) => setUserLogin({ ...userLogin, password: e.target.value })}
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
            // onClick={() => {
            //     checkUser()
            // }}
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
        </div>
        <FormDialogue
          show={openDialogue}
          acceptLabel={"Save"}
          dialogueTitle={"Create Your Account"}
          onClose={() => setOpenDialogue(false)}
          titleStyle={{ height: "1000px" }}
          fullwidth={"100%"}
          //   onAccept={createUser}
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
              label="Email"
              // onChange={(e) => setNewUser({ ...newUser, Email: e.target.value })}
              value={newUser.Email || ""}
              size="small"
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
            />
            <TextField
              variant="outlined"
              label="UserName"
              onChange={(e) =>
                setNewUser({ ...newUser, userName: e.target.value })
              }
              value={newUser.userName || ""}
              size="small"
            />
            <TextField
              variant="outlined"
              label="Phone Number"
              onChange={(e) =>
                setNewUser({ ...newUser, phone: e.target.value })
              }
              value={newUser.phone || ""}
              size="small"
            />
            <Dropdown
              placeholder="Gender"
              //   onChange={(value) => setNewUser({ ...newUser, type: value })}
              //   value={newUser.type}
              //   options={typeOptions}
            />
          </div>
        </FormDialogue>
        <div className={styles.powered}>Powered © By Lebanon Luxe Events</div>
      </div>
    </div>
  );
};
