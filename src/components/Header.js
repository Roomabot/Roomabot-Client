import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux' 
import { AppBar, Button, CircularProgress, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core'
import { Folder, Pause, PlayArrowOutlined, PlayArrowRounded, SaveOutlined } from '@material-ui/icons'
import { roomabot_connected, roomabot_connecting, roomabot_connection_error, roomabot_ip } from '../core/websocket/websocketReducer';
import { closeConnection, send } from '../core/websocket/WebsocketActions';
import SimpleDialog from './SimpleDialog';
import { LOAD, roomabot_mapping_on, SAVE, START } from '../core/data/dataReducer';

const useStyles = makeStyles(theme=>({
  title: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center'
  },
  chip:{
    background: theme.palette.background.paper,
    borderRadius: theme.spacing(2),
    padding: '0 8px',
    marginLeft: '8px'
  },
  disconnect: {
    marginLeft: '1em'
  }
}))

function Header() {
  
  const classes = useStyles()
  const dispatch = useDispatch()
  const roomabotIP = useSelector(roomabot_ip)
  const connected = useSelector(roomabot_connected)
  const mappingOn = useSelector(roomabot_mapping_on)
  const [loading, setLoading] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  const disconnect = () => {
    dispatch(closeConnection())  
    setLoading(false)
    setDismissed(false)
  }

  const onPause = () => {
    dispatch(send({
      command: 'serviceRequest',
      arg0: '1'
    }))  
  }

  const onPlay = () => {
    setLoading(true)
    dispatch(send({
      command: START,
      arg1: '',
      arg2: ''
    }))
  }
  
  const onSave = () => {
    dispatch(send({
      command: SAVE,
      arg1: '',
      arg2: ''
    }))
  }
  const onLoad = () => {
    dispatch(send({
      command: LOAD,
      arg1: '',
      arg2: ''
    }))
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
      <SimpleDialog 
        open={connected && !mappingOn && !dismissed} 
        title="Mapping" 
        confirmDisabled={loading}
        text={"Roomabot is not mapping currently."} 
        confirmText={loading ? 'Starting...' : 'Start Mapping'}
        onClose={handleDialogAction}
      />
        <AppBar position="fixed">
          <Toolbar>
            <div className={classes.title}>
              <Typography variant="h6" >
                Roomabot
              </Typography>
              {/* { connected && <Chip label={roomabotIP}/>} */}
              { connected && 
                <div className={classes.chip}>
                  <Typography color="textSecondary" variant="body2">{roomabotIP}</Typography>
                </div>
              }
            </div>
            {/* <span></span> */}
            {
              connected && 
              <React.Fragment>
                <IconButton 
                  title={mappingOn ? "Pause Mapping" : (loading ? "Loading..." : "Resume Mapping")} 
                  color="inherit"
                  onClick={mappingOn && !loading ? onPause : onPlay}
                >
                  {
                    mappingOn ? 
                      <Pause /> 
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
