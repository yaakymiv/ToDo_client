import Task from "./TaskProps";

export default interface UpdateTaskDialogProps {
    open: boolean;
    handleClose: () => void;
    task: Task;
  }