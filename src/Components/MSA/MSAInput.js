import React from 'react'
import { setP1Input, setP2Input } from '../../Redux/Actions/PairAlign'
import CommonInput from '../CommonInput/CommonInput'
import Grid from '@material-ui/core/Grid';
import CommonScore from '../CommonScoreSchema/ScoreSchema';
import Button from '@material-ui/core/Button';

import { useSelector, useDispatch } from 'react-redux';
import { addNewMSA, setMSAInput } from '../../Redux/Actions/MSA';



export default function MSAInput() {
    const dispatch = useDispatch();
    const handleMSAadd = (e) => {

        dispatch(addNewMSA())
    };

    const MSASeq = useSelector(state => state.MSASeq);

    let inputs = []

    MSASeq.forEach((element, index) => {
        const title = 'Input Sequence '.concat(index + 1, ' for MSA')
        inputs.push(<Grid item>
            <CommonInput inputHandler={setMSAInput} value={element.seq} MSAkey={element.key} title={title} type='MSA' />
        </Grid>)
    });

    return (
        <div>
            <Grid container direction="column" spacing={3}>
                {inputs}

            </Grid>
            <Button variant="outlined" color="secondary" onClick={handleMSAadd}>Add</Button>
        </div>
    )
}
