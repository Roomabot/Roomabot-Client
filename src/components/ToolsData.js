import { makeStyles, Typography } from '@material-ui/core'
import React, {  } from 'react'
import { measuredDistance } from '../core/tools/toolReducer'
import { useSelector } from 'react-redux'
import { TOOL } from '../core/tools/model'


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
  const current_tool = useSelector(current_tool)

  return (
    <div className={classes.root}>
      { current_tool === TOOL.MEASURE &&
        <Typography>
          Distance: {distance.toFixed(3)}m
        </Typography>
      }
      {/* { current_tool === TOOL.PAN && 
        <Typography>
          Driving: 
        </Typography>
      } */}
    </div>
  )
}

export default ToolsData
