import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const Loader = ({ size = 40, color = 'primary' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px',
      }}
    >
      <CircularProgress size={size} color={color} />
    </Box>
  );
};

export default Loader;
