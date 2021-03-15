import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux' 
import { AppBar, Button, CircularProgress, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core'
import { Brightness1Rounded, Folder, Pause, PlayArrowOutlined, PlayArrowRounded, Replay, ReplayRounded, SaveOutlined } from '@material-ui/icons'
import { roomabot_connected, roomabot_connecting, roomabot_connection_error, roomabot_ip } from '../core/websocket/connectionReducer';
import { closeConnection, dismissError, send, subscribe, unsubscribe } from '../core/websocket/WebsocketActions';
import SimpleDialog from './SimpleDialog';
import { LOAD, roomabot_mapping_on, roomabot_error, SAVE, START } from '../core/data/dataReducer';
import ROSLIB from 'roslib'


const useStyles = makeStyles(theme=>({
  title: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center'
  },
  chip:{
    // background: theme.palette.background.paper,
    // borderRadius: theme.spacing(2),
    // padding: '0 8px',
    marginLeft: '8px'
  },
  disconnect: {
    marginLeft: '1em'
  },
  arduinoOff: {
    marginLeft: '4px',
    animation:'blink 2s infinite',
    fontSize: '10px',
    color: theme.palette.warning.light
  },
  arduinoOn: {
    fontSize: '10px',
    marginLeft: '4px',
    color: theme.palette.success.light
  }
}))

var serviceRequestTopic = null

function Header() {
  const socket = window.__socket
  const classes = useStyles()
  const dispatch = useDispatch()
  const roomabotIP = useSelector(roomabot_ip)
  const connected = useSelector(roomabot_connected)
  const error = useSelector(roomabot_error)
  const arduinoStatus = useSelector(roomabot_mapping_on)
  const [loading, setLoading] = useState(true)
  const [dismissed, setDismissed] = useState(false)
  if (serviceRequestTopic === null && socket){
    
  }

  useEffect(() => {
    const errorTopic = {topic: '/errors', msgType: 'roomabot/serviceCommand'}
    if (connected){
      dispatch(subscribe(errorTopic))
      serviceRequestTopic = new ROSLIB.Topic({
        ros : socket,
        name : '/service_request',
        messageType : 'roomabot/serviceCommand'
      });
    }
    else{
      serviceRequestTopic = null;
    }
    return () => {
      dispatch(unsubscribe(errorTopic))
    }
  }, [connected])

  useEffect(() => {
    if (arduinoStatus){
      setLoading(false)
    }
    return () => {
    }
  }, [arduinoStatus])

  const disconnect = () => {
    dispatch(closeConnection())  
    setLoading(false)
    setDismissed(false)
  }

  const onPause = () => {
    if (serviceRequestTopic){
      var command = new ROSLIB.Message({
        command: 'serviceRequest',
        arg0: '1'
      });
      serviceRequestTopic.publish(command)  
    }
    else{
      console.warn('request called when socket is not open')
    }

  }

  const onPlay = () => {
    setLoading(true)
    if (serviceRequestTopic){
      var command = new ROSLIB.Message({
        command: START,
        arg1: '',
        arg2: ''
      });
      serviceRequestTopic.publish(command)  
    }
    else{
      console.warn('request called when socket is not open')
    }
  }
  
  const onSave = () => {
    if (serviceRequestTopic){
      var command = new ROSLIB.Message({
        command: SAVE,
        arg1: '',
        arg2: ''
      });
      serviceRequestTopic.publish(command)  
    }
    else{
      console.warn('request called when socket is not open')
    }
  }
  const onLoad = () => {
    if (serviceRequestTopic){
      var command = new ROSLIB.Message({
        command: LOAD,
        arg1: '',
        arg2: ''
      });
      serviceRequestTopic.publish(command)  
    }
    else{
      console.warn('request called when socket is not open')
    }
  }

  const handleDialogAction = (action) => {
    if (action === "dismissed"){
      setDismissed(true)
    }
    else if (action === "confirm"){
      onPlay()
    }
  }

  return (
    <React.Fragment>
      {/* <SimpleDialog 
        open={connected && !arduinoStatus && !dismissed} 
        title="Mapping" 
        confirmDisabled={loading}
        text={"Roomabot is not mapping currently."} 
        confirmText={loading ? 'Starting...' : 'Start Mapping'}
        onClose={handleDialogAction}
      /> */}
      <SimpleDialog 
        open={connected && error} 
        title="Error" 
        // confirmDisabled={loading}
        text={error} 
        confirmText={'OK'}
        onClose={() => dispatch(dismissError)}
      />
        <AppBar position="fixed">
          <Toolbar>
            <div className={classes.title}>
              <Typography variant="h6" 
                title={arduinoStatus ? "Bootup Complete" : "Initializing"} 
              >
                Roomabot
              </Typography>
              {/* { connected && <Chip label={roomabotIP}/>} */}
              { connected && 
                // <span className={classes.chip} >
                  <Brightness1Rounded 
                  title={arduinoStatus ? "Bootup Complete" : "Initializing"} 
                  className={arduinoStatus ? classes.arduinoOn : classes.arduinoOff }/>
                // </span>
               //  <Typography color="textSecondary" variant="body2">{roomabotIP}</Typography>
              }
            </div>
            {/* <span></span> */}
            {
              connected && 
              <React.Fragment>
                <IconButton 
                  title={arduinoStatus ? "Restart Mapping" : (loading ? "Loading..." : "Resume Mapping")} 
                  color="inherit"
                  onClick={onPlay}
                >
                  {
                    arduinoStatus ? 
                      <ReplayRounded/> 
                    :
                      (loading ? <CircularProgress size={24} color="textPrimary"/> : <PlayArrowRounded/>)
                  }
                </IconButton>
                <IconButton 
                  title="Load Saved Map" 
                  color="inherit"
                  onClick={onLoad}
                >
                  <Folder/>
                </IconButton>
                <IconButton title="Save Current Map" color="inherit"
                  onClick={onSave}
                >
                  <SaveOutlined/>
                </IconButton>
                <Button 
                  className={classes.disconnect}
                  variant="outlined"
                  onClick={disconnect}
                >
                  Disconnect
                </Button>
              </React.Fragment>
            }
          </Toolbar>
        </AppBar>
      </React.Fragment>
  )
}

export default Header
