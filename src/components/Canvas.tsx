import { makeStyles } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import '../App.css'
import { ThreeCanvas } from '../threeJS/main'
import { useDispatch, useSelector } from 'react-redux'
import { roomabot_map } from '../core/data/dataReducer'
import { subscribe } from '../core/websocket/WebsocketActions';
import { ROS_TOPICS } from '../core/ros/rosTopics';

const useStyles = makeStyles(theme=>({
  root:{
    // border: '1px solid grey',
    // borderRadius: theme.spacing(1),
    width:'100vw',
    // padding: theme.spacing(2),
    display: 'grid',
    gridTemplateRows: '54px auto',
    overflowY: 'hidden',
    height: '100%'
  }
  
}))
// initalize canvas instance
const threeCanvas = new ThreeCanvas()

/**
 * Primary Container for the Map
 * @param props ReactProps
 */
function CanvasScene (props){
  const classes = useStyles()
  var threeContainer = null;
  const map = useSelector(roomabot_map)
  const dispatch = useDispatch()
  
  useEffect(() => {
    const mapScene = threeCanvas.getMapScene()
    if (mapScene && map){
      const occupancyGrid = mapScene.getOccupancyGrid()
      occupancyGrid.updateMap(map)
    }
  }, [map])

  useEffect(()=>{
    threeCanvas.init(threeContainer)
  }, [threeContainer])
  
  useEffect(() => {
    dispatch(subscribe(ROS_TOPICS.MAP))
    return () => {
      threeCanvas.unBindEventListeners()
    }
  }, [])

  return (
    <div 
      id="canvas-div" 
      className={classes.root}
      ref={element => threeContainer = element}
    >
    </div>
  );
}

export default CanvasScene
