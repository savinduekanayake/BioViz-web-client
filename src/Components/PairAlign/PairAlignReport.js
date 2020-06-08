import React, {Component, Fragment} from 'react';
import {withStyles} from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import {Button} from '@material-ui/core';


const useStyles = (theme) => ({
    paper: {
        width: '90%',
        height: '90%',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2),
    },
    wrapped: {
        wordWrap: 'break-word',
    },
    printableComponent: {
        overflowY: 'auto',
        height: '90%',
        padding: theme.spacing(2),

    },
    line: {
        width: '100%',
        textAlign: 'left',
        marginLeft: 0,
    },
});

const DNAbases = ['A', 'G', 'C', 'T'];

/**
 * Class component to display PairAlign report
 */
class PairAlignReport extends Component {
    constructor(props) {
        super(props);
        this.downloadTxtFile = this.downloadTxtFile.bind(this);
        this.sequences = [this.props.input.seqA, this.props.input.seqB];
        this.sequenceNames = [this.props.input.seqAname,
            this.props.input.seqBname];
    }

    /**
     * Displays a prompt to download the content of the component
     * as a text file
     */
    downloadTxtFile() {
        const element = document.createElement('a');
        const file = new Blob(
            [document.getElementById('printable-component').innerText],
            {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = 'report.txt';
        document.body.appendChild(element);
        element.click();
    }


    render() {
        const {classes} = this.props;
        const date = new Date();
        const dateStr = date.getFullYear() + '-' +
            (date.getMonth() + 1) + '-' +
            date.getDate() + ' ' +
            date.getHours() + ':' +
            date.getMinutes() + ':' +
            date.getSeconds();

        const inputSequences = this.sequences.map((seq, index) => {
            return <Fragment key={index}>
                <br />{`>${this.sequenceNames[index]}`}<br />{seq}<br />
            </Fragment>;
        });
        const line = <hr className={classes.line} />;
        let scores;
        if (this.props.input.scoringMethod === 'BASIC') {
            scores = <>
                Match Score : {this.props.input.match}<br />
        Mismatch Penalty : {this.props.input.mismatch}<br />
        Gap Penalty : {this.props.input.gap}<br />
            </>;
        } else {
            scores = <>
                Match Score : {this.props.input.match}<br />
        Mismatch Penalty : {this.props.input.mismatch}<br />
        Gap Open Penalty : {this.props.input.gapOpen}<br />
        Gap Extend Penalty : {this.props.input.gapExtend}<br />
            </>;
        }

        let DNASimilarityScores = null;

        /**
         * Displaying DNA similarity matrix for each pair of bases
         */
        if (this.props.input.genomeType === 'DNA' &&
            this.props.input.similarityMatrixName === 'CUSTOM' &&
            this.props.input.scoringMethod === 'EXTENDED') {
            DNASimilarityScores = [];
            DNAbases.forEach((base1) => {
                DNAbases.forEach((base2) => {
                    const pair = base1.concat(base2);
                    if (this.props.input.DNASimilarityMatrix.hasOwnProperty(
                        pair)) {
                        DNASimilarityScores.push(
                            <Fragment key={pair}>
                                {pair} : {
                                    this.props.input.DNASimilarityMatrix[pair]}
                                <br />
                            </Fragment>);
                    }
                });
            });
        }


        const alignmets = this.props.result.alignments.map((element, index) => {
            return <Fragment key={index}><br />Alignment {index + 1}<br />
                {`>${this.sequenceNames[0]}`}<br />
                {element.algn_a}<br />
                {`>${this.sequenceNames[1]}`}<br />
                {element.algn_b}<br />
                {`Identity : ${element.identity}`}<br />
                <br />
            </Fragment>;
        });


        return (
            <div className={classes.paper} tabIndex={-1}>
                <Button variant='outlined'
                    onClick={this.downloadTxtFile}>
                    Download as a text file
                </Button>
                <div
                    id='printable-component'
                    className={classes.printableComponent}>
                    Report created with BioViz
                <br />
            on {dateStr}
                    <br />
                    {line}
                    <br />
            InputSequences
                <div className={classes.wrapped}>
                        {inputSequences}
                    </div>
                    {line}
                    <br />
            Scoring method : {this.props.input.scoringMethod}
                    <br />
                    <div>
                        {scores}
                    </div>
                    <br />
            Similarity Matrix : {this.props.input.similarityMatrixName}
                    <br />
                    {DNASimilarityScores}
                    <br />
                    {line}
                    <br />

            Alignments
                <div>
                        {alignmets}
                    </div>
                </div>
            </div>
        );
    }
}
PairAlignReport.propTypes = {
    classes: PropTypes.object,
    result: PropTypes.shape({
        alignments: PropTypes.arrayOf(
            PropTypes.shape({
                algn_a: PropTypes.string,
                algn_b: PropTypes.string,
            }),
        ),
    }),
    input: PropTypes.shape({
        scoringMethod: PropTypes.string,
        similarityMatrixName: PropTypes.string,
        genomeType: PropTypes.string,
        seqA: PropTypes.string,
        seqAname: PropTypes.string,
        seqB: PropTypes.string,
        seqBname: PropTypes.string,
        match: PropTypes.number,
        mismatch: PropTypes.number,
        gap: PropTypes.number,
        gapOpen: PropTypes.number,
        gapExtend: PropTypes.number,
        DNASimilarityMatrix: (props, propName, componentName) => {
            const keys = Object.keys(props[propName]);
            for (let index = 0; index < keys.length; index++) {
                if (!(DNAbases.includes(keys[index][0]) &&
                        DNAbases.includes(keys[index][1]))) {
                    return new Error(
                        'Invalid key `' + keys[index] + '` supplied to ' +
                        '`' + componentName +
                        '`; expected to match with two characters in' +
                        DNAbases + '.',
                    );
                }
            }
        },
    }),
};
export default withStyles(useStyles)(PairAlignReport);
