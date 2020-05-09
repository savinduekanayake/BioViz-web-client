import React from 'react';
import PropTypes from 'prop-types';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import PairAlignAlignment from './PairAlignAlignment';
import Matrix from './Matrix/Matrix';
import {Grid, IconButton} from '@material-ui/core';
import PlayableResut from './PlayableResut';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Report from '../CommonReport/Report';
import {makeStyles} from '@material-ui/core/styles';
import ExtendedMatrix from './Matrix/ExtendedMatrix';


const useStyles = makeStyles((theme) => ({
    reportModal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

export default function PairAlignResult(props) {
    const classes = useStyles();
    const match = props.input.match;
    const gap = props.input.gap;
    const mismatch = props.input.mismatch;
    const max = props.result.alignments.length;
    const [selectedAlignment, setselectedAlignment] = React.useState(0);
    const [reportOpen, setReportOpen] = React.useState(false);
    const alignments = [
        <PairAlignAlignment
            alignment={props.result.alignments[selectedAlignment]}
            index={selectedAlignment}
            key={selectedAlignment}
        />,

    ];
    const onNext = () => {
        setselectedAlignment((selectedAlignment + 1) % max);
    };
    const onPrevious = () => {
        setselectedAlignment(
            selectedAlignment - 1 === -1 ? max - 1 : selectedAlignment - 1,
        );
    };

    const handleReportOpen = () => {
        setReportOpen(true);
    };

    const handleReportClose = () => {
        setReportOpen(false);
    };

    let matrix;
    let playableResult;
    if (props.input.scoringMethod === 'BASIC') {
        matrix = <Matrix input={props.input}
            result={props.result}
            selected={selectedAlignment} />;
        playableResult = <PlayableResut input={props.input}
            result={props.result} />;
    } else {
        matrix = <ExtendedMatrix
            input={props.input}
            result={props.result}
            selected={selectedAlignment}
        />;
        playableResult = null;
    }

    return (
        <div>
            <Grid container direction='row'>
                <Grid item>
                    {matrix}
                </Grid>
                <Grid item xs={1}>
                    <IconButton onClick={onNext}>
                        <KeyboardArrowLeftIcon />
                    </IconButton>
                </Grid>
                <Grid item>
                    {alignments}
                </Grid>
                <Grid item xs={1}>
                    <IconButton onClick={onPrevious}>
                        <KeyboardArrowRightIcon />
                    </IconButton>
                </Grid>

                <Grid item>
                    <Button variant="outlined" onClick={handleReportOpen}>
                        Generate Report
                    </Button>
                    <Modal
                        open={reportOpen}
                        className={classes.reportModal}
                        onClose={handleReportClose}
                        aria-labelledby="report-modal-title"
                        aria-describedby="report-modal-description"

                    >
                        <Report
                            sequences={[props.input.seqA, props.input.seqB]}
                            scores={{match, mismatch, gap}}
                            result={props.result}
                        />
                    </Modal>
                </Grid>
            </Grid>
            {playableResult}

        </div>
    );
}

PairAlignResult.propTypes = {
    result: PropTypes.shape({
        score_matrix: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
        alignments: PropTypes.arrayOf(
            PropTypes.shape({
                algn_a: PropTypes.string,
                algn_b: PropTypes.string,
            }),
        ),
    }),
    input: PropTypes.shape({
        scoringMethod: PropTypes.string,
        seqA: PropTypes.string,
        seqB: PropTypes.string,
        match: PropTypes.number,
        mismatch: PropTypes.number,
        gap: PropTypes.number,
    }),
};
