import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import MSATree from './MSATree';
import MSAAlignment from './MSAAlignment';
import {Modal} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import MSAReport from './MSAReport';

const useStyles = makeStyles((theme) => ({
    reportModal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

/**
 * Wrapper component for MSA result section.
 *      Contains phylogenetic tree, alignment view and report
 * @param {Object} props - props
 * @return {React.ReactElement}
 */
export default function MSAResult(props) {
    const classes = useStyles();
    const divRef = useRef(null);

    /**
     * scroll into this component once the results are fetched from backend
     */
    useEffect(() => {
        divRef.current.scrollIntoView({behavior: 'smooth'});
    }, [props.result]);

    /**
     * currently viewing intermediate profile
     */
    const [selectedProfile, setselectedProfile] = React.useState(undefined);

    const [reportOpen, setReportOpen] = React.useState(false);
    const nInputSequences = props.result.alignments.length;
    let intermediateProf = null;
    if (selectedProfile) {
        if (selectedProfile <= nInputSequences) {
            const heading = <p>
                Input Sequence
                ({`${props.input.sequencesNames[selectedProfile - 1]}`})
                </p>;
            intermediateProf = <>{heading} <MSAAlignment
                genomeType={props.input.genomeType}
                alignments={[props.result.profiles[selectedProfile]]} /></>;
        } else {
            const heading = <p>
                Intermediate Profile ({`${selectedProfile}`})
                </p>;
            intermediateProf = <>{heading} <MSAAlignment
                genomeType={props.input.genomeType}
                alignments={props.result.profiles[selectedProfile]} /></>;
        }
    }

    /**
     * download the phylogenetic tree as a png file
     */
    const onClickDownload = () => {
        const canvas = document.getElementById(
            'MSA-tree-result').getElementsByTagName('canvas')[0];


        const link = document.createElement('a');
        link.setAttribute('download', 'tree.png');
        link.setAttribute('href',
            canvas.toDataURL('image/png').replace('image/png',
                'image/octet-stream'));
        link.click();
    };
    const handleReportOpen = () => {
        setReportOpen(true);
    };

    const handleReportClose = () => {
        setReportOpen(false);
    };

    return (
        <div ref={divRef}>

            <br />
            <Grid container direction='row' spacing={0}>
                <Grid item xs={12} lg={5}>
                    <h3>Phylogenetic Tree</h3>
                    <br />
                    Hover on nodes to view intermediate profiles.
                    Double click on canvas to recenter the graph.
                    <br />
                    <div style={{textAlign: 'right'}}>
                        <Button
                            variant="outlined"
                            onClick={onClickDownload}
                            size="small">
                            Print this
                        </Button>
                    </div>
                    <br />
                    <div>
                        <MSATree
                            type='result'
                            treeData={props.result.graph}
                            setSelected={setselectedProfile}
                            sequencesNames={props.input.sequencesNames} />
                    </div>
                </Grid>

                <Divider
                    orientation="vertical"
                    flexItem
                    style={{marginLeft: 15}} />
                <Grid item container direction='column' xs={12} lg={5}
                    align="center"
                    alignItems="center">
                    <Grid item >
                        <h3>Final Alignment</h3>
                        <br />
                        <MSAAlignment
                            alignments={props.result.alignments}
                            genomeType={props.input.genomeType} />
                    </Grid>
                    <Grid item>
                        <h4>Intermediate Profiles</h4>
                        <h5>(Hover over the graph to view profiles)</h5>
                        {intermediateProf}
                    </Grid>

                </Grid>

                <Divider orientation="vertical" flexItem />
                <Grid item xs={12} lg={'auto'} align="center">
                    <h3>Report</h3>
                    <br />
                    <div style={{marginBottom: 10}}>
                        Identity : {props.result.identity.toFixed(5)}
                        <br />
                    </div>
                    <Button variant="outlined" size="small"
                        onClick={handleReportOpen}>
                        Generate Report
                    </Button>
                    <Modal
                        open={reportOpen}
                        className={classes.reportModal}
                        onClose={handleReportClose}
                        aria-labelledby="report-modal-title"
                        aria-describedby="report-modal-description"

                    >
                        <MSAReport
                            input={props.input}
                            result={props.result}
                        />
                    </Modal>
                </Grid>
            </Grid>


        </div>
    );
}

MSAResult.propTypes = {
    result: PropTypes.shape({
        alignments: PropTypes.arrayOf(PropTypes.string),
        graph: PropTypes.shape({
            id: PropTypes.number,
            children: PropTypes.array,
        }),
        profiles: PropTypes.arrayOf(
            PropTypes.oneOfType(
                [PropTypes.string, PropTypes.array],
            ),
        ),
        identity: PropTypes.number,
    }),
    input: PropTypes.shape({
        sequencesNames: PropTypes.arrayOf(PropTypes.string),
        genomeType: PropTypes.string,
    }),

};
