import React, {useState} from 'react';
import Matrix from './Matrix/Matrix';
import PairAlignAlignment from './PairAlignAlignment';
import {getTracebackAlignment} from '../../util/traceback';
import {Grid, Button, Divider} from '@material-ui/core';
import PropTypes from 'prop-types';

export default function PlayableResut(props) {
    const initialModifiedResult = {};

    initialModifiedResult.score_matrix = props.result.score_matrix;
    initialModifiedResult.direction_matrix = props.result.direction_matrix;
    initialModifiedResult.alignments = [{path: []}];
    const [modifiedResult, setmodifiedResult] = useState(initialModifiedResult);
    const [directionPath, setdirectionPath] = useState([]);

    const addToDirectionPath = (direction) => {
        const newDirPath = directionPath.concat([direction]);
        setdirectionPath(newDirPath);
        console.log(newDirPath);
    };

    const removeFromDirectionPath = () => {
        const newDirPath = directionPath;
        newDirPath.pop();
        setdirectionPath(newDirPath);
        console.log(newDirPath);
    };

    const resetAllPath = () => {
        setdirectionPath([]);
        const r = modifiedResult;
        r.alignments[0].path = [];
        setmodifiedResult({...r});
    };

    const addToPath = (rIdx, cIdx) => {
        console.log('adding to path');
        const r = modifiedResult;
        const newPath = (r.alignments[0].path).concat([[rIdx, cIdx]]);
        r.alignments[0].path = newPath;
        setmodifiedResult({...r});
    };

    const removeFromPath = () => {
        console.log('removing from path');
        const r = modifiedResult;
        r.alignments[0].path.pop();
        setmodifiedResult({...r});
    };


    const editPath = (rIdx, cIdx) => {
        const path = modifiedResult.alignments[0].path;

        console.log('ineditpath');
        if (path.length === 0) {
            addToPath(rIdx, cIdx);
            return;
        }
        const lastItem = path[path.length - 1];
        if (lastItem[0] === rIdx && lastItem[1] === cIdx) {
            removeFromPath();
            removeFromDirectionPath();
            return;
        }
        const inputLenA = props.input.seqA.length;
        const inputLenB = props.input.seqB.length;

        if (rIdx === inputLenA && cIdx === inputLenB && path.length === 0) {
            addToPath(rIdx, cIdx);
            return;
        }
        const hasBelowCellInPath = lastItem[1] === cIdx &&
            lastItem[0] === (rIdx + 1);
        const hasRightCellInPath = lastItem[0] === rIdx &&
            lastItem[1] === (cIdx + 1);
        const hasDiagCellInPath = lastItem[0] === (rIdx + 1) &&
            lastItem[1] === (cIdx + 1);
        if (rIdx === inputLenA && hasRightCellInPath) {
            addToDirectionPath('LEFT');
            addToPath(rIdx, cIdx);
            return;
        }
        if (cIdx === inputLenB && hasBelowCellInPath) {
            addToPath(rIdx, cIdx);
            addToDirectionPath('UP');
            return;
        }
        if (hasBelowCellInPath || hasDiagCellInPath || hasRightCellInPath) {
            if (hasBelowCellInPath) {
                addToDirectionPath('UP');
            } else if (hasDiagCellInPath) {
                addToDirectionPath('DIAG');
            } else {
                addToDirectionPath('LEFT');
            }
            addToPath(rIdx, cIdx);

            return;
        }
    };
    let alignment = null;
    if (directionPath.length > 0 &&
        modifiedResult.alignments[0].path.length > 0) {
        const path = [...modifiedResult.alignments[0].path];
        alignment = <PairAlignAlignment
            alignment={getTracebackAlignment(props.input.seqA,
                props.input.seqB,
                path[0],
                directionPath)} />;
    } else {
        alignment = null;
    }


    return (
        <div style={{marginTop: 30}}>
            <Divider />
            <h3>Try your own path in DP matrix</h3>
            <Grid align="center"
                justify="center"
                container spacing={2}>
                <Grid item>
                    Select your own path.
                    <br />
                    Click on a cell to add to / remove from path
                    <br />
                    <br />
                    <Matrix
                        input={props.input}
                        result={modifiedResult}
                        selected={0}
                        onClickCell={editPath} />
                    <br />
                    <Button onClick={resetAllPath}>Reset Your Path</Button>
                </Grid>
                <Divider
                    orientation="vertical"
                    flexItem
                    style={{marginLeft: 20}} />
                <Grid item xs={6}>
                    <h4>Generated alignment will appear here</h4>
                    <br />
                    {alignment}
                </Grid>
            </Grid>


        </div>
    );
}


PlayableResut.propTypes = {
    input: PropTypes.shape({
        seqA: PropTypes.string,
        seqB: PropTypes.string,
    }),
    result: PropTypes.shape({
        score_matrix: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
        direction_matrix: PropTypes.arrayOf(
            PropTypes.arrayOf(
                PropTypes.arrayOf(PropTypes.number))),
        alignments: PropTypes.arrayOf(
            PropTypes.shape({
                path: PropTypes.arrayOf(
                    PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))),
            })),
    }),

};
