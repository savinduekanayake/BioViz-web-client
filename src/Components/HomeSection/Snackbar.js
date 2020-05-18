import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';

export default function SimpleSnackbar({message}) {
  const [open, setOpen] = React.useState(true);

//   const handleClick = () => {
//     setOpen(true);
//   };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
      <Snackbar
        testid='snackbarId'
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={
          <React.Fragment>
            <Button
                testid='buttonId'
                color="secondary" size="small" onClick={handleClose}>
              close
            </Button>
            <IconButton
                testid='iconButtonId'
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
  );
}
SimpleSnackbar.propTypes = {
    message: PropTypes.string,
  };
