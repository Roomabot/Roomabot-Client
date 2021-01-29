import { makeStyles } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import '../App.css'
import { ThreeCanvas } from '../threeJS/main'

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
