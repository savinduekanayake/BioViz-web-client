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


class Report extends Component {
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

        const inputSequences = this.props.sequences.map((seq, index) => {
            return <><br />{`> ${index}`}<br />{seq}<br /></>;
        });
        const line = <hr className={classes.line} />;

        const scores = <>
            Match Score : {this.props.scores.match}<br />
        Mismatch Penalty : {this.props.scores.mismatch}<br />
        Gap Penalty : {this.props.scores.gap}<br />
        </>;

        const alignmets = this.props.result.alignments.map((element, index) => {
            return <><br />Alignment {index}<br />
                {'> 0'}<br />
                {element.algn_a}<br />
                {'> 1'}<br />
                {element.algn_b}<br />
                {`Identity : ${element.identity}`}<br />
                <br />
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
            Scoring method : Basic
                <div>
                        {scores}
                    </div>
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
Report.propTypes = {
    classes: PropTypes.func,
    result: PropTypes.shape({
        alignments: PropTypes.arrayOf(
            PropTypes.shape({
                algn_a: PropTypes.string,
                algn_b: PropTypes.string,
            }),
        ),
    }),
    sequences: PropTypes.arrayOf(PropTypes.string),
    scores: PropTypes.shape({
        match: PropTypes.number,
        mismatch: PropTypes.number,
        gap: PropTypes.number,
    }),
};
export default withStyles(useStyles)(Report);
