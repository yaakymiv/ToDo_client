import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Box,
} from "@mui/material";
import TaskAPI from "../../app/api/Tasks/tasks.api";
import Task from "../../models/TaskProps";
import UpdateTaskDialogProps from "../../models/UpdateTaskDialogProps";

const UpdateTaskDialog: React.FC<UpdateTaskDialogProps> = ({
  open,
  handleClose,
  task,
}) => {
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Task>();

  const submitForm: SubmitHandler<Task> = async (data) => {
    try {
      const updatedData = { ...task, ...data, status: Number(data.status) };
      await TaskAPI.update("api/Task/Update", updatedData);

      reset();
      handleClose();
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit(submitForm)} noValidate>
        <DialogTitle>Update Task</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ mt: 0.8 }}>
              <TextField
                {...register("title", { required: true })}
                label="Task Title"
                fullWidth
                defaultValue={task.title}
              />
              {errors.title && <span>This field is required</span>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("description")}
                label="Description"
                fullWidth
                multiline
                rows={4}
                defaultValue={task.description}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                {...register("startDate")}
                label="Start Date & Time"
                type="datetime-local"
                fullWidth
                InputLabelProps={{ shrink: true }}
                defaultValue={task.startDate}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                {...register("endDate")}
                label="End Date & Time"
                type="datetime-local"
                fullWidth
                InputLabelProps={{ shrink: true }}
                defaultValue={task.endDate}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  {...register("status")}
                  label="Status"
                  defaultValue={task.status}
                >
                  <MenuItem value={0}>To Do</MenuItem>
                  <MenuItem value={1}>In Progress</MenuItem>
                  <MenuItem value={2}>Done</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" sx={{ mb: 1.5 }}>
            Update
          </Button>
        </Box>
      </form>
    </Dialog>
  );
};

export default UpdateTaskDialog;
