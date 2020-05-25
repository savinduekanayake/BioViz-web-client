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
            intermediateProf = <>{heading} <MSAAlignment
                alignments={[props.result.profiles[selectedProfile]]} /></>;
        } else {
            intermediateProf = <>{heading} <MSAAlignment
                alignments={props.result.profiles[selectedProfile]} /></>;
        }
    }

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

    return (
        <div>

            <br />
            <Grid container direction='row' spacing={0}>
                <Grid item xs={12} lg={5}>
                    <h3>Tree</h3>
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
                            treeData={props.result.graph}
                            setSelected={setselectedProfile} />
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
                        <MSAAlignment alignments={props.result.alignments} />
                    </Grid>
                    <Grid item>
                        <h4>Intermediate Profiles</h4>
                        <h5>(Hover over the graph to view profiles)</h5>
                        {intermediateProf}
                    </Grid>

                </Grid>

                <Divider orientation="vertical" flexItem />
                <Grid item xs={12} lg={'auto'} align="center"
                    alignItems="center" justify="center">
                    <h3>Report</h3>
                    <br />
                    <div style={{marginBottom: 10}}>
                        Identity : {props.result.identity.toFixed(5)}
                        <br />
                    </div>
                    <Button variant="outlined" size="small">
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
