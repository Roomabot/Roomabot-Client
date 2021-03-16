import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function ToastNotif(props) {
  const classes = useStyles();
  const { open, msg, type, onClose } = props

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    onClose()
  };

  return (
    <div className={classes.root}>
      <Snackbar 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type}>
          {msg}
        </Alert>
      </Snackbar>
    </div>
  );
}