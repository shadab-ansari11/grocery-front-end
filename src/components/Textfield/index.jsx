import React from 'react';
import { TextField as MuiTextField } from '@mui/material';

const TextField = ({ 
  label, 
  placeholder, 
  value, 
  error, 
  helperText, 
  onBlur, 
  onChange,
  type = 'text',
  iconEnd,
  ...props 
}) => {
  return (
    <MuiTextField
      fullWidth
      type={type}
      label={label}
      placeholder={placeholder}
      value={value}
      error={error}
      helperText={helperText}
      onBlur={onBlur}
      onChange={onChange}
      InputProps={{
        endAdornment: iconEnd,
      }}
      {...props}
    />
  );
};

export default TextField;
