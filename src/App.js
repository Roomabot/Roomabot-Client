import React, { useState } from 'react';
import './App.css';
import Map from './Map';
import { Container, CssBaseline, makeStyles } from '@material-ui/core';
import Connect from './components/Connect';
import Dashboard from './components/Dashboard';

const useStyles = makeStyles(()=>({
  root: {
    display: 'grid',
    width: '100vw',
    height: '100vh',
    justifyContent:'center'
  }
}))

function App() {
  const classes = useStyles()
  const [roomabotIP, setIP] = useState('192.168.0.142')
  const [connected, setConnected] = useState(false)

  const onConnect = (status, ip) => {
    setIP(ip)
    setConnected(true)
  }

  return (
    <div className="App">
      <CssBaseline/>
      <div className={classes.root}>
        {
          !connected &&
          <Connect setConnected={onConnect}/>
        }
        { connected && 
          <Dashboard IP={roomabotIP}/>
        }
      </div>
    </div>
  );
}

export default App;
