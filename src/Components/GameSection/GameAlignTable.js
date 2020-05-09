import React from 'react';
import {Icon} from '@material-ui/core';
import PropTypes from 'prop-types';
import DnaIcon from '../../assets/icons/dna.svg';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    table: {
        maxWidth: 1400,
        overflowX: 'auto',
        display: 'block',
    },
    iconTable: {
        display: 'inline-block',
        float: 'left',
    },
}));

export default function GameAlignTable(props) {
    const classes = useStyles();
    return (
        <div>
            <table className={classes.iconTable}>
                <tbody>
                    <tr>
                        <td style={{minWidth: 50}}>
                            <Icon><img src={DnaIcon} alt="seq 1" /></Icon>
                        </td>
                    </tr>
                    <tr>
                        <td style={{minWidth: 50}}>
                            <Icon><img src={DnaIcon} alt="seq 2" /></Icon>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table className={classes.table}>
                <tbody>
                    <tr>
                        {props.align1}
                    </tr>
                    <tr>
                        {props.align2}
                    </tr>
                    <tr>
                        {props.indexLine}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

GameAlignTable.propTypes = {
    align1: PropTypes.array,
    align2: PropTypes.array,
    indexLine: PropTypes.array,
};
