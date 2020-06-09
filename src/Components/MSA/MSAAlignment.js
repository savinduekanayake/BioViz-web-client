import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {FixedSizeGrid} from 'react-window';
import {Avatar} from '@material-ui/core';
import genomeStyles from '../../styles/GenomeStyles.module.css';


const useStyles = makeStyles((theme) => ({
    avatar: {
        height: '20px',
        width: '20px',
        fontSize: '12px',

    },
    emptyRow: {
        '& tr': {
            height: '20px',

        },
    },

}));

/**
 * Component to display the alignment result of MSA.
 * Displays different colors for each DNA/Protein base
 * @param {Object} props - props
 * @return {React.ReactElement}
 */
function MSAAlignment(props) {
    const classes = useStyles();
    const totalLen = props.alignments[0].length;

    /**
     * function to create single protein/DNA base element.
     * @param {Object} obj
     * @param {Number} obj.columnIndex - index of the base in
     *      the aligned sequence
     * @param {Number} obj.rowIndex - index of the sequence in the alignment
     * @return {React.ReactElement}
     */
    const makeBase = ({columnIndex, rowIndex, style}) => {
        const character = props.alignments[rowIndex].charAt(columnIndex);
        const styleClass = character === '-' ? 'gap' :
            props.genomeType.concat('-', character.toUpperCase());

        return (
            <div style={style}>
                <Avatar variant="square"
                        className={
                            `${classes.avatar} ${genomeStyles['genome-base']}
                             ${genomeStyles[styleClass]}`
                            }>
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
                width={560}
            >
                {makeBase}
            </FixedSizeGrid>
        </div>
    );
}

MSAAlignment.propTypes = {
    alignments: PropTypes.arrayOf(PropTypes.string),
    genomeType: PropTypes.string,

};

export default MSAAlignment;

