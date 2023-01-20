import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Collapse,
  Divider,
  Drawer,
  FormControl,
  IconButton,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { formatDate } from "../utils/formatDate";
import TimeAgo from "react-timeago";
import DeleteIcon from "@mui/icons-material/Delete";
import { TIME_BEFORE_SEND_NOTIFICATION_OPTIONS } from "../constants";
const Navbar = ({
  setMemberModalOpen,
  setThemeMode,
  expiredMembers,
  setExpiredMembers,
  setMemberId,
  timeBeforeSendNotification,
  setTimeBeforeSendNotification,
}) => {
  const theme = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <Stack
      px={"2rem"}
      justifyContent={"flex-start"}
      alignItems={"center"}
      sx={{ height: "100px", flex: "0 1 auto", width: "100%" }}
      direction={"row"}
      gap={4}
    >
      <Button
        onClick={() => {
          setMemberModalOpen(true);
          setMemberId("");
        }}
        variant="contained"
        sx={{
          textTransform: "none",
          fontWeight: "bold",
          width: "200px",
          height: "60%",
        }}
      >
        Add Member
      </Button>
      <FormControl sx={{ width: "240px", ml: "auto" }}>
        <InputLabel id="time-before-send-notification">
          Send Notification Before
        </InputLabel>

        <Select
          title="send notification of expired members before the desired day"
          labelId="time-before-send-notification"
          label="Send Notification Before"
          value={timeBeforeSendNotification}
          // sx={{color:"GrayText"}}
          variant="outlined"
          onChange={(e) => {
            setTimeBeforeSendNotification(e.target.value);
          }}
        >
          {TIME_BEFORE_SEND_NOTIFICATION_OPTIONS.map((option) => (
            <MenuItem
              sx={{ py: ".7rem" }}
              key={option.valueInDays}
              value={option}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <IconButton
        title="toggle theme"
        onClick={() =>
          setThemeMode((prev) => (prev === "light" ? "dark" : "light"))
        }
        color="inherit"
      >
        {theme.palette.mode === "light" ? (
          <Brightness4Icon sx={{ fontSize: "1.8rem" }} />
        ) : (
          <Brightness7Icon sx={{ fontSize: "1.8rem" }} />
        )}
      </IconButton>
      <Drawer
        anchor={"right"}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      >
        <Stack minWidth={345} mx={3} height="100%">
          <Stack
            justifyContent="space-between"
            minHeight="10vh"
            alignItems={"center"}
            direction="row"
          >
            <Typography variant={"h5"}>Notifications</Typography>
            <IconButton color="inherit" onClick={() => setSidebarOpen(false)}>
              <CloseIcon sx={{ fontSize: "1.8rem" }} />
            </IconButton>
          </Stack>

          {expiredMembers?.length === 0 ? (
            <Typography sx={{ m: "auto" }} variant="p">
              There is no Expired members.
            </Typography>
          ) : (
            <Stack gap={4}>
              {expiredMembers.map((member) => (
                <ExpiredMemberCard
                  key={member.id}
                  member={member}
                  setExpiredMembers={setExpiredMembers}
                />
              ))}
            </Stack>
          )}
          <Typography mt={"auto"} component={"small"} fontSize=".8rem" textAlign={"center"}>
            made by{" "}
            <Link href="oussama-bennabi.netlify.app">Oussama Bennabi</Link>
          </Typography>
        </Stack>
      </Drawer>
      <IconButton
        sx={{ position: "relative" }}
        onClick={() => setSidebarOpen(true)}
        title="notifications"
        color="inherit"
      >
        {expiredMembers?.length !== 0 && (
          <Typography
            component={"span"}
            sx={{
              fontWeight: "bold",
              borderRadius: "100%",
              display: "inline-block",
              p: ".05rem",
              position: "absolute",
              width: "22px",
              height: "22px",
              top: "0",
              right: "5px",
              backgroundColor: "red",
              color: "white",
            }}
          >
            {expiredMembers?.length}
          </Typography>
        )}
        <NotificationsNoneIcon sx={{ fontSize: "1.8rem" }} />
      </IconButton>
    </Stack>
  );
};

function ExpiredMemberCard({ member, setExpiredMembers }) {
  function handleDelete() {
    setExpiredMembers((prev) => prev.filter((m) => m.id !== member.id));
  }
  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        maxWidth: 345,
        position: "relative",
      }}
    >
      <IconButton
        sx={{
          position: "absolute",
          right: "5px",
          top: "5px",
          backgroundColor: "rgba(0,0,0,.1)",
          zIndex: "10",
        }}
        color="error"
        onClick={(e) => {
          e.stopPropagation();
          // update the expired state
          handleDelete();
        }}
      >
        <DeleteIcon sx={{ fontSize: "1.5rem" }} />
      </IconButton>
      <CardActionArea>
        <CardMedia
          sx={{
            height: 150,
            aspectRation: "1/1",
            objectFit: "cover",
          }}
          component="img"
          src={`http://localhost:3001/photos/${member.photo}`}
          title={member.fullName}
          alt={member.fullName}
        />
        <CardContent>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems="center"
            gap={1}
          >
            <Typography gutterBottom variant="h5" component="div">
              {member.fullName}
            </Typography>

            <Typography gutterBottom variant="h6" component="h6">
              {member.phoneNumber}
            </Typography>
          </Stack>
          <Typography
            gutterBottom
            variant="small"
            display={"block"}
            component="small"
          >
            Start Date :
            <Typography color={"green"} component={"span"}>
              {formatDate(member.startDate)}
            </Typography>
          </Typography>
          <Typography
            gutterBottom
            variant="small"
            display={"block"}
            component="small"
          >
            End Date :
            <Typography color={"error"} component={"span"}>
              {formatDate(member.endDate)}
            </Typography>
          </Typography>

          <Typography
            gutterBottom
            variant="small"
            display={"block"}
            component="small"
          >
            Expires In :
            <Typography color={"error"} component={"span"}>
              <TimeAgo date={member.endDate} />
            </Typography>
          </Typography>

          {/* <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography> */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default Navbar;
