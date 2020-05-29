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

export default function SnackbarAlert(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
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
