import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

// import HomeSections component
import Game from './Game';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

/**
 *function is to animation of dialog screen
 * @return {Component}
 */

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/**
 *Component to open a dialog screen
 * @return {React.ReactElement}
 */

export default function FullScreenDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>

      <h1>Lets have a fun!</h1>
      <p>Lets see your performing of knowledge</p>

      {/* <img
        className={classes.imgage}
        src={image} alt=''
        /> */}

      <Button variant="outlined" color="primary" onClick={handleClickOpen}
        testid='buttonId'>
        Knowlege Game
      </Button>
      <Dialog fullScreen open={open} testid='dialogId'
        onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar} testid='appBarId'>
          <Toolbar testid='toolbarId'>
            <IconButton edge="start" testid='iconButtonId'
                color="inherit" onClick={handleClose} aria-label="close" >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}
              testid='typographyId'>
                Test your knowledge of alignment
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={handleClose}
              testid='InnerButtonId'
              >Close</Button>
          </Toolbar>
        </AppBar>
        <Game />

      </Dialog>
    </div>
  );
}
