import React from 'react';
import CommonInput from '../../CommonInput/CommonInput';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import {useSelector, useDispatch} from 'react-redux';
import {addNewMSA, setMSAInput, removeMSA,
     setMSAInputRange, setMSAInputName} from '../../../Redux/Actions/MSA';
import {Divider} from '@material-ui/core';

export default function MSASequencesInput() {
    const dispatch = useDispatch();
    const handleMSAadd = (e) => {
        dispatch(addNewMSA());
    };

    const MSASeq = useSelector((state) => state.MSASeq);

    const inputs = [];

    MSASeq.forEach((element, index) => {
        const title = 'Input Sequence '.concat(index + 1, ' for MSA');
        inputs.push(<Grid item key={element.key}>
            <CommonInput
                inputHandler={setMSAInput}
                rangeInputHandler={setMSAInputRange}
                nameInputHandler={setMSAInputName}
                closeHandler={removeMSA}
                value={element.seq}
                range={element.range}
                sequenceName={element.name}
                MSAkey={element.key} title={title} type='MSA' />
        </Grid>);
    });
    return (
        <div style={{maxHeight: 500, overflowY: 'auto'}}>
            <Grid
            container
            direction="column"
            spacing={0}
            style={{width: '98%'}}
            >
                {inputs}
                <Divider style={{marginBottom: 10}}/>
                <Grid item>
                    <Button variant="contained"
                        color="secondary"
                        style={{color: 'white', backgroundColor: 'green'}}
                        onClick={handleMSAadd}>Add More</Button>
                </Grid>
            </Grid>

        </div>
    );
}
