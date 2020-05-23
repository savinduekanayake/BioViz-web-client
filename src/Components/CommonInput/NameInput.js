import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    input: {
      width: 300,
    },
  }));

export default function NameInput() {
    const classes = useStyles();
    return (
        <div>
      <TextField
      className={classes.input}
      label="Give a unique name for the sequence"
      defaultValue="sequence x"
      />

        </div>
    );
}
