import React, {useState, useEffect} from 'react';
import Base from './Base';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import DnaIcon from '../../assets/icons/dna.svg';
import {Tooltip, Box} from '@material-ui/core';
import CommonScore from '../CommonScoreSchema/ScoreSchema';
import GameInstruction from './GameInstruction';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    seq: {
        minWidth: 25,
        minHeight: 25,
        padding: 4,
        borderRadius: 2,
        backgroundColor: '#00000020',
    },
    box: {
        backgroundColor: '#00000020',
        borderRadius: '10px',
        padding: 10,
        paddingBottom: 40,
    },
}));

export default function GameAlign(props) {
    const classes = useStyles();
    const initialInput = props.input;
    const [algn, setAlgn] = useState(props.input);

    useEffect(() => {
        setAlgn(props.input);
    }, [props.input]);


    const row1 = [];
    for (let i = 0; i < algn.algnA.length; i++) {
        const index = i;
        const base = algn.algnA.charAt(i) === '-' ? 'ga' : algn.algnA.charAt(i);
        const title = base === 'ga' ? 'Remove Gap' :
            base === 'e' ? 'end' : 'move -->';
        row1.push({
            base: <Base index={index} base={base} />,
            id: index, title: title,
        });
    }

    const row2 = [];
    for (let j = 0; j < algn.algnB.length; j++) {
        const index = j;
        const base = algn.algnB.charAt(j) === '-' ? 'ga' : algn.algnB.charAt(j);
        const title = base === 'ga' ? 'Remove Gap' :
            base === 'e' ? 'end' : 'move -->';
        row2.push({
            base: <Base index={index} base={base} />,
            id: index, title: title,
        });
    }

    function changeSeqA(index) {
        const lastIndex = algn.algnA.length - 1;
        // REMOVE A GAP
        if (algn.algnA.charAt(index) === '-') {
            if (algn.algnB.charAt(lastIndex) === 'e') {
                setAlgn({
                    algnA: algn.algnA.substring(0, index) +
                        algn.algnA.substring(index + 1),
                    algnB: algn.algnB.substring(0, lastIndex),
                });
            } else {
                setAlgn({
                    algnA: algn.algnA.substring(0, index) +
                        algn.algnA.substring(index + 1) + 'e',
                    algnB: algn.algnB,
                });
            }
            // remove gap at the given index
            // update this change in alignA in state object
        } else if (algn.algnA.charAt(index) !== 'e') { // ADD A GAP
            if (algn.algnA.charAt(lastIndex) === 'e') {
                setAlgn({
                    algnA: algn.algnA.substring(0, index) + '-' +
                        algn.algnA.substring(index, lastIndex),
                    algnB: algn.algnB,
                });
            } else {
                setAlgn({
                    algnA: algn.algnA.substring(0, index) + '-' +
                        algn.algnA.substring(index),
                    algnB: algn.algnB + 'e',
                });
            }
            // add a gap next to the base element at the given index
            // update this change in alignA in state object
        }
    }

    function changeSeqB(index) {
        const lastIndex = algn.algnA.length - 1;
        // REMOVE A GAP
        if (algn.algnB.charAt(index) === '-') {
            if (algn.algnA.charAt(lastIndex) === 'e') {
                setAlgn({
                    algnA: algn.algnA.substring(0, lastIndex),
                    algnB: algn.algnB.substring(0, index) +
                        algn.algnB.substring(index + 1),
                });
            } else {
                setAlgn({
                    algnA: algn.algnA,
                    algnB: algn.algnB.substring(0, index) +
                        algn.algnB.substring(index + 1) + 'e',
                });
            }
            // remove gap at the given index
            // update this change in alignB in state object
        } else if (algn.algnB.charAt(index) !== 'e') { // ADD A GAP
            if (algn.algnB.charAt(lastIndex) === 'e') {
                setAlgn({
                    algnA: algn.algnA,
                    algnB: algn.algnB.substring(0, index) + '-' +
                        algn.algnB.substring(index, lastIndex),
                });
            } else {
                setAlgn({
                    algnA: algn.algnA + 'e',
                    algnB: algn.algnB.substring(0, index) + '-' +
                        algn.algnB.substring(index),
                });
            }
            // add a gap next to the base element at the given index
            // update this change in alignB in state object
        }
    }

    function reset() {
        setAlgn(initialInput);
    }

    function sendAlign() {
        props.fetchAlign({alignA: algn.algnA, alignB: algn.algnB});
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
            <h1 style={{color: '#1e2e51', border: 5}}>GamePlay</h1>
            <br /><br />
            <div style={{marginLeft: 55}}>
                <CommonScore />
            </div>
            <br />
            <GameInstruction />
            <br /><br />
            <table style={{width: 1500, overflowX: 'auto', display: 'block'}}>
                <tbody>
                    <tr>
                        <td style={{minWidth: 50}}>
                            <Icon><img src={DnaIcon} alt="seq 1" /></Icon>
                        </td>
                        {align1}
                    </tr>
                    <tr>
                        <td style={{minWidth: 50}}>
                            <Icon><img src={DnaIcon} alt="seq 2" /></Icon>
                        </td>
                        {align2}
                    </tr>
                    <tr>
                        <td style={{minWidth: 50}}>
                        </td>
                        {indexLine}
                    </tr>
                </tbody>
            </table>
            <br />
            <br />
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


