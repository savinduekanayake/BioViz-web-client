import React from 'react';
import PropTypes from 'prop-types';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import PairAlignAlignment from './PairAlignAlignment';
import Matrix from './Matrix/Matrix';
import {Grid, IconButton} from '@material-ui/core';


export default function PairAlignResult(props) {
    const max = props.result.alignments.length;
    const [selectedAlignment, setselectedAlignment] = React.useState(0);
    const alignments = [
        <PairAlignAlignment
                alignment={props.result.alignments[selectedAlignment]}
                index={selectedAlignment}
                key={selectedAlignment}
        />,

    ];
    const onNext = ()=>{
        setselectedAlignment((selectedAlignment+1)%max);
    };
    const onPrevious = ()=>{
        setselectedAlignment(
            selectedAlignment-1 === -1 ? max-1 : selectedAlignment-1,
            );
    };
    // props.result.alignments.forEach((alignment, index) => {
    //     alignments.push(
    //         <PairAlignAlignment
    //             alignment={alignment}
    //             index={index}
    //             setSelected={setselectedAlignment} />,
    //     );
    // });

    const matrix = <Matrix input={props.input}
        result={props.result}
        selected={selectedAlignment} />;
    return (
        <div>
            <Grid container direction='row'>
                <Grid item xs={1}>
                    <IconButton onClick={onNext}>
                        <KeyboardArrowLeftIcon/>
                    </IconButton>
                </Grid>
                <Grid item>
                   {alignments}
                </Grid>
                <Grid item xs={1}>
                    <IconButton onClick={onPrevious}>
                        <KeyboardArrowRightIcon/>
                    </IconButton>
                </Grid>
            </Grid>
            {matrix}

        </div>
    );
}

PairAlignResult.propTypes = {
    result: PropTypes.shape({
        score_matrix: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
        alignments: PropTypes.arrayOf(
            PropTypes.shape({
                algn_a: PropTypes.string,
                algn_b: PropTypes.string,
            }),
        ),
    }),
    input: PropTypes.shape({
        seqA: PropTypes.string,
        seqB: PropTypes.string,
    }),
};
