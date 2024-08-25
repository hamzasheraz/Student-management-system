// import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { mainListItems, secondaryListItems } from "./listItems";
// import Profile from "./Profile";
// import Marks from "./Marks";
// import TimeTable from "./TimeTable";
// import FeeGeneration from "./FeeGeneration";
import { Outlet} from "react-router-dom";
// import Attendance from "./Attendance";
// import CourseRegistration from "./CourseRegistration";
// import Notifications from "./Notifications";
import Modal from "@mui/material/Modal";
import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import axios from "axios";
// import StudentLogout from "./StudentLogout";
// import Feedback from "./Feedback";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const defaultTheme = createTheme();

export default function Student() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // const [getRows, setRows] = useState([]);
  // const [loadData, setData] = useState([]);
  // const [name, setName] = useState("");
  // const [desc, setDesc] = useState("");
  // const navigate = useNavigate();
  // const [isLoggedIn, setLoggedIn] = useState(false);

  // const login = localStorage.getItem("login");

  // Set the default authorization header for all axios requests
  // axios.defaults.headers.common["Authorization"] = `JWT ${token}`;

  // const [studentData, setStudentData] = useState({});
  // const [academyData, setAcademyData] = useState({});
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check the login status when the component mounts
    const token = localStorage.getItem("login");

    if (token) {
      // Redirect only if not already on the student profile page
      if (window.location.pathname !== "/dashboard/student-profile") {
        window.location = "/dashboard/student-profile";
      }
    } else {
      // Redirect only if not already on the student login page
      if (window.location.pathname !== "/student-login") {
        window.location.href = "/student-login";
      }
    }
  }, []);

  const [openn, setOpenn] = React.useState(false);

  const handleClose = () => setOpenn(false);

  useEffect(() => {
    getnotifydata();
  }, [openn]);
  const handleOpen = () => {
    setOpenn(true);
    //loadList();
  };
  const [notificationData, setNotificationData] = useState([]);
  const getnotifydata = async () => {
    const rollnumber = localStorage.getItem("rollnumber");
    const cleanedRollNumber = rollnumber.replace(/\D/g, ""); // Remove non-numeric characters
    const response = await fetch(
      `http://127.0.0.1:8000/api/displaynotifications/${cleanedRollNumber}`
    );
    const data = await response.json();
    console.log(data);

    setNotificationData(data);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Student Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon onClick={handleOpen} />
                {/* <Notifications /> */}
                <Modal
                  open={openn}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TableContainer component={Paper}>
                          <Table
                            sx={{ minWidth: 250 }}
                            size="small"
                            aria-label="a dense table"
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell component="th">
                                  <b>Student Rollnumber</b>
                                </TableCell>
                                <TableCell component="th">
                                  <b>Message</b>
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {notificationData &&
                              notificationData.length > 0 ? (
                                notificationData.map((notification) => (
                                  <TableRow key={notification.id}>
                                    <TableCell>
                                      {notification.roll_number}
                                    </TableCell>
                                    <TableCell>
                                      {notification.notification_text}
                                    </TableCell>
                                  </TableRow>
                                ))
                              ) : (
                                <TableRow>
                                  <TableCell colSpan={2}>
                                    No notifications found
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Grid>
                    </Grid>
                    <br />
                    <br />
                  </Box>
                </Modal>
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Outlet />
            {/* <Routes>
              <Route path="/student-profile" element={<Profile />} />
              <Route path="/student-fee-payment" element={<FeeGeneration />} />
              <Route
                path="/student-course-registeration"
                element={<CourseRegistration />}
              />
              <Route path="/student-attendance" element={<Attendance />} />
              <Route path="/student-marks" element={<Marks />} />
              <Route path="/student-time-table" element={<TimeTable />} />
              <Route path="/student-logout" element={<StudentLogout />} />
            </Routes> */}
            {/* Add more routes for other pages */}

            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  // bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
