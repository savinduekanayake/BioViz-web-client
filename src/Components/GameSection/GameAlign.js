import React, {useState, useEffect} from 'react';
import Base from './Base';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import {Tooltip, Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import GamePlay from './GamePlay';

const useStyles = makeStyles(() => ({
    seq: {
        minWidth: 25,
        minHeight: 25,
        padding: 4,
        borderRadius: 2,
    },
    box: {
        backgroundColor: '#0a225338',
        borderRadius: '10px',
        padding: 30,
        paddingBottom: 40,
    },
}));

export default function GameAlign(props) {
    const classes = useStyles();
    const initialInput = props.input;
    const [align, setAlign] = useState(props.input);

    useEffect(() => {
        setAlign(props.input);
    }, [props.input]);


    const row1 = [];
    for (let i = 0; i < align.seqA.length; i++) {
        const index = i;
        const base = align.seqA.charAt(i) === '-' ? 'ga' : align.seqA.charAt(i);
        const title = base === 'ga' ? 'Remove Gap' :
            base === 'e' ? 'end' : 'move -->';
        row1.push({
            base: <Base index={index} base={base} />,
            id: index, title: title,
        });
    }

    const row2 = [];
    for (let j = 0; j < align.seqB.length; j++) {
        const index = j;
        const base = align.seqB.charAt(j) === '-' ? 'ga' : align.seqB.charAt(j);
        const title = base === 'ga' ? 'Remove Gap' :
            base === 'e' ? 'end' : 'move -->';
        row2.push({
            base: <Base index={index} base={base} />,
            id: index, title: title,
        });
    }

    function changeSeqA(index) {
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
        } else if (align.seqA.charAt(index) !== 'e') { // ADD A GAP
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
        } else if (align.seqB.charAt(index) !== 'e') { // ADD A GAP
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
        setAlign(initialInput);
    }

    function sendAlign() {
        props.fetchAlign({alignA: align.seqA, alignB: align.seqB});
    }

    const align1 = row1.map(
        (ele) => <td key={ele.id}>
            <Tooltip title={ele.title} placement="top"
             className={classes.seq} arrow>
                <Button
                    id={'A' + ele.id}
                    variant="contained"
                    size="small"
                    style={{backgroundColor: '#0a22536e'}}
                    onClick={() => changeSeqA(ele.id)} >{ele.base}
                </Button>
            </Tooltip></td>);

    const align2 = row2.map((ele) => <td key={ele.id}>
        <Tooltip title={ele.title} placement="bottom"
             className={classes.seq} arrow>
            <Button id={'B' + ele.id}
                variant="contained"
                size="small"
                style={{backgroundColor: '#0a22536e'}}
                onClick={() => changeSeqB(ele.id)} >{ele.base}
            </Button></Tooltip></td>);

    const indexLine = row1.map((ele) => <td key={ele.id}>
        <h4 style={{color: '#40455e'}}>{ele.id+1}</h4></td>);

    return (
        <Box boxShadow={3} className={classes.box}>
            <GamePlay align1={align1} align2={align2} indexLine={indexLine}/>
            <br /><br />
            <Button
                style={{marginRight: 50}}
                variant="contained"
                color="secondary"
                onClick={reset}>
                Reset
            </Button>
            <Button
                variant="contained"
                color="secondary"
                onClick={sendAlign} endIcon={<Icon>send</Icon>}
            >
                Submit
            </Button>
        </Box>
    );
}

GameAlign.propTypes = {
    input: PropTypes.object,
    fetchAlign: PropTypes.func,
};


