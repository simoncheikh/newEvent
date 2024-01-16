import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

export default function BasicTimePicker({ placeholder, onChange, width,value }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label={placeholder}
        onChange={onChange}
        sx={{
          width: width,
        }}
        value={value}
      />
    </LocalizationProvider>
  );
}
