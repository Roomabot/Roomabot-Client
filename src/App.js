import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import Map from './Map';
import { Box, Button, Container, CssBaseline, Divider, makeStyles, TextField, Typography } from '@material-ui/core';
import find from 'local-devices'

const useStyles = makeStyles(theme=>({
  root: {
    display: 'grid',
    justifyContent:'center'
  }
}))
function App() {
  const classes = useStyles()
  const [roomabotIP , setIP] = useState('')
  const [connected, setConnected] = useState(false)

  return (
    <div className="App">
      <CssBaseline/>
      <Container>
        <Box p={3} className={classes.root}>
          <Typography variant="h3">
            Roomabot 
          </Typography>
          <img src={logo} className="App-logo" alt="logo" />
          <TextField 
            variant="outlined"
            label="IP"
            onChange={e => setIP(e.target.value)}
          />
          <Divider style={{margin: '8px'}} />
          <Button 
            variant="outlined"
            onClick={() => setConnected(true)}
          >
            Connect to Roomabot
          </Button>

          <span>
            { connected && 
              <Map IP={roomabotIP}/>
            }
          </span>
        </Box>
      </Container>
    </div>
  );
}

export default App;
