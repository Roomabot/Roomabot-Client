import React, { useState } from 'react';
import './App.css';
import Map from './Map';
import { CssBaseline, makeStyles, Toolbar } from '@material-ui/core';
import Connect from './components/Connect';
import DashboardOverlay from './components/DashboardOverlay';
import { roomabot_connected, roomabot_connecting, roomabot_connection_error, roomabot_ip } from './core/websocket/websocketReducer';
import { useSelector, useDispatch } from 'react-redux'
import { closeConnection } from './core/websocket/WebsocketActions';
import Header from './components/Header';

const useStyles = makeStyles(theme=>({
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
  },
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

const lastIP = localStorage.getItem("ip")
function App() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const roomabotIP = useSelector(roomabot_ip)
  const connected = useSelector(roomabot_connected)
  const [, setPaused] = useState()


  return (
    <div className={classes.root}>
      <CssBaseline/>
      <Header/>
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
