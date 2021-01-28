import { Box, Button } from '@material-ui/core';

import React, { useEffect, useState } from 'react'
import socketIOClient from "socket.io-client"
import CanvasScene from './components/Canvas';

/* 
	todo: fetch the ip dynamically
		- find all ips and device names on local network
		- ask user if they want to connect with roomabot (can identify by name / mac address)
*/ 
// const ENDPOINT = "http://192.168.0.142:6001";

function Map(props) {
	const {map} = props
  
	return (
		<CanvasScene map={map}/>		
	)
}

export default Map
