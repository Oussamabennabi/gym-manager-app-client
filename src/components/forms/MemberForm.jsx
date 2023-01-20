import {
  Button,
  FormGroup,
  InputAdornment,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { Stack } from "@mui/system";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CustomInput from "../ui/CustomInput";
import PhotoPicker from "../ui/PhotoPicker";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import CameraModal from "../models/CameraModal";
import { PLANS } from "../../constants";

export default function MemberForm({ state }) {
  const matches = useMediaQuery("(min-width:750px)");

  return (
    <form
      onSubmit={state.handleSubmit}
      method="post"
      encType="multipart/form-data"
    >
      <FormGroup>
        <Stack gap={3} direction={matches ? "row" : "column"}>
          <Stack flex={0.7} mt={"1.1rem"}>
            <PhotoPicker value={state.photo} onChange={state.setPhoto} />
            <Stack
              gap={2}
              mt={"1.8rem"}
              direction={"row"}
              justifyContent="space-between"
              alignItems={"center"}
            >
              <Button
                onClick={() => state.setShowCamera(true)}
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  flex: "1",
                }}
                variant={"contained"}
              >
                Take a photo <CameraAltIcon sx={{ ml: "10px" }} />
              </Button>
              {state.photo && state.photo !== "avatar.svg" && (
                <Button
                  onClick={() => state.setPhoto(null)}
                  variant="contained"
                  color="error"
                  sx={{ flex: ".2" }}
                >
                  <DeleteForeverIcon />
                </Button>
              )}
            </Stack>

            {state.showCamera && (
              <CameraModal
                setpicture={state.setPhoto}
                open={state.showCamera}
                setOpen={state.setShowCamera}
              />
            )}
            <CustomInput
              value={state.fullName}
              onChange={state.setFullName}
              label={"Full Name"}
            />
            <CustomInput
              type="number"
              value={state.phoneNumber}
              onChange={state.setPhoneNumber}
              label={"Phone Number"}
            />
            <CustomInput
              type="number"
              value={state.age}
              onChange={state.setAge}
              label={"Age"}
            />
          </Stack>

          <Stack flex={1}>
            <FormControl sx={{ my: "1rem" }} fullWidth>
              <InputLabel id="plan">Plan</InputLabel>
              <Select
                labelId="plan"
                label="Plan"
                value={state.selectedMembership}
                onChange={(e) => {
                  state.setSelectedMembership(e.target.value);
                }}
              >
                <MenuItem value={PLANS.oneMonth}>One Month</MenuItem>
                <MenuItem value={PLANS.twoMonth}>Two Months</MenuItem>
              </Select>
            </FormControl>

            <CustomInput
              type={"number"}
              value={state.paidAmount}
              onChange={state.setPaidAmount}
              startAdornment={
                <InputAdornment position="start">DZ</InputAdornment>
              }
              label={"Paid"}
            />

            <CustomInput
              type="number"
              value={state.totalAmount}
              onChange={state.setTotalAmount}
              startAdornment={
                <InputAdornment position="start">DZ</InputAdornment>
              }
              label={"Total"}
            />

            <CustomInput
              type={"number"}
              onChange={state.setAmountLeft}
              value={state.amountLeft}
              startAdornment={
                <InputAdornment position="start">DZ</InputAdornment>
              }
              disabled
              label={"Amount Left"}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                label="Start Date"
                inputFormat="MM/DD/YYYY"
                value={state.startDate}
                onChange={(value) => state.setStartDate(value)}
                renderInput={(params) => (
                  <TextField sx={{ my: "1rem" }} {...params} />
                )}
              />
              <MobileDatePicker
                sx={{ my: "1rem" }}
                label="End Date"
                inputFormat="MM/DD/YYYY"
                value={state.endDate}
                disabled
                onChange={(value) => state.setEndDate(value)}
                renderInput={(params) => (
                  <TextField {...params} sx={{ my: "1rem" }} />
                )}
              />
            </LocalizationProvider>

            <Stack gap={2} direction={"row"} justifyContent={"flex-end"}>
              <Button onClick={state.onCancel} variant="outlined">
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={state.loading}
                variant="contained"
              >
                Save
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </FormGroup>
    </form>
  );
}
