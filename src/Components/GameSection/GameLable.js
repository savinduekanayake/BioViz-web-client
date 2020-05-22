import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    labe: {
        color: '#1e2e51',
        fontWeight: 'bolder',
    },
    value: {
        color: '#535350de',
        fontWeight: 'bolder',
        paddingLeft: 10,
        paddingRight: 20,
    },
}));

export default function GameLable(props) {
    const classes = useStyles();

    return (
        <div style={{float: 'left', paddingLeft: 60, fontSize: 17}}>
        <label className={classes.labe}>Matches
        <label className={classes.value}>|{props.match}|</label></label>
        <label className={classes.labe}>Mismatches
        <label className={classes.value}>|{props.mismatch}|</label></label>
        <label className={classes.labe}>Gaps
        <label className={classes.value}>|{props.gap}|</label></label>
        </div>
    );
}

GameLable.propTypes = {
  match: PropTypes.number,
  mismatch: PropTypes.number,
  gap: PropTypes.number,
};
