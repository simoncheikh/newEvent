import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";

// import "../styles/components/dropdown.css"


export const Dropdown = ({
  backendAutoComplete, defaultEndpoint, searchEndpoint, labelKeys,

  placeholder, options=[],
  onChange, isDisabled,
  multiple,
  nullable,
  value="",
  containerStyle,
}) => {

//   const [searchOptions, setSearchOptions] = useState(options)
//   const [loading, setLoading] = useState(false)

//   const search = async (search) => {
//     setLoading(true)
//     if (!search) {
//       let {ok, response} = await Get(defaultEndpoint)
//       if (ok) {
//         setSearchOptions(
//           response.data.map((option) => ({value: option.ID, label: labelKeys(option)}))
//         )
//       }
//     } else {
//       let {ok, response} = await Post(searchEndpoint, {search:search})
//       if (ok) {
//         setSearchOptions(
//           response.data.map((option) => ({value: option.ID, label: labelKeys(option)}))
//         )
//       }
//     }
//     setLoading(false)
//   }

  return (
    <FormControl style={{width:"100%", ...containerStyle}}>
      <InputLabel>{placeholder}</InputLabel>
      <Select
        label={placeholder}
        disabled={isDisabled}
        onChange={(e)=>onChange(e.target.value)}
        multiple={multiple}
        value={value || (nullable? value: (options[0]?.value||""))}
      >
        {nullable&&<MenuItem value={""}><em>None</em></MenuItem>}
        {options.map(({value, label}, i) =>
          <MenuItem key={i} value={value}>{label}</MenuItem>
        )}
      </Select>
    </FormControl>
  );
};
