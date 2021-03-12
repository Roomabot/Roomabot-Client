import React, { useEffect } from 'react'
import DrivingControls from './DrivingControls'
import { makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { subscribe, unsubscribe } from '../core/websocket/WebsocketActions';
import Tools from './Tools';
import ToolsData from './ToolsData';


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

function DashboardOverlay() {
  
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
      <ToolsData/>
      <Tools/>
    </div>

  )
}

export default DashboardOverlay
