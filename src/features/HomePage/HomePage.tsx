import {
  Container,
  Typography,
  Grid,
  Card,
  Box,
  CardContent,
  Zoom,
  Fab,
} from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";
import { CheckCircle, Loop, EventRepeat } from "@mui/icons-material";
import Header from "../../app/common/components/Header";
import TaskCard from "../HomePage/TaskCard";
import Task from "../../models/TaskProps";
import { useState } from "react";

const HomePage = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      title: "Write blog post",
      description: "Research and write about React best practices",
      status: "Not Started",
      startDate: "2024-02-10T08:00",
      endDate: "2024-02-11T08:00",
    },
    {
      title: "Design new UI",
      description: "Create wireframes and mockups for the landing page",
      status: "In Progress",
      startDate: "2024-02-12T08:00",
      endDate: "2024-02-15T08:00",
    },
    {
      title: "Review code changes",
      description:
        "Check pull requests and provide feedback. Check pull requests and provide feedback. Check pull requests and provide feedback. Check pull requests and provide feedback. Check pull requests and provide feedback. Check pull requests and provide feedback. Check pull requests and provide feedback.",
      status: "Done",
      startDate: "2024-02-16T08:00",
      endDate: "2024-02-20T08:00",
    },
    {
      title: "Write blog post",
      description: "Research and write about React best practices",
      status: "Not Started",
      startDate: "2024-02-10T08:00",
      endDate: "2024-02-11T08:00",
    },
    {
      title: "Design new UI",
      description: "Create wireframes and mockups for the landing page",
      status: "In Progress",
      startDate: "2024-02-12T08:00",
      endDate: "2024-02-15T08:00",
    },
    {
      title: "Review code changes",
      description:
        "Check pull requests and provide feedback. Check pull requests and provide feedback. Check pull requests and provide feedback. Check pull requests and provide feedback. Check pull requests and provide feedback. Check pull requests and provide feedback. Check pull requests and provide feedback.",
      status: "Done",
      startDate: "2024-02-16T08:00",
      endDate: "2024-02-20T08:00",
    },
  ]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  
  const renderTaskCards = (status: string, mcolor: string) => {
    const statusIcon =
      status === "Not Started" ? (
        <EventRepeat sx={{ color: mcolor }} />
      ) : status === "In Progress" ? (
        <Loop sx={{ color: mcolor }} />
      ) : (
        <CheckCircle sx={{ color: mcolor }} />
      );
    const filteredTasks = tasks.filter((task) => task.status === status);

    const moveTask = (
      task: Task,
      status: "Not Started" | "In Progress" | "Done"
    ) => {
      const updatedTasks = tasks.map((t) => {
        if (t === task) {
          return { ...t, status };
        }
        return t;
      });
      setTasks(updatedTasks);
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
            {status}
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

  return (
    <Container maxWidth="lg" sx={{ mb: 4 }}>
      <Header />
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={4}>
          {renderTaskCards("Not Started", "#9E9FA5")}
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          {renderTaskCards("In Progress", "#6FB2D2")}
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          {renderTaskCards("Done", "#85C88A")}
        </Grid>
      </Grid>
      <Zoom in={true}>
        <Fab
          color="primary"
          onClick={scrollToTop}
          sx={{ position: "fixed", bottom: 16, right: 16 }}
        >
          <KeyboardArrowUp />
        </Fab>
      </Zoom>
    </Container>
  );
};

export default HomePage;
