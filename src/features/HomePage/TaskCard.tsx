import React from "react";
import {
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  Stack,
  Divider,
  IconButton,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Task from "../../models/TaskProps";
import { useState } from "react";
import ColorCircle from "./ColorCircle";
import formatDateTime from "../../app/common/components/FormatDateTime";
import TaskAPI from "../../app/api/Tasks/tasks.api";

const TaskCard: React.FC<{
  task: Task;
  mcolor: string;
  moveTask: (task: Task, status: number) => void;
}> = ({ task, mcolor, moveTask }) => {
  const { title, description, startDate, endDate } = task;
  const [expanded, setExpanded] = useState(false);

  const formattedStartDate: string = formatDateTime(startDate);
  const formattedEndDate: string = formatDateTime(endDate);

  const buttonStyle = {
    color: mcolor,
    padding: 0,
    "&:hover": {
      backgroundColor: "none",
    },
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleMoveTask = (status: number) => {
    moveTask(task, status);
  };

  const handleEditTask = (editedTask: Task) => {
    console.log("Editing task:", editedTask);
  };

  const handleDeleteTask = async (taskToDelete: Task) => {
    try {
      await TaskAPI.delete(taskToDelete.id);
      console.log("Task deleted successfully:", taskToDelete);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <Card sx={{ width: "100%", mb: 2 }}>
      <CardContent style={{ padding: 8 }}>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {expanded ? description : `${description.slice(0, 100)}`}
          {description.length > 100 && !expanded && "..."}
        </Typography>
        {!expanded && description.length > 100 && (
          <Button
            onClick={toggleExpand}
            size="small"
            endIcon={<ExpandMore />}
            sx={buttonStyle}
          >
            Expand
          </Button>
        )}
        {expanded && (
          <Button
            onClick={toggleExpand}
            size="small"
            endIcon={<ExpandLess />}
            sx={buttonStyle}
          >
            Collapse
          </Button>
        )}
        <Divider sx={{ my: 0.8, bgcolor: mcolor }} flexItem />

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Stack>
            <Typography variant="body2">
              <strong>Move to: </strong>
            </Typography>
            <Box>
              {mcolor !== "#9E9FA5" && (
                <ColorCircle
                  color="#9E9FA5"
                  onClick={() => handleMoveTask(0)}
                />
              )}
              {mcolor !== "#6FB2D2" && (
                <ColorCircle
                  color="#6FB2D2"
                  onClick={() => handleMoveTask(1)}
                />
              )}
              {mcolor !== "#85C88A" && (
                <ColorCircle
                  color="#85C88A"
                  onClick={() => handleMoveTask(2)}
                />
              )}
            </Box>
            <Box>
              <IconButton
                onClick={() => handleEditTask(task)}
                style={{ margin: 4, padding: 0 }}
                sx={{
                  color: "black",
                  "&:hover": {
                    backgroundColor: "#fff",
                  },
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton
                onClick={() => handleDeleteTask(task)}
                style={{ margin: 4, padding: 0 }}
                sx={{
                  color: "black",
                  "&:hover": {
                    backgroundColor: "#fff",
                  },
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Stack>

          <Box sx={{ textAlign: "right" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="body2">
                <strong>Start Date:</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formattedStartDate}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="body2">
                <strong>End Date:</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formattedEndDate}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
