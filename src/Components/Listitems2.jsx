import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BarChartIcon from "@mui/icons-material/BarChart";
import PieChartIcon from "@mui/icons-material/PieChart";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

export const mainListItems2 = (
  <React.Fragment>
    {/* <Link to="/profile" style={{ textDecoration: "none", color: "inherit" }}>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Student Information" />
      </ListItemButton>
    </Link> */}

    <Link to="attendance" style={{ textDecoration: "none", color: "inherit" }}>
      <ListItemButton>
        <ListItemIcon>
          <PieChartIcon />
        </ListItemIcon>
        <ListItemText primary="Attendance" />
      </ListItemButton>
    </Link>

    <Link to="marks" style={{ textDecoration: "none", color: "inherit" }}>
      <ListItemButton>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Marks" />
      </ListItemButton>
    </Link>

    {/* <Link to="/time-table" style={{ textDecoration: "none", color: "inherit" }}>
      <ListItemButton>
        <ListItemIcon>
          <ViewTimelineIcon />
        </ListItemIcon>
        <ListItemText primary="Time Table" />
      </ListItemButton>
    </Link> */}
  </React.Fragment>
);

export const secondaryListItems2 = (
  <React.Fragment>
    <Link
      to="teacher-profile-edit"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <ListItemButton>
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
        <ListItemText primary="Edit Profile" />
      </ListItemButton>
    </Link>
    <Link
      to="teacher-logout"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <ListItemButton>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);
