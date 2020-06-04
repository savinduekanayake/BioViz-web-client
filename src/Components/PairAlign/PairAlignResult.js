import React from 'react';
import PropTypes from 'prop-types';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import PairAlignAlignment from './PairAlignAlignment';
import Matrix from './Matrix/Matrix';
import {Grid, IconButton, Divider, Tooltip} from '@material-ui/core';
import PlayableResut from './PlayableResut';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import PairAlignReport from './PairAlignReport';
import {makeStyles} from '@material-ui/core/styles';
import ExtendedMatrix from './Matrix/ExtendedMatrix';


const useStyles = makeStyles((theme) => ({
    reportModal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    directionArrow: {
        backgroundColor: '#0000FF30',
    },
}));

export default function PairAlignResult(props) {
    const classes = useStyles();
    const max = props.result.alignments.length;

    const divRef = React.useRef(null);
    React.useEffect(() => {
        divRef.current.scrollIntoView({behavior: 'smooth'});
    }, [props.result]);

    const [selectedAlignment, setselectedAlignment] = React.useState(0);
    const [reportOpen, setReportOpen] = React.useState(false);
    const alignments = props.result.alignments.length > 0 ? [
        <PairAlignAlignment
            alignment={props.result.alignments[selectedAlignment]}
            index={selectedAlignment}
            key={selectedAlignment}
            genomeType={props.input.genomeType}
        />,
    ] : <h4>Could not find alignments according
        to the provided scoring schema</h4>;

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
        <div ref={divRef}>
            <h2>PariAlign Result</h2>
            <Grid container direction='row' spacing={2}>
                <Grid item xs={12} lg={4}>
                    <Tooltip
                        title="Dynamic Programming matrix
                        used to calculate the score"
                        interactive arrow>
                        <h3>DP Matrix</h3>
                    </Tooltip>
                    <br />
                    {matrix}
                </Grid>
                <Divider
                    orientation="vertical"
                    flexItem
                    style={{marginLeft: 20}} />
                <Grid item xs={12} lg={6}>
                    <div>
                        <Grid container spacing={0} align="center"
                            justify="center"
                            alignItems="center" direction='row'>
                            <Grid item xs={1}>
                                <h4>Previous</h4>
                                <IconButton size='small'
                                    className={classes.directionArrow}
                                    onClick={onNext}>
                                    <KeyboardArrowLeftIcon />
                                </IconButton>
                            </Grid>
                            <Grid item xs={9}>
                                <h3>Alignment(s)</h3>
                                <br />
                                {alignments}
                            </Grid>
                            <Grid item xs={1}>
                                <h4>Next</h4>
                                <IconButton size='small'
                                    className={classes.directionArrow}
                                    onClick={onPrevious}>
                                    <KeyboardArrowRightIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
                <Divider orientation="vertical" flexItem />

                <Grid item xs={12} lg={'auto'}>
                    <h3>Report</h3>
                    <br />
                    <div style={{marginBottom: 10}}>
                        {props.result.alignments.length > 0 ?
                            `Identity : ${props.result.alignments[
                                selectedAlignment].identity.toFixed(5)}` :
                            ''}
                        <br />
                        Score : {props.result.score}
                        <br />
                    </div>
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
                        <PairAlignReport
                            input={props.input}
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
                identity: PropTypes.number,
            }),
        ),
        score: PropTypes.number,
    }),
    input: PropTypes.shape({
        genomeType: PropTypes.string,
        scoringMethod: PropTypes.string,
        seqA: PropTypes.string,
        seqB: PropTypes.string,
        match: PropTypes.number,
        mismatch: PropTypes.number,
        gap: PropTypes.number,
    }),
};
