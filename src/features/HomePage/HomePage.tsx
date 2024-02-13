import React, { useState, useEffect } from "react";
import { Container, Grid, Zoom, Fab } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";
import Header from "../../app/common/components/Header";
import Task from "../../models/TaskProps";
import TaskAPI from "../../app/api/Tasks/tasks.api";
import renderTaskCards from "./RenderTaskCards";

const HomePage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await TaskAPI.getAll();
        setTasks(response);
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

  return (
    <Container maxWidth="lg" sx={{ mb: 4 }}>
      <Header />
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={4}>
          {renderTaskCards(tasks, 0, "#9E9FA5",setTasks)}
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          {renderTaskCards(tasks, 1, "#6FB2D2",setTasks)}
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          {renderTaskCards(tasks, 2, "#85C88A",setTasks)}
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
