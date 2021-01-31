import { makeStyles } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import '../App.css'
import { ThreeCanvas } from '../threeJS/main'
import { useSelector } from 'react-redux'
import { roomabot_map } from '../core/data/dataReducer'

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
const threeCanvas = new ThreeCanvas()
function CanvasScene (props){
  const classes = useStyles()
  var threeContainer = null;
  const map = useSelector(roomabot_map)
  
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
