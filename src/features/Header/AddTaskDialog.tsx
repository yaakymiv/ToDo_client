import React from "react";
import { SubmitHandler } from "react-hook-form";
import Task from "../../models/TaskProps";
import TaskAPI from "../../app/api/Tasks/tasks.api";
import TaskFormDialog from "../../app/common/components/TaskFormDialog";

interface AddTaskDialogProps {
  open: boolean;
  handleClose: () => void;
}

const AddTaskDialog: React.FC<AddTaskDialogProps> = ({ open, handleClose }) => {
  const submitForm: SubmitHandler<Task> = async (data) => {
    try {
      console.log(data);
      if (!data.startDate) delete data.startDate;
      if (!data.endDate) delete data.endDate;

      await TaskAPI.create(data);
      handleClose();
    } catch (error: any) {
      console.log(data);
      console.log(error);
    }
  };

  return (
    <TaskFormDialog
      open={open}
      handleClose={handleClose}
      submitHandler={submitForm}
      title="Add New Task"
      submitButtonText="Add"
    />
  );
};

export default AddTaskDialog;
