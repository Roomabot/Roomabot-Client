import React, { useEffect, useState } from 'react';
import logo from '../logo.svg';
import { Box, Button, Container, CssBaseline, Divider, makeStyles, TextField, Typography } from '@material-ui/core';
import { connect } from '@giantmachines/redux-websocket'
import { useDispatch } from 'react-redux'
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
  const dispatch = useDispatch()
  
  const handleConnect = () => {
    // () => props.setConnected(true, roomabotIP)
    console.info('Connecting to the ws server')
    const wss = `wss://${roomabotIP}:6001` //my-server.com
    dispatch(connect(wss))
    
  }
    

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
      onClick={handleConnect}
    >
      Connect to Roomabot
    </Button>
    </Box>
  )
}

export default Connect
