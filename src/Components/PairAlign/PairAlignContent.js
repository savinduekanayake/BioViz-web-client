import React from 'react';
import PairAlignInput from './PairAlignInput';
import Matrix from './Matrix/Matrix';
import PairAlignAlignment from './PairAlignAlignment';
import Button from '@material-ui/core/Button';

export default function PairAlignContent() {
    const [submitted, setSubmitted] = React.useState(false);

    const onSubmit=()=>{
        setSubmitted(true);
    };
    return (
        <div>
            <h2>PairAlign Mode</h2>
            <PairAlignInput/>
            <br/>
            <Button variant="outlined" color="secondary" onClick={onSubmit}>Submit</Button>
            <br/>
            <Matrix/>
            <br/>{submitted?<PairAlignAlignment/>:''}
            {/* <PairAlignAlignment/> */}
        </div>
    );
}
