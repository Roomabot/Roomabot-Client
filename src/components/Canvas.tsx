import { makeStyles } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import '../App.css'
import { ThreeCanvas } from '../threeJS/main'
import { useDispatch, useSelector } from 'react-redux'
import { roomabot_map } from '../core/data/dataReducer'
import { subscribe, unsubscribe } from '../core/websocket/WebsocketActions';
import { ROS_TOPICS } from '../core/ros/rosTopics';
import { current_tool } from '../core/tools/toolReducer';

const useStyles = makeStyles(theme=>({
  root:{
    width:'100vw',
    display: 'grid',
    gridTemplateRows: '54px auto',
    overflowY: 'hidden',
    height: '100%'
  },
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
  const selectedTool = useSelector(current_tool)

  useEffect(() => {
    if (threeCanvas){
      const mapScene = threeCanvas.getMapScene()
      if (mapScene){
        const tools = mapScene.getTools()
        tools.setTool(selectedTool)
      }
    }
    return () => {
    }
  }, [selectedTool])
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
      dispatch(unsubscribe(ROS_TOPICS.MAP))
      threeCanvas.unBindEventListeners()
    }
  }, [])

  return (
    <div 
      id="canvas-div" 
      className={`${classes.root} ${selectedTool}`}
      ref={element => threeContainer = element}
    >
    </div>
  );
}

export default CanvasScene
