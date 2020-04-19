import React from 'react';
import CommonInput from '../CommonInput/CommonInput';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import {useSelector, useDispatch} from 'react-redux';
import {addNewMSA, setMSAInput, removeMSA} from '../../Redux/Actions/MSA';
import CommonScore from '../CommonScoreSchema/ScoreSchema';


export default function MSAInput() {
    const dispatch = useDispatch();
    const handleMSAadd = (e) => {
        dispatch(addNewMSA());
    };

    const MSASeq = useSelector((state) => state.MSASeq);

    const inputs = [];

    MSASeq.forEach((element, index) => {
        const title = 'Input Sequence '.concat(index + 1, ' for MSA');
        inputs.push(<Grid item>
            <CommonInput
                inputHandler={setMSAInput}
                closeHandler={removeMSA}
                value={element.seq}
                MSAkey={element.key} title={title} type='MSA' />
        </Grid>);
    });

    return (
        <div>
            <Grid container direction="column" spacing={3}>
                {inputs}
                <Grid item>
                    <Button variant="outlined"
                        color="secondary"
                        style={{color: 'green', borderColor: 'green'}}
                        onClick={handleMSAadd}>Add</Button>
                </Grid>
                <Grid item>
                    <CommonScore />
                </Grid>

            </Grid>

        </div>
    );
}
