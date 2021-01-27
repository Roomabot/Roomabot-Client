import { makeStyles } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import '../App.css'
import { ThreeCanvas } from '../threeJS/main'

const useStyles = makeStyles(theme=>({
  root:{
    border: '1px solid grey',
    borderRadius: theme.spacing(1)
  }
}))
function CanvasScene (props){
  const classes = useStyles()
  var threeContainer = null;
  const [canvas, setCanvas] = useState(null)
  
  useEffect(()=>{
    const tCanvas = new ThreeCanvas(threeContainer)
	  setCanvas(tCanvas)
  }, [threeContainer])

  useEffect(() => {
  }, [props.map])

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
