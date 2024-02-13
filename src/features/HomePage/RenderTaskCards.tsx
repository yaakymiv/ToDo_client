import { Typography, Card, Box, CardContent } from "@mui/material";
import { CheckCircle, Loop, EventRepeat } from "@mui/icons-material";
import TaskCard from "../HomePage/TaskCard";
import Task from "../../models/TaskProps";
import TaskAPI from "../../app/api/Tasks/tasks.api";
import { Dispatch, SetStateAction } from "react";

const renderTaskCards = (tasks: Task[], status: number, mcolor: string,setTasks:Dispatch<SetStateAction<Task[]>>) => {
  const sectionTitles: { [key: number]: string } = {
    0: "To Do",
    1: "In Progress",
    2: "Done",
  };
  const sectionTitle = sectionTitles[status];

  const statusIcon =
    status === 0 ? (
      <EventRepeat sx={{ color: mcolor }} />
    ) : status === 1 ? (
      <Loop sx={{ color: mcolor }} />
    ) : (
      <CheckCircle sx={{ color: mcolor }} />
    );
  const filteredTasks = tasks.filter((task) => task.status === status);

  const moveTask = async (task: Task, newStatus: number) => {
    try {
      const updatedTask = { ...task, status: newStatus };
      await TaskAPI.update(`api/Task/Update`, updatedTask);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <Card
      sx={{
        minWidth: 275,
        border: `2px solid ${mcolor}`,
        bgcolor: mcolor,
        borderRadius: 4,
      }}
    >
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            display: "flex",
          }}
        >
          {sectionTitle}
          {statusIcon}
        </Typography>
        <Box mt={2}>
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.title}
              task={task}
              mcolor={mcolor}
              moveTask={moveTask}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default renderTaskCards;
