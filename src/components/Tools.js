import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography, makeStyles, List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import { Drawer } from '@material-ui/core';
import { AddLocationRounded, CreateRounded, StraightenRounded } from '@material-ui/icons';
import { current_tool, selectTool } from '../core/tools/toolReducer';
import { TOOL } from '../core/tools/model';
const useStyles = makeStyles(theme=>({
  root: {
    display: 'grid',
    width:'10em'
  }, 
  drawer:{
    height:'auto',
    width: theme.toolbarWidth,
    borderRadius: theme.spacing(1.5),
    margin: theme.spacing(2),
    top: 'auto',
    border: 'none',
    boxShadow: theme.shadows[4]
  },
  toolIcons: {
    display: 'grid',
    gridTemplateColumns: '32px auto',
    gridTemplateRows: 'auto' 
  },
  selected: {
    background: theme.palette.primary.main,
    color: theme.palette.getContrastText(theme.palette.primary.main)
  },
  selectedIcon: {
    color: theme.palette.getContrastText(theme.palette.primary.main)
  },
  header: {
    textAlign: 'center',
    padding:theme.spacing(1)
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
      anchor="right"
      variant="persistent" 
      classes={{ paper: classes.drawer }} 
      open={true}
      hideBackdrop={true}
    >
      <div className={classes.header}>
        <Typography>
         <strong>Tools</strong> 
        </Typography>
      </div>
      <Divider/>
      <List>
        {TOOLS.map((tool) => (
          <ListItem className={`${tool.id === currentTool ? classes.selected : ''}`} button key={tool.name} onClick={() => handleToolSelection(tool.id)}>
            <ListItemIcon className={`${tool.id === currentTool ? classes.selectedIcon : ''}`} style={{minWidth: '32px'}}>
              {tool.icon}
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
