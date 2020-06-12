import React from 'react';
import {Avatar} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import genomeStyles from '../../styles/GameStyles.module.css';
import {useSelector} from 'react-redux';

const useStyles = makeStyles((theme) => ({
    avatar: {
        height: '25px',
        width: '25px',
        fontSize: '14px',
    },
}));

/**
 * Component to get the type(color and letter) of an element in a sequence
 * @param {Object} props - props
 * @return {React.ReactElement}
 */
export default function Base(props) {
    const classes = useStyles();
    const genomeType = useSelector((state)=>(state.genomeType));
    const index = props.index;
    const base = props.base;
    const baseColor = (base === '-' || base === 'e') ? 'gap' :
    genomeType.concat('-', base);

    return (
        <Avatar variant='square' id={index}
            className={`${classes.avatar} ${genomeStyles[baseColor]}`} >
            {base}</Avatar>
    );
}

Base.propTypes = {
    index: PropTypes.number,
    base: PropTypes.string,
};
