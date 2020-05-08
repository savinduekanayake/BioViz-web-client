import React from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';

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
      </Typography>

      <Typography component={'span'} variant="body1" gutterBottom>
        body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
         Quos blanditiis tenetur
        unde suscipit, quam beatae rerum inventore consectetur,
         neque doloribus, cupiditate numquam
        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>

      <br />

      <Typography component={'span'} variant="h5" gutterBottom>
        Types of pairwise alignment
      </Typography>

      <Typography component={'span'} variant="subtitle1" gutterBottom>
        1. Progressive
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        2. Progressive Optimal
      </Typography>
      <Typography component={'span'} variant="subtitle1" gutterBottom>
        3. Needleman Wunsch Progressive
      </Typography>

        <br />

      <Typography component={'span'} variant="h6" gutterBottom>
        Progressive
      </Typography>

      <Typography component={'span'} variant="body2" gutterBottom>
        body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
         Quos blanditiis tenetur
        unde suscipit, quam beatae rerum inventore consectetur,
         neque doloribus, cupiditate numquam
        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>

      <Typography component={'span'} variant="h6" gutterBottom>
        Progressive Optimal
      </Typography>

      <Typography component={'span'} variant="body2" gutterBottom>
        body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
         Quos blanditiis tenetur
        unde suscipit, quam beatae rerum inventore consectetur,
         neque doloribus, cupiditate numquam
        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>

      <Typography component={'span'} variant="h6" gutterBottom>
        Needleman Wunsch Progressive
      </Typography>

      <Typography component={'span'} variant="body2" gutterBottom>
        body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
         Quos blanditiis tenetur
        unde suscipit, quam beatae rerum inventore consectetur,
         neque doloribus, cupiditate numquam
        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>

    </div>
  );
}
