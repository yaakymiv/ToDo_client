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
import AddTaskDialogProps from "../../../models/AddTaskDialogProps";
import TaskAPI from "../../api/Tasks/tasks.api";

interface TaskFormData {
  title: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  status: number;
}

const AddTaskDialog: React.FC<AddTaskDialogProps> = ({ open, handleClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>();

  const submitForm: SubmitHandler<TaskFormData> = async (data) => {
    try {
      console.log(data);
      if (!data.startDate) delete data.startDate;
      if (!data.endDate) delete data.endDate;

      await TaskAPI.create(data);
      reset();
      handleClose();
    } catch (error: any) {
      console.log(data);
      console.log(error);
    }
  };

  const defaultStatus = 0;

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit(submitForm)} noValidate>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ mt: 0.8 }}>
              <TextField
                {...register("title", { required: true })}
                label="Task Title"
                fullWidth
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
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                {...register("startDate")}
                label="Start Date & Time"
                type="datetime-local"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                {...register("endDate")}
                label="End Date & Time"
                type="datetime-local"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  {...register("status")}
                  label="Status"
                  defaultValue={defaultStatus}
                >
                  <MenuItem value={0}>To Do</MenuItem>
                  <MenuItem value={1}>In Progress</MenuItem>
                  <MenuItem value={2}>Done</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <Box sx={{display:'flex',flexDirection:'column'}}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" sx={{ mb: 1.5 }}>
            Add
          </Button>
        </Box>
      </form>
    </Dialog>
  );
};

export default AddTaskDialog;
