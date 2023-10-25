import React from 'react';
import { Alert } from 'react-bootstrap';

function AlertCustom({ children, ...props }) {
  return (
    <Alert {...props}>
      {children}
    </Alert>
  );
}

export default AlertCustom;