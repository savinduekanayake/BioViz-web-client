import React, {useState, useEffect, useRef} from 'react';
import Base from './Base';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import {Tooltip, Box} from '@material-ui/core';
import RestoreIcon from '@material-ui/icons/Restore';
import UndoIcon from '@material-ui/icons/Undo';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import GamePlay from './GamePlay';
import GameAlignTable from './GameAlignTable';
import GameLable from './GameLable';

const useStyles = makeStyles(() => ({
    seq: {
        minWidth: 25,
        minHeight: 25,
        padding: 4,
        borderRadius: 2,
        backgroundColor: '#0a22536e',
    },
    match: {
        minWidth: 25,
        minHeight: 25,
        padding: 4,
        borderRadius: 2,
        backgroundColor: '#1e2e51',
    },
    gameplay: {
        backgroundColor: '#b7c0d138',
        borderRadius: '10px',
        padding: 20,
    },
    box: {
        backgroundColor: '#b7c0d138',
        borderRadius: '10px',
        padding: 10,
        paddingBottom: 40,
        paddingTop: 80,
    },
    resetBtn: {
        marginRight: 20,
        color: '#1e2e51',
        fontWeight: 'bolder',
    },
    submitBtn: {
        color: '#1e2e51',
        fontWeight: 'bolder',
    },
}));

