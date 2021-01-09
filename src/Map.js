import React, { useEffect } from 'react'
import socketIOClient from "socket.io-client"

/* 
	todo: fetch the ip dynamically
		- find all ips and device names on local network
		- ask user if they want to connect with roomabot (can identify by name / mac address)
*/ 
const ENDPOINT = "http://192.168.0.142:6001";

function Map() {

	const [data, setData] = useState(0)

	useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("data", data => {
			console.log(data)
			setData(data);
		});
		
		// CLEAN UP THE EFFECT
    return () => socket.disconnect();
	
	}, []);
	
	return (
		<div>
			{ data }		
		</div>
	)
}

export default Map
