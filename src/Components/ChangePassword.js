import { Button, TextField, createTheme } from "@mui/material";
import styles from "../Styles/component/changePassword.module.css";
import { useState } from "react";
import { ThemeProvider } from "react-admin";
import AlertDialog from "./Dialog";

export const ChangePassword = ({ setChangePasswordMessage, setShowAlert }) => {
  const [editPassword, setEditPassword] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const theme = createTheme({
    palette: {
      secondary: {
        main: "#161855",
      },
    },
  });

  const updatePassword = async () => {
    try {
      const response = await fetch("http://localhost:3001/change-password", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editPassword),
      });

      if (response.ok) {
        setChangePasswordMessage({
          severity: "success",
          label: "Password changed successfully.",
        });
      } else {
        const errorData = await response.json();
        setChangePasswordMessage({ severity: "error", label: errorData.error });
      }
    } catch (error) {
      setChangePasswordMessage({ severity: "error", label: error.message });
    }

    setOpenDialog(false);
    setEditPassword([]);
    setShowAlert(true);
  };

  const validateInput = () => {
    const validate =
      editPassword?.email === "" ||
      editPassword?.currentPassword === "" ||
      editPassword?.newPassword === "";
    return validate;
  };
  

  return (
    <div className={styles.mainAccount}>
      <h1>Change Password</h1>
      <TextField
        label="Email"
        style={{ width: window.innerWidth <= 600 ? "100%" : "48%" }}

        onChange={(e) =>
          setEditPassword({ ...editPassword, email: e.target.value })
        }
        value={editPassword.email || ""}
      />
      <TextField
        label="Old Password"
        type="password"
        style={{ width: window.innerWidth <= 600 ? "100%" : "48%" }}

        onChange={(e) =>
          setEditPassword({ ...editPassword, currentPassword: e.target.value })
        }
        value={editPassword.currentPassword || ""}
      />
      <TextField
        label="New Password"
        type="password"
        style={{ width: window.innerWidth <= 600 ? "100%" : "48%" }}

        onChange={(e) =>
          setEditPassword({ ...editPassword, newPassword: e.target.value })
        }
        value={editPassword.newPassword || ""}
      />
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
        AcceptOnClick={updatePassword}
        description={"Are you sure you want to Change the Password?"}
        open={openDialog}
        title={"Change Password"}
      />
    </div>
  );
};
