import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import MSATree from './MSATree';
import MSAAlignment from './MSAAlignment';

export default function MSAResult(props) {
    const [selectedProfile, setselectedProfile] = React.useState(undefined);
    const nInputSequences = props.result.alignments.length;
    let intermediateProf = null;
    if (selectedProfile) {
        const heading = <p>Intermediate Profile ({`${selectedProfile}`})</p>;
        if (selectedProfile <= nInputSequences) {
            intermediateProf =<>{heading} <MSAAlignment
                alignments={[props.result.profiles[selectedProfile]]} /></>;
        } else {
            intermediateProf =<>{heading} <MSAAlignment
                alignments={props.result.profiles[selectedProfile]} /></>;
        }
    }
    return (
        <div>

            <br />
            <Grid container direction='row' spacing={1}>
                <Grid item xs={5}>
                    <h3>Tree</h3>
                    <br />
                    Hover on nodes to view intermediate profiles.
                    Double click on canvas to recenter the graph.
                    <br/>
                    <MSATree
                        treeData={props.result.graph}
                        setSelected={setselectedProfile} />
                </Grid>

                <Divider
                    orientation="vertical"
                    flexItem
                    style={{marginLeft: 25, marginRight: 10}} />
                <Grid item container direction='column' xs={5}>
                    <Grid item >
                        <h3>Final Alignment</h3>
                        <br />
                        <MSAAlignment alignments={props.result.alignments} />
                    </Grid>
                    <Grid item>
                        <h4>Intermediate Profiles</h4>
                        <h5>(Hover over the graph to view profiles)</h5>
                        {intermediateProf}
                    </Grid>

                </Grid>

                <Divider orientation="vertical" flexItem />
                <Grid item>
                <h3>Report</h3>
                    <br />
                    <div style={{textAlign: 'left', marginBottom: 10}}>
                        Identity : {props.result.identity.toFixed(5)}
                        <br />
                    </div>
                    <Button variant="outlined">
                        Generate Report
                    </Button>
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

};
