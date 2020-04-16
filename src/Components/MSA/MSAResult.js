import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import MSATree from './MSATree';
import MSAAlignment from './MSAAlignment';

export default function MSAResult(props) {
    const [selectedProfile, setselectedProfile] = React.useState(undefined);
    const nInputSequences = props.result.alignments.length;
    let intermediateProf = '';
    if (selectedProfile) {
        if (selectedProfile <= nInputSequences) {
            intermediateProf = <MSAAlignment
                alignments={[props.result.profiles[selectedProfile]]} />;
        } else {
            intermediateProf = <MSAAlignment
                alignments={props.result.profiles[selectedProfile]} />;
        }
    }
    return (
        <div>
            <MSAAlignment alignments={props.result.alignments} />
            <br />
            <Grid container direction='row' spacing={2}>
                <Grid item>
                    Hover on nodes to view intermediate profiles.
                    Double click on canvas to recenter the graph.
                    <MSATree
                        treeData={props.result.graph}
                        setSelected={setselectedProfile} />
                </Grid>
                <Grid item>
                    {intermediateProf}
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
                PropTypes.string, PropTypes.array,
            ),
        ),
    }),

};
