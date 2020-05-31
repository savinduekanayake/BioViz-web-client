import React, {Component} from 'react';
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
                    <br />
            InputSequences
                <div className={classes.wrapped}>
                        {inputSequences}
                    </div>
                    {line}
                    <br />
            Scoring method : BASIC
                    <br />
                    <br />
                    <div>
                        {scores}
                    </div>
                    <br />
                    {line}
                    <br />

            Alignments
                <div>
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
        sequences: PropTypes.arrayOf(PropTypes.string),
        sequencesNames: PropTypes.arrayOf(PropTypes.string),
    }),
};
export default withStyles(useStyles)(MSAReport);
