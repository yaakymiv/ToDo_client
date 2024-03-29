import React from "react";
import { SubmitHandler } from "react-hook-form";
import Task from "../../models/TaskProps";
import TaskAPI from "../../app/api/Tasks/tasks.api";
import TaskFormDialog from "../../app/common/components/TaskFormDialog";

interface UpdateTaskDialogProps {
  open: boolean;
  handleClose: () => void;
  task: Task;
}

const UpdateTaskDialog: React.FC<UpdateTaskDialogProps> = ({
  open,
  handleClose,
  task,
}) => {
  const submitForm: SubmitHandler<Task> = async (data) => {
    try {
      const updatedData = { ...task, ...data, status: Number(data.status) };
      await TaskAPI.update("api/Task/Update", updatedData);

      handleClose();
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <TaskFormDialog
      open={open}
      handleClose={handleClose}
      submitHandler={submitForm}
      defaultValues={task}
      title="Update Task"
      submitButtonText="Update"
    />
  );
};

export default UpdateTaskDialog;
