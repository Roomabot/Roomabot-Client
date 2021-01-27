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

const lastIP = localStorage.getItem("ip")
function App() {
  const classes = useStyles()
  const [roomabotIP, setIP] = useState(lastIP)
  const [connected, setConnected] = useState(false)

  const onConnect = (status, ip) => {
    setIP(ip)
    localStorage.setItem('ip', ip)
    setConnected(status)
  }

  return (
    <div className="App">
      <CssBaseline/>
      <div className={classes.root}>
        {
          !connected &&
          <Connect lastIP={lastIP} setConnected={onConnect}/>
        }
        { connected && 
          <Dashboard IP={roomabotIP}/>
        }
      </div>
    </div>
  );
}

export default App;
