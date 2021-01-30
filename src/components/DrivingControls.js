import { Button, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { send } from '../core/websocket/WebsocketActions'
import { useDispatch } from 'react-redux'


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

const useStyles = makeStyles(theme=>({
  status: {
    borderRadius: theme.spacing(4),
    boxShadow: theme.shadows[12],
    background: theme.palette.background.paper,
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px` 
  }
}))
function DrivingControls() {
  const socket = window.__socket
  const [command, setCommand] = useState(DRIVE.STOPPED)
  const dispatch = useDispatch()
  const classes = useStyles()

  const drive = (c, prev) => {
		if (c === prev.instruction){
			return null
		}
		dispatch(send({
        command: 'drive',
        data: c
    }))
		prev.instruction = c 
		setCommand(c)
  }
  
  const handleKeyEvent = (e, type, prev) => {
    if (!socket){
      console.info('Socket null', window)
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
  
  return (
    <div className={classes.status}>
      <Typography>
        <strong>
          Driving: {command}
        </strong>
      </Typography>
    </div>
  )
}

export default DrivingControls
