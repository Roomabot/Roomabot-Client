import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography, CssBaseline, makeStyles, Paper, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Drawer } from '@material-ui/core';
import { AddLocationRounded, CreateRounded, DoubleArrowRounded, StraightenRounded } from '@material-ui/icons';
import { current_tool, selectTool } from '../core/tools/toolReducer';
import { TOOL } from '../core/tools/model';
const useStyles = makeStyles(theme=>({
  root: {
    display: 'grid',
    width:'10em'
  }, 
  drawer:{
    height:'300px',
    borderRadius: '0 8px 8px 0',
    top: '10%',
    boxShadow: theme.shadows[4]
  },
  toolIcons: {
    display: 'grid',
    gridTemplateColumns: '32px auto',
    gridTemplateRows: 'auto' 
  },
  selected: {
    background: theme.palette.primary.main
  }
}))
const TOOLS = [
  {icon: <StraightenRounded/>, name: 'Measure', id: TOOL.MEASURE}, 
  {icon: <AddLocationRounded/>, name: 'Point', id: TOOL.MARKER},
  {icon: <CreateRounded/>, name: 'Markup', id: TOOL.OVERLAY},
]

function Tools() {
  const classes = useStyles()
  const currentTool = useSelector(current_tool)
  const dispatch = useDispatch()
  const handleToolSelection = (tool) => {
    dispatch(selectTool(tool))
  } 
  
  return (
    // <Paper>
    <Drawer 
      anchor="left"
      variant="persistent" 
      classes={{ paper: classes.drawer }} 
      open={true}
      hideBackdrop={true}
    >
      <div className={classes.header}>
        <Typography>
         Tools 
        </Typography>
        <DoubleArrowRounded/>      
      </div>
      <List>
        {TOOLS.map((tool, index) => (
          <ListItem className={`${tool.id === currentTool ? classes.selected : ''}`} button key={tool.name} onClick={() => handleToolSelection(tool.id)}>
            <ListItemIcon style={{minWidth: '32px'}}>
              <Typography style={{textAlign: 'center'}}>{tool.icon}</Typography>
            </ListItemIcon>
            <ListItemText primary={tool.name} />
          </ListItem>
        ))}
      </List>
      {/* <div className={classes.toolIcons}>
        
        <Typography>Measure</Typography>
        <Typography style={{textAlign: 'center'}}>📍</Typography>
        <Typography>Point</Typography>
        <Typography style={{textAlign: 'center'}}></Typography>
        <Typography>Markup</Typography>
        <Typography>3D</Typography>
      </div> */}
    </Drawer>
    // </Paper>
  )
}

export default Tools
