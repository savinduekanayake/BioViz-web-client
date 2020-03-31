import React from 'react'
import PairAlignInput from './PairAlignInput'
import Matrix from '../Matrix/Matrix'
import PairAlignAlignment from './PairAlignAlignment'
import Button from '@material-ui/core/Button';

export default function PairAlignContent() {
    return (
        <div>
            <h2>PairAlign Mode</h2>
            <PairAlignInput/>
            <br/>
            <Button variant="outlined" color="secondary">Submit</Button>
            <br/>
            <Matrix/>
            <br/>
            <PairAlignAlignment/>
        </div>
    )
}
