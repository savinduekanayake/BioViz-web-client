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
import SaveIcon from '@material-ui/icons/Save';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import VisibilityIcon from '@material-ui/icons/Visibility';

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

const useStyles = makeStyles((theme) => ({
    position: {
      marginTop: '20px',
      marginLeft: '85%',
    },
  }));

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

/**
 * Component to visualize a Alert
 * @param {String} viewResult - type of result
 * @param {String} title - title of the alert
 * @param {String} description - description of the alert
 * @return {React.ReactElement}
 */

export default function CustomizedDialogs({viewResult, title, description}) {
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

    {
      viewResult?
        <Button
        testid='saveButtonId'
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<VisibilityIcon />}
        onClick={handleClickOpen}
      >
        view Result
        </Button> :
        <Button
        testid='saveButtonId'
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<SaveIcon />}
        onClick={handleClickOpen}
        >
        Save
        </Button>
    }
      <Dialog
        testid='dialogId'
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        >
        <DialogTitle
            testid='dialogTitleId'
            id="customized-dialog-title"
            onClose={handleClose}
            >
          {title}
        </DialogTitle>
        <DialogContent testid='dialogContentId' dividers>
          <Typography testid='typographyId' gutterBottom>
            {description}
          </Typography>
        </DialogContent>
        <DialogActions testid='dialogActionsId'>
          <Button
            testid='closeButtonId'
            autoFocus onClick={handleClose}
            color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

CustomizedDialogs.propTypes = {
    viewResult: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
  };
