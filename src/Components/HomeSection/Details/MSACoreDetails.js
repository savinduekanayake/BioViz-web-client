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

/**
 *Component to show the core details of MSA Alignment
 * @return {React.ReactElement}
 */

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
        Multiple Sequence Alignment (MSA) is generally the alignment
        of three or more biological sequences (protein or nucleic acid)
        of similar length. From the output, homology can be inferred and
        the evolutionary relationships between the sequences studied.
        <br />
      </Typography>

      <br />

      <Typography component={'span'} variant="h5" gutterBottom>
        Types of MSA alignment
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

        <br />

      <Typography component={'span'} variant="h6" gutterBottom>
        Progressive Algorithm
        <br />
      </Typography>

      <Typography component={'span'} variant="body2" gutterBottom>
        The most widely used approach to multiple sequence alignments
        uses a heuristic search known as progressive technique.
        Progressive alignment builds up a final MSA by combining pairwise
        alignments beginning with the most similar pair and progressing
        to the most distantly related.
        <br />
      </Typography>

      <br />

      <Typography component={'span'} variant="h6" gutterBottom>
        Progressive Optimal Algorithm
        <br />
      </Typography>

      <Typography component={'span'} variant="body2" gutterBottom>
        This is also same as the Progressive Algorithm only difference
        of Progressive Optimal Algorithm is user define the pairs of alignment.
        So this is very fast algorithm to get the final result.
        <br />
      </Typography>

      <br />

    </div>
  );
}
