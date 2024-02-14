import  { useState } from 'react';
import { Box, Button } from '@mui/material';
import AddTaskDialog from './AddTaskDialog';

const AddTask = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    
    setOpen(false);
  };

  return (
    <Box>
      <Button variant="contained" onClick={handleClickOpen}>
        Add Task
      </Button>
      <AddTaskDialog open={open} handleClose={handleClose} />
    </Box>
  );
};

export default AddTask;
