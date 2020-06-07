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
 *Component to show the core details of Pairwise
 * @return {React.ReactElement}
 */

export default function PWCoreDetails() {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      <Typography component={'span'} variant="h4"
        gutterBottom testid='typographyHeaderId'>
        What is Pairwise Alignment
        <br />
        <Divider />
      </Typography>

      <Typography component={'span'} variant="body1" gutterBottom>
        Pairwise Sequence Alignment is used to identify regions of similarity
        that may indicate functional, structural and/or evolutionary
        relationships between two biological sequences
        (protein or nucleic acid).
        <br />
      </Typography>

      <br />

      <Typography component={'span'} variant="h5" gutterBottom>
        Types of pairwise alignment
        <br />
      </Typography>

      <Typography component={'span'} variant="subtitle1" gutterBottom>
        1. Needleman Wunsch
        <br />
      </Typography>
      <Typography component={'span'} variant="subtitle1" gutterBottom>
        2. Smith Waterman
        <br />
      </Typography>

      <br />

      <Typography component={'span'} variant="h6" gutterBottom>
        Needleman Wunsch Algorithm
        <br />
      </Typography>

      <Typography component={'span'} variant="body2" gutterBottom>
        This is the most basic and important algorithm of bioinformatics
        Needleman–Wunsch Algorithm developed by Saul B. Needleman and
        Christian D. Wunsch in 1970. It was designed to compare biological
        sequences and was one of the first applications of dynamic programming
         to the biological sequence comparison. This algorithm is usually used
          for global alignment of two sequences (nucleotide or amino acids).
          which now find application in the Human Genome Project.
        <br />
      </Typography>

      <br />

      <Typography component={'span'} variant="h6" gutterBottom>

        Smith Waterman Algorithm
        <br />
      </Typography>

      <Typography component={'span'} variant="body2" gutterBottom>
        The Smith-Waterman algorithm which is also called as local alignment
        is a database search algorithm
        developed byT.F. Smith and M.S. Waterman, and based
        on an earlier model appropriately named Needleman and Wunsch
        after its original creators. The S-W Algorithm
        implements a technique called dynamic programming, which
        takes alignments of any length, at any location, in any
        sequence, and determines whether an optimal alignment
        can be found. Based on these calculations, scores or
        weights are assigned to each character-to-character
        comparison: positive for exact matches/substitutions,
        negative for insertions/deletions. In weight matrices,
        scores are added together and the highest scoring alignment is reported.
        <br />
      </Typography>

    </div>
  );
}
