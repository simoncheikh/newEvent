import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs/AdapterDayjs";
export const BasicDatePicker = ({ placeholder }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker label={placeholder} sx={{ width: "100%" }} />
    </LocalizationProvider>
  );
};
