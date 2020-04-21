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
                    <Typography gutterBottom>
                        <ul>
                            <li>Click on an element in the sequence
                                 to move the whole sequence starting
                                  from that point, to the right.</li>
                            <li>Try to avoid unnecessary gaps
                                 in the middle of the sequences.</li>
                            <li>Trailing gaps cannot be removed.</li>
                            <li>Make matches as much as possible.</li>
                            <li>Change Match,Mismatch and Gap scores
                                 to get higher score.</li>
                        </ul>
                    </Typography>
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
