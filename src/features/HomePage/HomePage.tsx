import React, { useState, useEffect } from "react";
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
import TaskAPI from "../../app/api/Tasks/tasks.api";

const HomePage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        console.log("yeyy", tasks);
        const response = await TaskAPI.getAll();
        console.log("response:", response);
        const transformedTasks = response.map(
          (dto: {
            id: any;
            title: any;
            description: any;
            status: any;
            startDate: any;
            endDate: any;
          }) => ({
            id: dto.id,
            title: dto.title,
            description: dto.description,
            status: dto.status,
            startDate: dto.startDate,
            endDate: dto.endDate,
          })
        );
        setTasks(transformedTasks);
        console.log("final", tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [tasks]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const sectionTitles: { [key: number]: string } = {
    0: "To Do",
    1: "In Progress",
    2: "Done",
  };

  const renderTaskCards = (status: number, mcolor: string) => {
    const sectionTitle = sectionTitles[status];

    if (!tasks) {
      return null;
    }
    const statusIcon =
      status === 0 ? (
        <EventRepeat sx={{ color: mcolor }} />
      ) : status === 1 ? (
        <Loop sx={{ color: mcolor }} />
      ) : (
        <CheckCircle sx={{ color: mcolor }} />
      );
    const filteredTasks = tasks.filter((task) => task.status === status);

    const moveTask = (task: Task, newStatus: number) => {
      task.status = newStatus;

      const updatedTasks = tasks.map((t) => {
        if (t === task) {
          return task;
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

  return (
    <Container maxWidth="lg" sx={{ mb: 4 }}>
      <Header />
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={4}>
          {renderTaskCards(0, "#9E9FA5")}
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          {renderTaskCards(1, "#6FB2D2")}
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          {renderTaskCards(2, "#85C88A")}
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
