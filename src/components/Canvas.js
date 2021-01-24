import { makeStyles } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import '../App.css'
import mainScene from '../threeJS/main'

const useStyles = makeStyles(theme=>({
  root:{
    border: '1px solid grey',
    borderRadius: theme.spacing(1)
  }
}))
function CanvasScene (){
  const classes = useStyles()
  var threeContainer = null;
  const [canvas, setCanvas] = useState(null)
  
  useEffect(()=>{
	  setCanvas(mainScene(threeContainer))
  }, [threeContainer])

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
