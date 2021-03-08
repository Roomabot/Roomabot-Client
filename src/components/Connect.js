import React, { useState } from 'react';
import { ReactComponent as Logo } from '../logo.svg';
import { Box, Button, CircularProgress, Divider, makeStyles, TextField, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux'
import { connect } from '../core/websocket/WebsocketActions'
// import { connect } from '../core/websocket/WebsocketActions';
import { useSelector } from 'react-redux'
import { roomabot_closed_reason, roomabot_connecting, roomabot_connection_error } from '../core/websocket/connectionReducer';

const useStyles = makeStyles(theme=>({
  root: {
    display: 'grid',
    justifyContent:'center',
    alignContent: 'baseline',
    textAlign: 'center',
    width: '100%',
    margin: '0 auto',
    justifyItems: 'center'
  },
  connect: {
    width: '300px'
  },
  logo: {
    fill: theme.palette.primary.main,
    width: '200px'
  },
  input: {
    textAlign: 'center'
  },
  error: {
    marginTop: theme.spacing(2)
  } 
}))

function Connect(props) {
  const classes = useStyles()
  const [roomabotIP , setIP] = useState(props.lastIP)
  const connecting = useSelector(roomabot_connecting)
  const dispatch = useDispatch()
  const error = useSelector(roomabot_connection_error)

  const tryConnection = () => {
    const WSS_URL = `wss://${roomabotIP}:9090`
    console.info('attempting to connect with IP', roomabotIP)
    dispatch(connect({url:WSS_URL}))
  }
  
  return (
    <Box p={3} className={classes.root}>
    <Logo className={classes.logo}/>
    <TextField 
      variant="outlined"
      label="IP"
      autoFocus
      autoSave
      InputProps={{
        classes: { input: classes.input }
      }}
      value={roomabotIP}
      onChange={e => setIP(e.target.value)}
    />
    <Divider style={{margin: '8px'}} />
    <Button 
      variant="outlined"
      onClick={() => tryConnection() }
      className={classes.connect}
    >
      { connecting ? 
        <CircularProgress size={24}/>
        :
        'Connect to Roomabot'
      }
      
    </Button>
    { error && 
      <Typography className={classes.error} color="error">
        {error}
      </Typography>
    }
    </Box>
  )
}

export default Connect
