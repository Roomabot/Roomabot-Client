import { Box, Button } from '@material-ui/core';
import yaml from 'js-yaml';
import React, { useEffect, useState } from 'react'
import socketIOClient from "socket.io-client"
import CanvasScene from './components/Canvas';

/* 
	todo: fetch the ip dynamically
		- find all ips and device names on local network
		- ask user if they want to connect with roomabot (can identify by name / mac address)
*/ 
// const ENDPOINT = "http://192.168.0.142:6001";

const KEY_EVENT = {DOWN: 0, UP: 1}
const KEY_FORWARD = "ArrowUp"
const KEY_LEFT = "ArrowLeft"
const KEY_BACK = "ArrowDown"
const KEY_RIGHT = "ArrowRight"
const STOPPED = "Stopped"
function Map(props) {
	
  // const [key, props.onKey] = useState('')
	const [data, setData] = useState(0)
	
	useEffect(() => {
		const WS_ENDPOINT = `ws://${props.IP}:6001`
		console.log('ON MESAGE')
		const socket = new WebSocket(WS_ENDPOINT)
		const keyDownHandler = (e) => handleKeyEvent(socket, KEY_EVENT.DOWN, e)
    const keyUpHandler = (e) => handleKeyEvent(socket, KEY_EVENT.UP, e)
    document.addEventListener('keydown', keyDownHandler)
    document.addEventListener('keyup', keyUpHandler)
		socket.onmessage = function (event) {
			try {
				const doc = yaml.load(event.data);
				console.log(doc);
			} catch (e) {
				console.log(e);
			}
			setData(event.data);
		}
		
		// CLEAN UP THE EFFECT
    return () => {
			document.removeEventListener('keydown', keyDownHandler)
      document.addEventListener('keyup', keyUpHandler)
			socket.onmessage = null
		}
	
	}, [props.IP]);
	
	const drive = (socket, instrc) => {
		socket.send(instrc)
		props.onKey(instrc)
	}

	const handleKeyEvent = (socket, type, e) => {
		var k;
    switch (e.key) {
      case KEY_FORWARD:
				k = type === KEY_EVENT.DOWN ? "Forward" : STOPPED
        drive(socket, k)
        break
      case KEY_BACK:
				k = type === KEY_EVENT.DOWN ? "Back" : STOPPED
        drive(socket, k)
        break
			case KEY_RIGHT:
				k = type === KEY_EVENT.DOWN ? "Clockwise" : STOPPED
        drive(socket, k)
        break
      case KEY_LEFT:
				k = type === KEY_EVENT.DOWN ? "Counter clockwise" : STOPPED
        drive(socket, k)
        break
      default:
        break
    }
  }
	// useEffect(() => {
    
  //   return () => {
      
  //   }
  // }, [])
	return (
		<Box>
			{/* { data } */}
			<CanvasScene/>		
		</Box>
	)
}

export default Map
