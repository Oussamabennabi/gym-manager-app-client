import { Box, Button, Stack } from "@mui/material"
import { useCallback } from "react"
import ImageIcon from '@mui/icons-material/Image'
export default function PhotoPicker({ value,onChange }) {
  const imageSource = useCallback(() => {
    
    if (value == null || value == undefined)
      return "http://localhost:3001/photos/avatar.svg";
    if (typeof value === "string") return value.startsWith("data:image/jpeg;base64,")?value:"http://localhost:3001/photos/"+value;
    if (typeof value === "object") return URL.createObjectURL(value);
  }, [value, onChange]);
  return (
    <Stack position={"relative"}>
      <Button
        sx={{
          position: "relative",
          borderRadius: "100%",
          width: "150px",
          height: "150px",
          mx: "auto",
        }}
        variant="outlined"
        component="label"
      >
        <Box sx={{ position: "absolute", inset: "0" }}>
          <Box
            component={"img"}
            sx={{
              position: "absolute",
              width: "150px",
              height: "150px",
              borderRadius: "100%",
              objectFit: "cover",
            }}
            src={imageSource()}
            alt="person"
          />

          <ImageIcon
            sx={{
              position: "absolute",
              top: "80%",
              left: "80%",
              scale: "1.2",
            }}
          />
        </Box>
        <input
          type="file"
          name="photo"
          onChange={(e) => onChange(e.target.files[0])}
          hidden
        />
      </Button>
      
    </Stack>
  );
}
