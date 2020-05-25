import React from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 1000,
  },
});

export default function MSACoreDetails() {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      <Typography component={'span'} variant="h4"
        gutterBottom testid='typographyHeaderId'>
        What is MSA Alignment
        <br />
        <Divider />
      </Typography>

      <Typography component={'span'} variant="body1" gutterBottom>
        body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
         Quos blanditiis tenetur
        unde suscipit, quam beatae rerum inventore consectetur,
         neque doloribus, cupiditate numquam
        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
        <br />
      </Typography>

      <br />

      <Typography component={'span'} variant="h5" gutterBottom>
        Types of pairwise alignment
        <br />
      </Typography>

      <Typography component={'span'} variant="subtitle1" gutterBottom>
        1. Progressive
        <br />
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        2. Progressive Optimal
        <br />
      </Typography>
      <Typography component={'span'} variant="subtitle1" gutterBottom>
        3. Needleman Wunsch Progressive
        <br />
      </Typography>

        <br />

      <Typography component={'span'} variant="h6" gutterBottom>
        Progressive
        <br />
      </Typography>

      <Typography component={'span'} variant="body2" gutterBottom>
        body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
         Quos blanditiis tenetur
        unde suscipit, quam beatae rerum inventore consectetur,
         neque doloribus, cupiditate numquam
        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
        <br />
      </Typography>

      <br />

      <Typography component={'span'} variant="h6" gutterBottom>
        Progressive Optimal
        <br />
      </Typography>

      <Typography component={'span'} variant="body2" gutterBottom>
        body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
         Quos blanditiis tenetur
        unde suscipit, quam beatae rerum inventore consectetur,
         neque doloribus, cupiditate numquam
        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
        <br />
      </Typography>

      <br />

      <Typography component={'span'} variant="h6" gutterBottom>
        Needleman Wunsch Progressive
        <br />
      </Typography>

      <Typography component={'span'} variant="body2" gutterBottom>
        body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
         Quos blanditiis tenetur
        unde suscipit, quam beatae rerum inventore consectetur,
         neque doloribus, cupiditate numquam
        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
        <br />
      </Typography>

    </div>
  );
}
