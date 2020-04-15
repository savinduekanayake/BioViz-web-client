import React from 'react';
import {setP1Input, setP2Input} from '../../Redux/Actions/PairAlign';
import CommonInput from '../CommonInput/CommonInput';
import Grid from '@material-ui/core/Grid';
import CommonScore from '../CommonScoreSchema/ScoreSchema';
import {useSelector} from 'react-redux';
import AlgoSelector from './AlgoSelector';


export default function PairAlignInput() {
    return (
        <div>
            <Grid container direction="column" spacing={3}>
                <Grid item>
                    <CommonInput inputHandler={setP1Input}
                        value={useSelector((state) => state.P1)}
                        title="Input Sequence 1 for Pair Wise Alignment"
                        type="PA" />
                </Grid>
                <Grid item>
                    <CommonInput inputHandler={setP2Input}
                        value={useSelector((state) => state.P2)}
                        title="Input Sequence 2 for Pair Wise Alignment"
                        type="PA" />
                </Grid>
                <Grid item>
                    <CommonScore />
                </Grid>
                <Grid item>
                    <AlgoSelector/>
                </Grid>


            </Grid>


        </div>
    );
}
