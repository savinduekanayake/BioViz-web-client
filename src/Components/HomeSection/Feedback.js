import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Theme } from '@material-ui/core/styles';

//import css modules
import style from './assets/css/image.module.css';

//pages
import Ratings from './Ratings';

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    minWidth: 650,
  },
  root: {
    paddingLeft:'10%',
    paddingRight: '10%',
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginTop: 50,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 22),
  createData('Ice cream sandwich', 237),
  createData('Eclair', 262),
];



export default function Feedback() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    <h2 className={style.heading}>Feedback</h2>
    <p className={style.subHeading}>Lorem ipsum dolor sit amet consectetur.</p>

    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="caption table">
        <caption>A basic table example with a caption</caption>
        <TableHead>
          <TableRow>
            <TableCell>Functions</TableCell>
            <TableCell align="right">Ratings</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