export default function GameAlign(props) {
    const classes = useStyles();
    const initialInput = props.input;
    const [align, setAlign] = useState(props.input);
    const [prev, setPrev] = useState(false);

    useEffect(() => {
        setAlign(props.input);
    }, [props.input]);

    const indexLine = [];
    const row1 = [];
    const row2 = [];
    let match = 0;
    let mismatch = 0;
    let gap = 0;
    for (let i = 0; i < align.seqA.length; i++) {
        const index = i;
        const baseA = align.seqA.charAt(i) === '-' ? 'ga': align.seqA.charAt(i);
        const titleA = baseA === 'ga' ? 'Remove Gap' :
            baseA === 'e' ? 'end' : 'move -->';
        const baseB = align.seqB.charAt(i) === '-' ? 'ga': align.seqB.charAt(i);
        const titleB = baseB === 'ga' ? 'Remove Gap' :
            baseB === 'e' ? 'end' : 'move -->';
        let T = 0;
        if ((align.seqA.charAt(i) === '-' || align.seqB.charAt(i) === '-') ||
        (align.seqA.charAt(i) === 'e' || align.seqB.charAt(i) === 'e')) {
            // if gap in the middle or end
            gap+=1;
        } else if (align.seqA.charAt(i) === align.seqB.charAt(i)) {
            // if 2 elements are matching
            match+=1;
            T = 1;
        } else {
            // if 2 elements mismatch
            mismatch+=1;
        }
        indexLine.push(
            <td key={index}><h4 style={{color: '#40455e'}}>{index+1}</h4></td>,
        );
        row1.push(
            <td key={index} testid={'outputSeqA'}>
                <Tooltip title={titleA} placement="top" arrow>
                    <span>
                    <Button
                        className={T===1? classes.match:classes.seq}
                        testid={'A' + index}
                        variant="contained"
                        size="small"
                        onClick={() => changeSeqA(index)}
                        disabled={baseA==='e'?true:false}
                        style={baseA==='e'? {backgroundColor: '#0a22536e'} : {}}
                        label={align.seqA.charAt(i)} >
                            <Base index={index} base={baseA} />
                    </Button>
                    </span>
                </Tooltip></td>,
            );
        row2.push(
            <td key={index} testid={'outputSeqB'}>
            <Tooltip title={titleB} placement="bottom" arrow>
                <span>
                    <Button
                        className={T===1?classes.match:classes.seq}
                        testid={'B' + index}
                        variant="contained"
                        size="small"
                        onClick={() => changeSeqB(index)}
                        disabled={baseB==='e'?true:false}
                        style={baseB==='e'? {backgroundColor: '#0a22536e'} : {}}
                        label={align.seqB.charAt(i)} >
                            <Base index={index} base={baseB} />
                    </Button>
                </span>
            </Tooltip></td>,
        );
    }

    function changeSeqA(index) {
        setPrev(true);
                // change seqA in state object 'align'
        const lastIndex = align.seqA.length - 1;
        if (align.seqA.charAt(index) === '-') { //  REMOVE A GAP
            if (align.seqB.charAt(lastIndex) === 'e') {
                //  'e'-trailing gaps, only one seq has 'e's at a time
                //  if there is a gap at end of the seqB remove '-' from seqA
                //  and remove last 'e' of seqB to keep equal lengths
                setAlign({
                    seqA: align.seqA.substring(0, index) +
                        align.seqA.substring(index + 1),
                    seqB: align.seqB.substring(0, lastIndex),
                });
            } else {
                //  remove '-' from seqA and add 'e' to the end of seqA
                //  to keep equal lengths in 2 sequences
                setAlign({
                    seqA: align.seqA.substring(0, index) +
                        align.seqA.substring(index + 1) + 'e',
                    seqB: align.seqB,
                });
            }
        } else { // ADD A GAP
            if (align.seqA.charAt(lastIndex) === 'e') {
                //  if there is a gap at end of the seqA, add '-'
                //  and remove that 'e' in seqA
                setAlign({
                    seqA: align.seqA.substring(0, index) + '-' +
                        align.seqA.substring(index, lastIndex),
                    seqB: align.seqB,
                });
            } else {
                //  add '-' to seqA and 'e' to end of seqB to keep equal lengths
                setAlign({
                    seqA: align.seqA.substring(0, index) + '-' +
                        align.seqA.substring(index),
                    seqB: align.seqB + 'e',
                });
            }
        }
    }

    function changeSeqB(index) {
        setPrev(true);
                // change seqB in state object 'align'
        const lastIndex = align.seqA.length - 1;
        if (align.seqB.charAt(index) === '-') { // REMOVE A GAP
            if (align.seqA.charAt(lastIndex) === 'e') {
                setAlign({
                    seqA: align.seqA.substring(0, lastIndex),
                    seqB: align.seqB.substring(0, index) +
                        align.seqB.substring(index + 1),
                });
            } else {
                setAlign({
                    seqA: align.seqA,
                    seqB: align.seqB.substring(0, index) +
                        align.seqB.substring(index + 1) + 'e',
                });
            }
        } else { // ADD A GAP
            if (align.seqB.charAt(lastIndex) === 'e') {
                setAlign({
                    seqA: align.seqA,
                    seqB: align.seqB.substring(0, index) + '-' +
                        align.seqB.substring(index, lastIndex),
                });
            } else {
                setAlign({
                    seqA: align.seqA + 'e',
                    seqB: align.seqB.substring(0, index) + '-' +
                        align.seqB.substring(index),
                });
            }
        }
    }

    function reset() {
        setPrev(true);
        setAlign(initialInput);
    }

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
          ref.current = value;
        });
        return ref.current;
    }

    const prevState = usePrevious(align);
    function back() {
        setAlign(prevState);
        setPrev(false);
    }

    function sendAlign() {
        props.fetchAlign({alignA: align.seqA, alignB: align.seqB});
    }

    return (
        <Box className={classes.gameplay}>
            <GamePlay/>
                <br />
                <Box boxShadow={6} className={classes.box}>
                <GameAlignTable align1={row1} align2={row2}
                indexLine={indexLine}/>
                <div testid={'checkState'} value={align}/>
                <br /><br />
                <GameLable match={match} mismatch={mismatch} gap={gap}/>
                <br/><br/>
                <Button
                    testid=''
                    className={classes.resetBtn}
                    variant="outlined"
                    color="primary"
                    onClick={back}
                    disabled={prev?false:true}
                    endIcon={<UndoIcon/>}>
                    back
                </Button>
                <Button
                    testid='resetBtn'
                    className={classes.resetBtn}
                    variant="outlined"
                    color="primary"
                    onClick={reset} endIcon={<RestoreIcon/>}>
                    Reset
                </Button>
                <Button
                    variant="outlined"
                    className={classes.submitBtn}
                    color="primary"
                    onClick={sendAlign} endIcon={<Icon>send</Icon>}
                >
                    Submit
                </Button>
            </Box>
        </Box>
    );
}

GameAlign.propTypes = {
    input: PropTypes.shape({
        seqA: PropTypes.string,
        seqB: PropTypes.string,
    }),
    fetchAlign: PropTypes.func,
};


