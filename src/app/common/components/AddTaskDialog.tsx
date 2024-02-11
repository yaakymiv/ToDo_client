import React from "react";
import { useForm } from "react-hook-form";
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
} from "@mui/material";
import AddTaskDialogProps from "../../../models/AddTaskDialogProps";

const AddTaskDialog: React.FC<AddTaskDialogProps> = ({ open, handleClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
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
              <Select {...register("status")} label="Status">
                <MenuItem value="Not Started">Not Started</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Done">Done</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handleSubmit(onSubmit)} sx={{ mb: 1.5 }}>
        Add
      </Button>
    </Dialog>
  );
};

export default AddTaskDialog;
