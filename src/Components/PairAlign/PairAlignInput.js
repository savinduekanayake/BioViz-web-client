import React from 'react'
import { setP1Input,setP2Input } from '../../Redux/Actions'
import CommonInput from '../CommonInput/CommonInput'
import Grid from '@material-ui/core/Grid';


export default function PairAlignInput() {
    return (
        <div>
            <Grid container direction="column" spacing={3}>
                <Grid item>
                <CommonInput inputHandler = {setP1Input} inputSelector = 'P1'/>
                </Grid>
                <Grid item>
                <CommonInput inputHandler = {setP2Input} inputSelector = 'P2'/>
                </Grid>

            </Grid>
            
            
        </div>
    )
}
