import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const {children, classes, onClose, ...other} = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton
                aria-label="close"
                className={classes.closeButton}
                onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function GameInstruction() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button
            variant="outlined"
            color="primary"
            onClick={handleClickOpen}>
                Instructions
            </Button>
            <Dialog
            onClose={handleClose}
             aria-labelledby="customized-dialog-title"
             open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    How to Play
                </DialogTitle>
                <DialogContent dividers>
                        <ul>
                            <li><h3>Click on an element in the sequence
                                 to move the whole sequence starting
                                  from that point, to the right.</h3></li>
                            <li><h3>Try to avoid unnecessary gaps
                                 in the middle of the sequences.</h3></li>
                            <li><h3>Trailing gaps cannot be removed.</h3></li>
                            <li><h3>Make matches as much as possible.</h3></li>
                            <li><h3>Change the Match,Mismatch and Gap scores
                                 to get a higher score.</h3></li>
                        </ul>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        OK
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
