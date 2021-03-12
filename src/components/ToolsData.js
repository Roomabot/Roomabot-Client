import { Button, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { measuredDistance } from '../core/tools/toolReducer'
import { useSelector } from 'react-redux'


const useStyles = makeStyles(theme=>({
  root: {
    position: "fixed",
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: theme.spacing(4),
    borderRadius: theme.spacing(1.5),
    boxShadow: theme.shadows[12],
    background: theme.palette.background.paper,
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px` 
  }
}))
function ToolsData() {
  const classes = useStyles()
  const distance = useSelector(measuredDistance)
  
  return (
    <div className={classes.root}>
      <Typography>
          Distance: {distance.toFixed(3)}m
      </Typography>
    </div>
  )
}

export default ToolsData
