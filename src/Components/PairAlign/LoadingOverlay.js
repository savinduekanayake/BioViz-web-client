import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Grid} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: 'yellow',
      backgroundColor: '#000000CC',
    },
    circularProgress: {
        color: 'white',
    },
  }));

/**
 * Component to display loading overlay while fetching data
 * @return {React.ReactElement}
 */
export default function LoadingOverlay() {
    const classes = useStyles();

    return (
        <div>
            <Backdrop
            className={classes.backdrop}
            open={true}>
                    <Grid container direction="column">
                        <Grid item>
                            <CircularProgress
                            thickness={6}
                            className={classes.circularProgress}/>
                        </Grid>
                        <Grid item>
                            Fetching Results
                        </Grid>
                    </Grid>
            </Backdrop>

        </div>
    );
}
