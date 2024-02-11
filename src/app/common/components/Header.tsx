import { Box, Typography, useTheme } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AddTask from "./AddTask";

const Header = () => {
  
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", p:2,mb:2 }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <TaskAltIcon sx={{ fontSize: 36 }} />
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          ToDo
        </Typography>
      </Box>
      <AddTask />
    </Box>
  );
};

export default Header;
