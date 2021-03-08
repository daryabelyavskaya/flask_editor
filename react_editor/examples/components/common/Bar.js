import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  AppBar,
  Toolbar,
  Typography
} from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, 
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Bar() {
  const classes = useStyles();

  return (
    <AppBar position="absolute" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
	<Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
	  Zesla Group Document Editor
	</Typography>
    
      </Toolbar>
    </AppBar>
  )
}
