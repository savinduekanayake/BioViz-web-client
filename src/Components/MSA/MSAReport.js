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


class MSAReport extends Component {
    constructor(props) {
        super(props);
        this.downloadTxtFile = this.downloadTxtFile.bind(this);
    }

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

        const inputSequences = this.props.input.sequences.map((seq, index) => {
            return <>
                <br />
                {`>${this.props.input.sequencesNames[index]}`}
                <br />
                {seq}<br />
            </>;
        });
        const line = <hr className={classes.line} />;
        const scores = <>
            Match Score : {this.props.input.match}<br />
        Mismatch Penalty : {this.props.input.mismatch}<br />
        Gap Penalty : {this.props.input.gap}<br />
        </>;


        let DNASimilarityScores = null;

        if (this.props.input.genomeType === 'DNA' &&
            this.props.input.similarityMatrixName === 'CUSTOM') {
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
            return <><br />
                {`>${this.props.input.sequencesNames[index]}`}<br />
                {element}<br />
            </>;
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
                    Sequence Type : {this.props.input.genomeType}
                    <br/>
                    <br/>
                    {line}
                    <br />
            InputSequences
                <div className={classes.wrapped}>
                        {inputSequences}
                    </div>
                    {line}
                    <br />
            Scoring method : BASIC (without affine gaps)
                    <br />
                    <br />
                    <div>
                        {scores}
                    </div>
                    <br />
            Similarity Matrix : {this.props.input.similarityMatrixName}
                    <br />
                    {DNASimilarityScores}
                    <br />
                    <br />
                    {line}
                    <br />

            Alignments
                <div className={classes.wrapped}>
                        {alignmets}
                        <br/>
                        {`Identity : ${this.props.result.identity}`}<br />
                    </div>
                </div>
            </div>
        );
    }
}
MSAReport.propTypes = {
    classes: PropTypes.object,
    result: PropTypes.shape({
        alignments: PropTypes.arrayOf(PropTypes.string),
        identity: PropTypes.number,
    }),
    input: PropTypes.shape({
        match: PropTypes.number,
        mismatch: PropTypes.number,
        gap: PropTypes.number,
        similarityMatrixName: PropTypes.string,
        genomeType: PropTypes.string,
        sequences: PropTypes.arrayOf(PropTypes.string),
        sequencesNames: PropTypes.arrayOf(PropTypes.string),
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
export default withStyles(useStyles)(MSAReport);
