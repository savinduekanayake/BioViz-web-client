import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import {makeStyles} from '@material-ui/core/styles';
import {Box, IconButton} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import {useSelector, useDispatch} from 'react-redux';
import {closeSnackbar} from '../../Redux/Actions/Snackbar';

const useStyles = makeStyles((theme) => ({
    message: {
        color: 'white',
        backgroundColor: '#F44336',
        // paddingLeft: 3,
        // paddingRight: 3,
        borderRadius: 10,
        fontSize: 15,
        height: 20,
    },
    icon: {
        color: 'white',
    },
}));


/**
 * Components to diaply alerts and warnings in the buttom as a snackbar
 * @return {React.ReactElement}
 */
export default function SnackbarAlert() {
    const classes = useStyles();
    const dispatch = useDispatch();

    /**
     * current message to display is fetched form redux state
     */
    const snackbarInfo = useSelector((state) => state.snackBar);


    const handleClose = (event, reason) => {
        console.log('closing');
        if (reason === 'clickaway') {
            return;
        }
        dispatch(closeSnackbar());
    };

    return (
        <div>
            <Snackbar
                open={snackbarInfo.open}
                autoHideDuration={6000}
                onClose={handleClose}>
                <Box >
                    <table className={classes.message}>
                        <tbody>
                            <tr>
                                <td style={{width: 50}}>
                                    <div>
                                        <ErrorOutlineIcon fontSize='small'/>
                                    </div>
                                </td>
                                <td><div>{snackbarInfo.message}</div></td>
                                <td>
                                    {/* button to close */}
                                    <IconButton
                                        onClick={handleClose}
                                        className={classes.icon}>
                                        <CloseIcon fontSize='small'/>
                                    </IconButton>
                                </td>
                            </tr>
                        </tbody>
                    </table>


                </Box>

            </Snackbar>
            {/* <Box color="red">This is an error message!</Box>
      <Box color="yellow">This is a warning message!</Box> */}

        </div>
    );
}
