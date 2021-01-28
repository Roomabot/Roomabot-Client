import React, { useEffect, useState } from 'react';
import { ReactComponent as Logo } from '../logo.svg';
import { Box, Button, CircularProgress, Container, CssBaseline, Divider, makeStyles, TextField, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme=>({
  root: {
    display: 'grid',
    justifyContent:'center',
    alignContent: 'baseline',
    textAlign: 'center',
    width: '100%',
    margin: '0 auto',
    justifyItems: 'center'
  },
  connect: {
    width: '300px'
  },
  logo: {
    fill: theme.palette.primary.main,
    width: '200px'
  },
  input: {
    textAlign: 'center'
  },
  error: {
    marginTop: theme.spacing(2)
  } 
}))

function Connect(props) {
  const classes = useStyles()
  const [roomabotIP , setIP] = useState(props.lastIP)
  const { loading, error } = props
  return (
    <Box p={3} className={classes.root}>
    <Logo className={classes.logo}/>
    <TextField 
      variant="outlined"
      label="IP"
      autoFocus
      autoSave
      InputProps={{
        classes: { input: classes.input }
      }}
      value={roomabotIP}
      onChange={e => setIP(e.target.value)}
    />
    <Divider style={{margin: '8px'}} />
    <Button 
      variant="outlined"
      onClick={() => props.connect(true, roomabotIP)}
      className={classes.connect}
    >
      { loading ? 
        <CircularProgress size={24}/>
        :
        'Connect to Roomabot'
      }
      
    </Button>
    { error && 
      <Typography className={classes.error} color="error">
        {error}
      </Typography>
    }
    </Box>
  )
}

export default Connect
