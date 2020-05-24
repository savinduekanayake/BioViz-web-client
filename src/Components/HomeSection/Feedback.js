import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


// import css modules
import style from './assets/css/image.module.css';

// pages
// import Ratings from './Ratings';
import Rating from './Rating';


const useStyles = makeStyles((theme) => ({
  table: {
    // minWidth: 650,
  },
  root: {
    paddingLeft: '20%',
    paddingRight: '20%',
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginTop: 50,
    paddingBottom: 50,
  },
}));


function createData(name, rate) {
  return {name, rate};
}

const rows = [
  createData('Atraction of website', <Rating />),
  createData('Satistification of fuctionalities', <Rating />),
  createData('Satistification of visualizing the result', <Rating />),
  createData('Satistification of response time', <Rating />),
];


export default function Feedback() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h2 className={style.heading}>Give us feedback</h2>
      <p className={style.subHeading}>
            Lorem ipsum dolor sit amet consectetur.</p>

      <TableContainer testid='tableContainerId' component={Paper}>
        <Table
          testid='tableId' className={classes.table} aria-label="caption table">
          <caption>We are happy to get your feedback.</caption>
          <TableHead testid='tableHeadId'>
            <TableRow testid='tableRowId'>
              <TableCell testid='tableCellId1'>Facilities</TableCell>
              <TableCell testid='tableCellId2' align="right">Ratings</TableCell>

            </TableRow>
          </TableHead>
          <TableBody testid='tableBodyId'>
            {rows.map((row) => (
              <TableRow testid='tableRowId2' key={row.name}>
                <TableCell testid='tableCellId3' component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell
                  testid='tableCellId4' align="right">{row.rate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
