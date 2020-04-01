import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import {Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({

    customWidth: {
        maxWidth: 'none',
    },

}));

export default function Cell(props) {
    const classes = useStyles();
    return (
        <div>
            <Tooltip title="&#8592; (6 + 5)" interactive arrow
                classes={{tooltip: classes.customWidth}}>
                <Button>{props.value}</Button>
            </Tooltip>

        </div>
    );
}

Cell.propTypes = {
    value: PropTypes.number,
};
