import React, { useEffect, useState } from "react";
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
import Task from "../../../models/TaskProps";

interface TaskFormDialogProps {
  open: boolean;
  handleClose: () => void;
  submitHandler: SubmitHandler<Task>;
  defaultValues?: Partial<Task>;
  title: string;
  submitButtonText: string;
  resetForm?: () => void;
}

const TaskFormDialog: React.FC<TaskFormDialogProps> = ({
  open,
  handleClose,
  submitHandler,
  defaultValues = {},
  title,
  submitButtonText,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Task>({ defaultValues });

  const [endDate, setEndDate] = useState<string | undefined>(
    defaultValues.endDate || ""
  );
  const [startDate, setStartDate] = useState<string | undefined>(
    defaultValues.startDate || ""
  );

  useEffect(() => {
    setStartDate(defaultValues.startDate || "");
    setEndDate(defaultValues.endDate || "");
  }, [defaultValues]);

  const handleCancel = () => {
    handleClose();
    reset();
  };
  return (
    <Dialog open={open} onClose={handleCancel}>
      <form onSubmit={handleSubmit(submitHandler)} noValidate>
        <DialogTitle>{title}</DialogTitle>
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
                InputProps={{ inputProps: { max: endDate } }}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                {...register("endDate")}
                label="End Date & Time"
                type="datetime-local"
                fullWidth
                InputLabelProps={{ shrink: true }}
                InputProps={{ inputProps: { min: startDate } }}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  {...register("status", { value: defaultValues.status || 0 })}
                  label="Status"
                  defaultValue={defaultValues.status || 0}
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
          <Button onClick={handleCancel}>Cancel</Button>
          <Button type="submit" sx={{ mb: 1.5 }}>
            {submitButtonText}
          </Button>
        </Box>
      </form>
    </Dialog>
  );
};

export default TaskFormDialog;
