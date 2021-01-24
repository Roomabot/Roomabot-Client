import React, { useState } from 'react';
import './App.css';
import Map from './Map';
import { Container, CssBaseline, makeStyles } from '@material-ui/core';
import Connect from './components/Connect';
import Dashboard from './components/Dashboard';

const useStyles = makeStyles(()=>({
  root: {
    display: 'grid',
    justifyContent:'center'
  }
}))

function App() {
  const classes = useStyles()
  const [roomabotIP, setIP] = useState('192.168.0.142')
  const [connected, setConnected] = useState(false)

  const onConnect = (status, ip) => {
    setConnected(true)
    setIP(ip)
  }

  return (
    <div className="App">
      <CssBaseline/>
      <Container className={classes.root}>
        {
          !connected &&
          <Connect setConnected={setConnected}/>
        }
        { connected && 
          <Dashboard IP={roomabotIP}/>
        }
      </Container>
    </div>
  );
}

export default App;
