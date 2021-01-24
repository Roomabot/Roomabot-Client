import { Box, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Map from '../Map'
import DrivingControls from './DrivingControls'
import { Container, CssBaseline, makeStyles } from '@material-ui/core';

const KEY_EVENT = {DOWN: 0, UP: 1}
const KEY_FORWARD = "ArrowUp"
const KEY_LEFT = "ArrowLeft"
const KEY_BACK = "ArrowDown"
const KEY_RIGHT = "ArrowRight"
const STOPPED = "Stopped"
const useStyles = makeStyles(theme=>({
  root:{
    height: '100vh',
    width:'100vw',
    padding: theme.spacing(2),
    display: 'grid',
    gridTemplateRows: '54px auto',
    overflowY: 'hidden'
  },
  bar: {
    padding: '0 24px',
    display: 'flex',
    alignItems:'center',
    justifyContent: 'space-between'
  }
}))

function Dashboard(props) {
  const [key, setKey] = useState('')
  const classes = useStyles()
  const handleKeyEvent = (type, e) => {
    switch (e.key) {
      case KEY_FORWARD:
        setKey(type === KEY_EVENT.DOWN ? "Forward" : STOPPED)
        break
      case KEY_BACK:
        setKey(type === KEY_EVENT.DOWN ? "Back" : STOPPED)
        break
      case KEY_RIGHT:
        setKey(type === KEY_EVENT.DOWN ? "Clockwise" : STOPPED)
        break
      case KEY_LEFT:
        setKey(type === KEY_EVENT.DOWN ? "Counter clockwise" : STOPPED)
        break
      default:
        break
    }
  }

  
  useEffect(() => {
    const keyDownHandler = (e) => handleKeyEvent(KEY_EVENT.DOWN, e)
    const keyUpHandler = (e) => handleKeyEvent(KEY_EVENT.UP, e)
    document.addEventListener('keydown', keyDownHandler)
    document.addEventListener('keyup', keyUpHandler)
    return () => {
      document.removeEventListener('keydown', keyDownHandler)
      document.addEventListener('keyup', keyUpHandler)
    }
  }, [])
  
  const { IP } = props
  return (
    <div className={classes.root}>
      <div className={classes.bar}>
        <Typography variant="h3">
          Map
        </Typography>
        <div className={classes.keyStatus}>
          <Typography variant="h5">
            Driving : {key}
          </Typography>
        </div>
      </div>
      <Box p={3}>
        <Map IP={IP}/>
        {/* <DrivingControls/> */}
      </Box>
    </div>

  )
}

export default Dashboard
