import { Box, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Map from '../Map'
import DrivingControls from './DrivingControls'

const KEY_EVENT = {DOWN: 0, UP: 1}
const KEY_UP = "ArrowUp"
const KEY_LEFT = "ArrowLeft"
const KEY_DOWN = "ArrowDown"
const KEY_RIGHT = "ArrowRight"
function Dashboard(props) {
  const [key, setKey] = useState('')
  const handleKeyEvent = (type, e) => {
    switch (e.key) {
      case KEY_UP:
        setKey(e.key)
        break
      case KEY_DOWN:
        setKey(e.key)
        break
      case KEY_RIGHT:
        setKey(e.key)
        break
      case KEY_LEFT:
        setKey(e.key)
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
    <Box p={3}>
      <Typography variant="h3">
        Dashboard
      </Typography>
      <Map IP={IP}/>
      <Typography>
        Pressed : {key}
      </Typography>
      <DrivingControls/>
    </Box>
  )
}

export default Dashboard
