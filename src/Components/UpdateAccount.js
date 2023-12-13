import { Button, TextField, ThemeProvider, createTheme } from "@mui/material";
import styles from "../Styles/component/updateAccount.module.css";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#161855",
    },
  },
});

export const UpdateAccount = () => {
  return (
    <div className={styles.mainAccount}>
      <div className={styles.accountRow}>
        <TextField label="FirstName" style={{ width: "48%" }} />
        <TextField label="LastName" style={{ width: "48%" }} />
      </div>
      <div className={styles.accountRow}>
        <TextField label="Email" style={{ width: "48%" }} />
        <TextField label="UserName" style={{ width: "48%" }} />
      </div>
      <div className={styles.accountRow}>
        <TextField label="Date Of Birth" style={{ width: "48%" }} />
      </div>
      <div className={styles.updateButton}>
        <ThemeProvider theme={theme}>
          <Button
            variant="contained"
            color="secondary"
            // onClick={() => setCheckButton(4)}
          >
            Update
          </Button>
        </ThemeProvider>
      </div>
    </div>
  );
};
