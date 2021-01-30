import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import { Box, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';

const useStyles = makeStyles({
  dialog: {
    textAlign: 'center'  
  },
  closeIcon: {
    position: 'absolute',
    right: '2px',
    top: '2px'
  }
});

export default function SimpleDialog(props) {
  const classes = useStyles();
  const { 
    onClose, 
    title, 
    confirmText, 
    open, 
    text,
    confirmDisabled
  } = props;

  return (
    <Dialog className={classes.dialog} onClose={() => onClose('dismissed')} aria-labelledby="simple-dialog-title" open={open}>
      <IconButton size="small" className={classes.closeIcon} 
        onClick={() => onClose('dismissed')}
      >
        <Close/>
      </IconButton>
      <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
      <Box p={3}>
        <Typography>
          { text } 
        </Typography>
        <Box p={2}/>
        <Button 
          disabled={confirmDisabled}
          variant="outlined" onClick={() => onClose("confirm")}>
          {confirmText}
        </Button>
      </Box>
    </Dialog>
  );
}