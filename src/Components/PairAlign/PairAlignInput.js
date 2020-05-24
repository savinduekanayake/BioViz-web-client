import React from 'react';
import {setP1Input, setP2Input,
    setP1Range, setP2Range,
    setP1Name, setP2Name} from '../../Redux/Actions/PairAlign';
import CommonInput from '../CommonInput/CommonInput';
import Grid from '@material-ui/core/Grid';
// import CommonScore from '../CommonScoreSchema/ScoreSchema';
import {useSelector} from 'react-redux';
import AlgoSelector from './AlgoSelector';
import Score from '../CommonScoreSchema/Score';
import {Box} from '@material-ui/core';


export default function PairAlignInput() {
    return (
        <div>
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <CommonInput inputHandler={setP1Input}
                        rangeInputHandler={setP1Range}
                        nameInputHandler={setP1Name}
                        value={useSelector((state) => state.P1.seq)}
                        range={useSelector((state) => state.P1.range)}
                        sequenceName={useSelector((state) => state.P1.name)}
                        title="Input Sequence 1 for Pair Wise Alignment"
                        type="PA" />
                </Grid>
                <Grid item>
                    <CommonInput inputHandler={setP2Input}
                        rangeInputHandler={setP2Range}
                        nameInputHandler={setP2Name}
                        value={useSelector((state) => state.P2.seq)}
                        range={useSelector((state) => state.P2.range)}
                        sequenceName={useSelector((state) => state.P2.name)}
                        title="Input Sequence 2 for Pair Wise Alignment"
                        type="PA" />
                </Grid>
                <Grid item>
                    <Box boxShadow={3} padding={5}>
                        <AlgoSelector />
                    </Box>
                </Grid>
                <Grid item>
                    <Box boxShadow={3} padding={5}>
                        <Score />
                    </Box>
                </Grid>


            </Grid>


        </div>
    );
}
