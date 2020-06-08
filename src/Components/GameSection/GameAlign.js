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
        paddingTop: 40,
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
    bestStateBtn: {
        backgroundColor: '#9e9e9499',
        color: '#222c5a',
        fontWeight: 'bolder',
        padding: 10,
    },
}));

/**
 * Component to control the state of the game and view the game sequences
 * @param {Object} props - props
 * @return {React.ReactElement}
 */
export default function GameAlign(props) {
    const classes = useStyles();
    const initialInput = props.input;
    /**
     * current state of game aligns
     */
    const [align, setAlign] = useState(props.input);
    /**
     * handle 'back' button
     * false -> disabled
     */
    const [prev, setPrev] = useState(false);
    /**
     * maximum identity state
     */
    const [bestAlign, setBestAlign] = useState({
        matches: 0,
        identity: 0,
        alignment: {}});

    useEffect(() => {
        setAlign(props.input);
        setBestAlign({
            matches: 0,
            identity: 0,
            alignment: {},
        });
    }, [props.input]);

    const indexLine = [];
    const row1 = [];
    const row2 = [];
    let match = 0;
    let mismatch = 0;
    let gap = 0;
    let identity = 0;
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
            gap+=1;
        } else if (align.seqA.charAt(i) === align.seqB.charAt(i)) {
            match+=1;
            T = 1;
        } else {
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

    identity = match/align.seqA.length;

    /**
     * if current identity is greater
     */
    if (identity>bestAlign.identity) {
       setBestAlign({
        matches: match,
        identity: identity,
        alignment: align,
       });
    }

    /**
     * change seqA in state object 'align' when button in seqA is clicked
     * @param {Number} index - index of element in seqA
     */
    function changeSeqA(index) {
        setPrev(true);
        const lastIndex = align.seqA.length - 1;
        /**
         * remove a gap in seqA
         */
        if (align.seqA.charAt(index) === '-') {
            if (align.seqB.charAt(lastIndex) === 'e') {
                /**
                 * 'e'-trailing gaps, only one seq has 'e's at a time
                 * if there is a gap at end of the seqB remove '-' from seqA
                 * and remove last 'e' of seqB to keep equal lengths
                 */
                setAlign({
                    seqA: align.seqA.substring(0, index) +
                        align.seqA.substring(index + 1),
                    seqB: align.seqB.substring(0, lastIndex),
                });
            } else {
                /**
                 * remove '-' from seqA and add 'e' to the end of seqA
                 * to keep equal lengths in 2 sequences
                 */
                setAlign({
                    seqA: align.seqA.substring(0, index) +
                        align.seqA.substring(index + 1) + 'e',
                    seqB: align.seqB,
                });
            }
        /**
         * add a gap before element at index in seqA
         */
        } else {
            if (align.seqA.charAt(lastIndex) === 'e') {
                /**
                 * if there is a gap at end of the seqA, add '-'
                 * and remove that 'e' in seqA
                 */
                setAlign({
                    seqA: align.seqA.substring(0, index) + '-' +
                        align.seqA.substring(index, lastIndex),
                    seqB: align.seqB,
                });
            } else {
                /**
                 * add '-' to seqA and 'e' to end of seqB to keep equal lengths
                 */
                setAlign({
                    seqA: align.seqA.substring(0, index) + '-' +
                        align.seqA.substring(index),
                    seqB: align.seqB + 'e',
                });
            }
        }
    }

     /**
     * change seqB in state object 'align' when button in seqB is clicked
     * @param {Number} index - index of element in seqB
     */
    function changeSeqB(index) {
        setPrev(true);
        const lastIndex = align.seqA.length - 1;
        /**
         * remove a gap in seqB
         */
        if (align.seqB.charAt(index) === '-') {
            if (align.seqA.charAt(lastIndex) === 'e') {
                /**
                 * 'e'-trailing gaps, only one seq has 'e's at a time
                 * if there is a gap at end of the seqA remove '-' from seqB
                 * and remove last 'e' of seqA to keep equal lengths
                 */
                setAlign({
                    seqA: align.seqA.substring(0, lastIndex),
                    seqB: align.seqB.substring(0, index) +
                        align.seqB.substring(index + 1),
                });
            } else {
                /**
                 * remove '-' from seqB and add 'e' to the end of seqB
                 * to keep equal lengths in 2 sequences
                 */
                setAlign({
                    seqA: align.seqA,
                    seqB: align.seqB.substring(0, index) +
                        align.seqB.substring(index + 1) + 'e',
                });
            }
         /**
         * add a gap before element at index in seqB
         */
        } else {
            if (align.seqB.charAt(lastIndex) === 'e') {
                /**
                 * if there is a gap at end of the seqB, add '-'
                 * and remove that 'e' in seqB
                 */
                setAlign({
                    seqA: align.seqA,
                    seqB: align.seqB.substring(0, index) + '-' +
                        align.seqB.substring(index, lastIndex),
                });
            } else {
                /**
                 * add '-' to seqA and 'e' to end of seqB to keep equal lengths
                 */
                setAlign({
                    seqA: align.seqA + 'e',
                    seqB: align.seqB.substring(0, index) + '-' +
                        align.seqB.substring(index),
                });
            }
        }
    }

    /**
     * set current state with maximum identity state
     */
    function setBestIdentityState() {
        setAlign(bestAlign.alignment);
        setPrev(true);
    }

    /**
     * set current state with initialInput in props.input
     */
    function reset() {
        setAlign(initialInput);
        setPrev(true);
    }

    /**
     * keep previous state
     * @param {Object} value - align object
     * @return {Object} - previous state
     */
    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
          ref.current = value;
        });
        return ref.current;
    }

    /**
     * variable to keep previous state
     */
    const prevState = usePrevious(align);
    /**
     * set current state with previous state
     */
    function back() {
        setAlign(prevState);
        setPrev(false);
    }

    /**
     * when submit send alignment details to
     * callback function in GameSection Component
     */
    function onSubmit() {
        props.fetchAlign({alignA: align.seqA, alignB: align.seqB,
                        identity: identity});
    }

    return (
        <Box className={classes.gameplay}>
            <GamePlay/>
            <br /><br />
            <Box boxShadow={6} className={classes.box}>
                <div>
                    <h3 style={{color: '#494946'}}>
                        Sequences can be replaced at any time by the state
                        with the maximum identity you have achieved.
                        <br/>Feel free to play and get the
                         maximum identity possible.
                    </h3>
                </div>
                <Tooltip
                title={'Go to a state with maximum identity achieved so far'}
                placement="bottom" arrow>
                    <Button
                        testid='bestIdentityBtn'
                        className={classes.bestStateBtn}
                        onClick={setBestIdentityState}>
                        Go to a your best identity state
                    </Button>
                </Tooltip>
                <br/><br/>
                <GameLable match={match} mismatch={mismatch} gap={gap}
                    identity={identity} bestMatch={bestAlign.matches}
                    bestIdentity={bestAlign.identity}/>
                 <br/><br/><br/><br/>
                <GameAlignTable align1={row1} align2={row2}
                indexLine={indexLine}/>
                <div testid={'checkState'} value={align}/>
                <br />
                <Button
                    testid='prevBtn'
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
                    testid='submitBtn'
                    variant="outlined"
                    className={classes.submitBtn}
                    color="primary"
                    onClick={onSubmit} endIcon={<Icon>send</Icon>}
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


