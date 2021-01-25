import React, { useEffect, useState } from 'react';
import logo from '../logo.svg';
import { Box, Button, Container, CssBaseline, Divider, makeStyles, TextField, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme=>({
  root: {
    display: 'grid',
    justifyContent:'center',
    alignContent: 'baseline',
    textAlign: 'center'
  }
}))

function Connect(props) {
  const classes = useStyles()
  const [roomabotIP , setIP] = useState(props.lastIP)
  return (
    <Box p={3} className={classes.root}>
    <Typography variant="h3">
      Roomabot 
    </Typography>
    <img src={logo} className="App-logo" alt="logo" />
    <TextField 
      variant="outlined"
      label="IP"
      autoFocus
      autoSave
      value={roomabotIP}
      onChange={e => setIP(e.target.value)}
    />
    <Divider style={{margin: '8px'}} />
    <Button 
      variant="outlined"
      onClick={() => props.setConnected(true, roomabotIP)}
    >
      Connect to Roomabot
    </Button>
    </Box>
  )
}

export default Connect
