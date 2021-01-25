import { Box, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Map from '../Map'
import DrivingControls from './DrivingControls'
import { Container, CssBaseline, makeStyles } from '@material-ui/core';


const useStyles = makeStyles(theme=>({
  root:{
    height: '100vh',
    width:'100vw',
    padding: theme.spacing(2),
    display: 'grid',
    gridTemplateRows: '54px auto',
    overflowY: 'hidden'
  },
  bar: {
    padding: '0 24px',
    display: 'flex',
    alignItems:'center',
    justifyContent: 'space-between'
  }
}))

function Dashboard(props) {

  const [key, setKey] = useState('')
  const classes = useStyles()
  
  const { IP } = props
  return (
    <div className={classes.root}>
      <div className={classes.bar}>
        <Typography variant="h3">
          Map
        </Typography>
        <div className={classes.keyStatus}>
          <Typography variant="h5">
            Driving : {key}
          </Typography>
        </div>
      </div>
      <Box p={3}>
        <Map IP={IP} onKey={k => setKey(k)}/>
        {/* <DrivingControls/> */}
      </Box>
    </div>

  )
}

export default Dashboard
