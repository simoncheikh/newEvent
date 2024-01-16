import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs/AdapterDayjs";
export const BasicDatePicker = ({
  placeholder,
  onChange,
  value,
  width = "100%",
  disablePast
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={placeholder}
        sx={{ width: width }}
        onChange={onChange}
        value={value}
        disablePast={disablePast}
      />
    </LocalizationProvider>
  );
};
