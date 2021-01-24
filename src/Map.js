import { Box, Button } from '@material-ui/core';
import yaml from 'js-yaml';
import React, { useEffect, useState } from 'react'
import socketIOClient from "socket.io-client"

/* 
	todo: fetch the ip dynamically
		- find all ips and device names on local network
		- ask user if they want to connect with roomabot (can identify by name / mac address)
*/ 
// const ENDPOINT = "http://192.168.0.142:6001";

function Map(props) {
	const [data, setData] = useState(0)
	const [socket, setSocket] = useState(null)
	
	useEffect(() => {
		const WS_ENDPOINT = `ws://${props.IP}:6001`
		console.log('ON MESAGE')
		const socket = new WebSocket(WS_ENDPOINT)
		setSocket(socket)
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
			socket.onmessage = null
		}
	
	}, [props.IP]);
	
	const sendDrive = () => {
		socket.send('Up')
	}

	return (
		<Box>
			{ data }		
			<Button 
				variant="outlined"
				onClick={() => sendDrive()}	
			>
				Send Bop
			</Button>
		</Box>
	)
}

export default Map
