import React from 'react';
import PropTypes from 'prop-types';
import PairAlignAlignment from './PairAlignAlignment';
import Matrix from './Matrix/Matrix';


export default function PairAlignResult(props) {
    const [selectedAlignment, setselectedAlignment] = React.useState(0);
    const alignments = [];
    props.result.alignments.forEach((alignment, index) => {
        alignments.push(
            <PairAlignAlignment
                alignment={alignment}
                index={index}
                setSelected={setselectedAlignment} />,
        );
    });

    const matrix = <Matrix input={props.input}
        result={props.result}
        selected={selectedAlignment} />;
    return (
        <div>
            {alignments}
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
