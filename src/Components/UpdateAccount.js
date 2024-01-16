import { Button, TextField, ThemeProvider, createTheme } from "@mui/material";
import styles from "../Styles/component/updateAccount.module.css";
import { useEffect, useState } from "react";
import AlertDialog from "./Dialog";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#161855",
    },
  },
});

export const UpdateAccount = ({ setChangePasswordMessage, setShowAlert }) => {
  const [editData, setEditData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

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
        setUserData(userData);
        if (data.error) {
          console.error("Error fetching userID:", data.error);
        } else {
          setUserData(data.userID);
        }
      } catch (error) {
        console.error("Error fetching userID:", error);
      }
    };
    fetchData();
  }, []);

  const updateAccount = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/admin/user_table/edit",
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...editData, userID: userData }),
        }
      );
      if (response.ok) {
        setChangePasswordMessage({
          severity: "success",
          label: "Updated Successfully",
        });
      } else {
        const errorData = await response.json();
        setChangePasswordMessage({ severity: "error", label: errorData.error });
      }
    } catch (error) {
      setChangePasswordMessage({ severity: "error", label: error.message });
    }
    setShowAlert(true);
    setOpenDialog(false);
    setEditData([]);
  };

  const validateInput = () => {
    const validate =
      editData?.firstname == "" ||
      editData?.lastName == "" ||
      editData?.email == "" ||
      editData?.userName == "";
    return validate;
  };

  return (
    <div className={styles.mainAccount}>
      <div className={styles.accountRow}>
        <TextField
          label="FirstName"
          style={{ width: window.innerWidth <= 600 ? "100%" : "48%" }}
          onChange={(e) =>
            setEditData({ ...editData, firstname: e.target.value })
          }
          value={editData.firstname || ""}
        />
        <TextField
          label="LastName"
          style={{ width: window.innerWidth <= 600 ? "100%" : "48%" }}

          onChange={(e) =>
            setEditData({ ...editData, lastName: e.target.value })
          }
          value={editData.lastName || ""}
        />
      </div>
      <div className={styles.accountRow}>
        <TextField
          label="Email"
          style={{ width: window.innerWidth <= 600 ? "100%" : "48%" }}

          onChange={(e) => setEditData({ ...editData, email: e.target.value })}
          value={editData.email || ""}
        />
        <TextField
          label="UserName"
          style={{ width: window.innerWidth <= 600 ? "100%" : "48%" }}

          onChange={(e) =>
            setEditData({ ...editData, userName: e.target.value })
          }
          value={editData.userName || ""}
        />
      </div>
      <div className={styles.updateButton}>
        <ThemeProvider theme={theme}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              if (validateInput()) {
                setChangePasswordMessage({
                  severity: "error",
                  label: "Some fields are required",
                });
                setShowAlert(true);
              } else {
                setOpenDialog(true);
              }
            }}
          >
            Update
          </Button>
        </ThemeProvider>
      </div>
      <AlertDialog
        acceptLabel={"Save"}
        CloseOnClick={() => setOpenDialog(false)}
        closeLabel={"Cancel"}
        AcceptOnClick={updateAccount}
        description={"Are you sure you want to Update Account?"}
        open={openDialog}
        title={"Update Account"}
      />
    </div>
  );
};
