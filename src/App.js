import React, { useEffect, useState } from 'react';
import './App.css';
import Map from './Map';
import { AppBar, Button, Chip, CssBaseline, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import Connect from './components/Connect';
import DashboardOverlay from './components/DashboardOverlay';
import yaml from 'js-yaml';
import { Folder, Pause, SaveOutlined } from '@material-ui/icons';
import { roomabot_connected, roomabot_connecting, roomabot_connection_error, roomabot_ip } from './core/websocket/websocketReducer';
import { useSelector, useDispatch } from 'react-redux'
import { closeConnection } from './core/websocket/WebsocketActions';

const useStyles = makeStyles(()=>({
  root: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden'
  },
  mapView: {
    width: '100vw',
    height: '100%',
    display: 'grid',
    gridTemplateRows: '64px auto',
    // overflow-y: hidden/'
    // display: grid;
  },
  title: {
    flexGrow: 1,
  },
  disconnect: {
    marginLeft: '1em'
  }
}))

const lastIP = localStorage.getItem("ip")
function App() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const roomabotIP = useSelector(roomabot_ip)
  const connected = useSelector(roomabot_connected)
  const error = useSelector(roomabot_connection_error)
  const connecting = useSelector(roomabot_connecting)
  const [, setPaused] = useState()

  const onConnect = (status, ip) => {
    // setConnecting(false)
    localStorage.setItem('ip', ip)
  }

  const onPause = (pause) => {
    setPaused(pause)
  } 

  const disconnect = () => {
    dispatch(closeConnection())
  }

  const onError = () => {
    // setConnecting(false)
  }
  // const [key, props.onKey] = useState('')
	// const connect = (status, ip) => {
  //   // setConnecting(true)
  //   const WS_ENDPOINT = `wss://${ip}:6001`
  //   socket = new WebSocket(WS_ENDPOINT)
    
  //   socket.onopen = ( ) => onConnect(status, ip)
  //   socket.onclose = (e) => onError(e)
  //   socket.onerror = (e) => onError(e)
  //   socket.onmessage = function (event) {
	// 		try {
	// 			const doc = yaml.load(event.data);
	// 			setMap(map)
	// 			console.log(doc);
	// 		} catch (e) {
	// 			console.log(e);
	// 		}
	// 		setData(event.data);
	// 	}
  // }

  return (
    <div className={classes.root}>
      <CssBaseline/>
      <React.Fragment>
        <AppBar position="fixed">
          <Toolbar>
            <div>
              <Typography variant="h6" className={classes.title}>
                Roomabot
              </Typography>
              { connected && <Chip label={roomabotIP}/>}
            </div>
            <span></span>
            {
              connected && 
              <React.Fragment>
                <IconButton title="Pause Mapping" color="inherit" onClick={() => onPause(true)}>
                  <Pause />
                </IconButton>
                <IconButton title="Load Saved Map" color="inherit">
                  <Folder/>
                </IconButton>
                <IconButton title="Save Current Map" color="inherit">
                  <SaveOutlined/>
                </IconButton>
                <Button 
                  className={classes.disconnect}
                  variant="contained"
                  onClick={disconnect}
                >
                  Disconnect
                </Button>
              </React.Fragment>
            }
          </Toolbar>
        </AppBar>
      </React.Fragment>
      <div className={classes.mapView}>
        <Toolbar/>
        {
          !connected &&
          <Connect lastIP={lastIP}/>
        }
        { connected && 
          <React.Fragment>
            <DashboardOverlay IP={roomabotIP}/>
            <Map/>
            {/* <DrivingControls/> */}
          </React.Fragment>
        }
      </div>
    </div>
  );
}

export default App;
