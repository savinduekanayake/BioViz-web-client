import React from 'react';
import {Avatar} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    avatar: {
        height: '20px',
        width: '20px',
        fontSize: '12px',

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
    r: {
        color: 'black',
        backgroundColor: 'black',
    }

}));

export default function Base(props) {
    const classes = useStyles();
    const index = props.index;
    const base = props.base;
        
    return(
            <Avatar variant='square' id={index}
            className={`${classes.avatar} ${classes[base]}`} >
            {base}</Avatar>   
        );
}