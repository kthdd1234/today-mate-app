import {Fab} from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';

const FloatingActionButton = () => {
  return (
    <Fab color="primary" aria-label="add">
      <AddIcon />
    </Fab>
  );
};

export default FloatingActionButton;
