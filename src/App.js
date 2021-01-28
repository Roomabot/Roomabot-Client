import React, { useEffect, useState } from 'react';
import './App.css';
import Map from './Map';
import { AppBar, Box, Button, Container, CssBaseline, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import Connect from './components/Connect';
import Dashboard from './components/Dashboard';
import yaml from 'js-yaml';
import LoadIcon from '@material-ui/icons/ReplayOutlined'
import { Folder, Pause, SaveOutlined } from '@material-ui/icons';

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
}))

const KEY_EVENT = {DOWN: 0, UP: 1}
const KEY_FORWARD = "ArrowUp"
const KEY_W = "w"
const KEY_A = "a"
const KEY_S = "s"
const KEY_D = "d"
const KEY_LEFT = "ArrowLeft"
const KEY_BACK = "ArrowDown"
const KEY_RIGHT = "ArrowRight"
const DRIVE = { STOPPED: "Stopped", FORWARD: "Forward", BACK: "Back", CCW: 'CCW', CW: 'CW'}

const lastIP = localStorage.getItem("ip")
var socket = null
function App() {
  const classes = useStyles()
  const [roomabotIP, setIP] = useState(lastIP)
  const [connected, setConnected] = useState(false)
  const [error, setError] = useState('')
  const onConnect = (status, ip) => {
    setIP(ip)
    localStorage.setItem('ip', ip)
    setConnected(status)
  }
  const onError = (e) => setError(e)
  // const [key, props.onKey] = useState('')
	const [data, setData] = useState(0)
	const [key, setKey] = useState(DRIVE.STOPPED)
	const [map, setMap] = useState(null)
	const connect = (status, ip) => {
    const WS_ENDPOINT = `wss://${ip}:6001`
    socket = new WebSocket(WS_ENDPOINT)
    socket.onopen = ( ) => onConnect(status, ip)
    socket.onerror = () => onError()
    socket.onmessage = function (event) {
			try {
				const doc = yaml.load(event.data);
				setMap(map)
				console.log(doc);
			} catch (e) {
				console.log(e);
			}
			setData(event.data);
		}
  }
	useEffect(() => {
		// TODO: abstract and clean up code
		
		console.log('ON MESAGE')
		
		var prev = { instruction: DRIVE.STOPPED };
		const keyDownHandler = (e) => handleKeyEvent(e, KEY_EVENT.DOWN, prev)
    const keyUpHandler = (e) => handleKeyEvent(e, KEY_EVENT.UP, prev)
    document.addEventListener('keydown', keyDownHandler)
    document.addEventListener('keyup', keyUpHandler)
		
		
		// CLEAN UP THE EFFECT
    return () => {
			document.removeEventListener('keydown', keyDownHandler)
      document.addEventListener('keyup', keyUpHandler)
		}
	
	}, []);
	
	const drive = (instrc, prev) => {
		if (instrc === prev.instruction){
			return null
		}
		socket.send(instrc)
		prev.instruction = instrc 
		setKey(instrc)
	}

	const handleKeyEvent = (e, type, prev) => {
    if (!socket){
      console.info('Socket null')
      return
    }
		var k;
    switch (e.key) {
      case KEY_FORWARD:
      case KEY_W:
				k = type === KEY_EVENT.DOWN ? DRIVE.FORWARD : DRIVE.STOPPED
        drive(k, prev)
        break
      case KEY_BACK:
			case KEY_S:
				k = type === KEY_EVENT.DOWN ? DRIVE.BACK : DRIVE.STOPPED
        drive(k, prev)
        break
			case KEY_RIGHT:
			case KEY_D:
				k = type === KEY_EVENT.DOWN ? DRIVE.CW : DRIVE.STOPPED
        drive(k, prev)
        break
      case KEY_LEFT:
			case KEY_A:
				k = type === KEY_EVENT.DOWN ? DRIVE.CCW : DRIVE.STOPPED
        drive(k, prev)
        break
      default:
        break
    }
  }
  console.info(' Key :', key)
  return (
    <div className={classes.root}>
      <CssBaseline/>
      <React.Fragment>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Roomabot
            </Typography>
            <span></span>
            <IconButton title="Pause Mapping" color="inherit">
              <Pause/>
            </IconButton>
            <IconButton title="Load Saved Map" color="inherit">
              <Folder/>
            </IconButton>
            <IconButton title="Save Current Map" color="inherit">
              <SaveOutlined/>
            </IconButton>
          </Toolbar>
        </AppBar>
      </React.Fragment>
      <div className={classes.mapView}>
        <Toolbar/>
        {
          !connected &&
          <Connect lastIP={lastIP} connect={connect} error={error}/>
        }
        { connected && 
          <React.Fragment>
            <Dashboard IP={roomabotIP} drive={key}/>
            <Map/>
            {/* <DrivingControls/> */}
          </React.Fragment>
        }
      </div>
    </div>
  );
}

export default App;
