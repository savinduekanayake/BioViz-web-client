import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {FixedSizeGrid} from 'react-window';
import {Avatar} from '@material-ui/core';


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
    emptyRow: {
        '& tr': {
            height: '20px',

        },
    },

}));

function MSAAlignment(props) {
    const classes = useStyles();
    const totalLen = props.alignments[0].length;

    const makeBase = ({columnIndex, rowIndex, style}) => {
        const character = props.alignments[rowIndex].charAt(columnIndex);
        const styleClass = character === '-' ? 'ga' : character;

        return (
            <div style={style}>
                <Avatar variant="square"
                        className={`${classes.avatar} ${classes[styleClass]}`}>
                        {character}</Avatar>


            </div>
        );
    };
    makeBase.propTypes = {
        columnIndex: PropTypes.number.isRequired,
        rowIndex: PropTypes.number.isRequired,
        style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    };


    return (
        <div onClick={onclick}>
            <FixedSizeGrid
                columnCount={totalLen}
                columnWidth={20}
                height={20*(props.alignments.length+1)}
                rowCount={props.alignments.length}
                rowHeight={20}
                width={600}
            >
                {makeBase}
            </FixedSizeGrid>
        </div>
    );
}

MSAAlignment.propTypes = {
    alignments: PropTypes.arrayOf(PropTypes.string),

};

export default MSAAlignment;

