import React from 'react';
import PropTypes from 'prop-types';
import MSATree from './MSATree';
import MSAAlignment from './MSAAlignment';

export default function MSAResult(props) {
    // const alignments=[];
    // props.result.alignments.forEach((element) => {
    //     alignments.push(<div>{element}</div>);
    // });
    return (
        <div>
            <MSAAlignment alignments={props.result.alignments}/>
            <br/>
            <MSATree treeData={props.result.graph}/>

        </div>
    );
}

MSAResult.propTypes = {
    result: PropTypes.shape({
        alignments: PropTypes.arrayOf(PropTypes.string),
        graph: PropTypes.shape({
            id: PropTypes.number,
            children: PropTypes.array,
        }),
    }),

};
