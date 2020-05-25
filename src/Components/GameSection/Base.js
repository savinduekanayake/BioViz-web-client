import React from 'react';
import {Avatar} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    avatar: {
        height: '25px',
        width: '25px',
        fontSize: '14px',
    },
    A: {
        color: 'white',
        backgroundColor: 'red',
    },
    C: {
        color: 'white',
        backgroundColor: 'blue',
    },
    G: {
        color: 'white',
        backgroundColor: 'purple',
    },
    T: {
        color: 'white',
        backgroundColor: 'green',
    },
    ga: {
        color: 'black',
        backgroundColor: 'black',
    },
    e: {
        color: 'black',
        backgroundColor: 'black',
    },

}));

export default function Base(props) {
    const classes = useStyles();
    const index = props.index;
    const base = props.base;

    return (
        <Avatar variant='square' id={index}
            className={`${classes.avatar} ${classes[base]}`} >
            {base}</Avatar>
    );
}

Base.propTypes = {
    index: PropTypes.number,
    base: PropTypes.string,
};
