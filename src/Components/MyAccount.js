import { TextField } from "@mui/material";
import styles from "../Styles/component/myAccount.module.css";

export const MyAccount = () => {
  return (
    <div className={styles.mainAccount}>
      <div className={styles.accountRow}>
        <TextField label="FirstName" disabled style={{ width: "48%" }} />
        <TextField label="LastName" disabled style={{ width: "48%" }} />
      </div>
      <div className={styles.accountRow}>
        <TextField label="Email" disabled style={{ width: "48%" }} />
        <TextField label="UserName" disabled style={{ width: "48%" }} />
      </div>
      <div className={styles.accountRow}>
        <TextField label="Date Of Birth" disabled style={{ width: "48%" }} />
      </div>
    </div>
  );
};
