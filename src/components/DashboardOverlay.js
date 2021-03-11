import { Box, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Map from '../Map'
import DrivingControls from './DrivingControls'
import { Container, CssBaseline, makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { subscribe, unsubscribe } from '../core/websocket/WebsocketActions';
import Tools from './Tools';


const useStyles = makeStyles(theme=>({
  overlay:{
    position: "absolute",
    width:'100vw',
    padding: theme.spacing(2),
    display: 'grid',
    top: '64px'
  },
  bar: {
    display: 'flex',
    alignItems:'center',
    justifyContent: 'flex-end'
  },
  tools: {
    display: 'grid',
  }
}))

function DashboardOverlay(props) {
  
  const dispatch = useDispatch()

  useEffect(() => {
    const statusTopic = {topic: '/status', msgType: 'roomabot/serviceCommand'}
    dispatch(subscribe(statusTopic))
    return () => {
      dispatch(unsubscribe(statusTopic))
    }
  }, [])

  const classes = useStyles()
  return (
    <div className={classes.overlay}>
      <div className={classes.bar}>
        {/* <Typography variant="h3">
          Map
        </Typography> */}
        <div className={classes.keyStatus}>
          <DrivingControls/>
        </div>
        <div className={classes.tools}></div> 
      </div>
      <Tools/>
    </div>

  )
}

export default DashboardOverlay
