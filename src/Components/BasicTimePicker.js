import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

export default function BasicTimePicker({ placeholder }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker label={placeholder} />
    </LocalizationProvider>
  );
}
