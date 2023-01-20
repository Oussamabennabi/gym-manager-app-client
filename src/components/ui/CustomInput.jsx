import { FormControl, TextField } from "@mui/material"

export default function CustomInput({
  type = "text",
  label,
  value,
  onChange,
  startAdornment,
  ...props
}) {
  return (
    <FormControl  variant="standard" sx={{ my: "1rem" }}>
      <TextField
        type={type}
        value={value}
        onChange={(e) => onChange && onChange(e.target?.value)}
        InputProps={{
          startAdornment: startAdornment ? startAdornment : null,
        }}
        label={label}
        // sx={{
        //   outlineColor: "white", backgroundColor: "#363c5e"}}
        variant="standard"
        {...props}
      />
    </FormControl>
  );
}
