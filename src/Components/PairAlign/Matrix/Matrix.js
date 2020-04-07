import React from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';
import {FixedSizeGrid} from 'react-window';

const max = 1000;
const makeCell = ({columnIndex, rowIndex, style}) => {
    let cell;
    if (columnIndex === 0) {
        if (rowIndex ===0) {
            cell = '...';
        } else {
            cell = <b>G</b>;
        }
    } else if (rowIndex===0) {
        cell = <b>A</b>;
    } else {
        cell = <Cell value={(rowIndex-1) *max + columnIndex} />;
    }
    return (
        <div style={style}>
            {cell}
        </div>
    );
};

makeCell.propTypes = {
    columnIndex: PropTypes.number.isRequired,
    rowIndex: PropTypes.number.isRequired,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};


export default function Matrix() {
    // const tableData=[];
    // const tableHeader = [];
    // tableHeader.push(<th>...</th>);
    // for (let j = 0; j < max; j++) {
    //     tableHeader.push(<th>A</th>);
    // }
    // tableData.push(<tr>{tableHeader}</tr>);

    // for (let i = 0; i < max; i++) {
    //     const tableRow=[];
    //     tableRow.push(<th>G</th>);
    //     for (let j = 0; j < max; j++) {
    //         tableRow.push(<td><Cell value={max*i+j}/></td>);
    //     }
    //     tableData.push(<tr>{tableRow}</tr>);
    // }

    // return (
    //     <div style={{overflowX: 'auto', width: '1000px', height: '500px'}}>
    //         <table >
    //             {tableData}
    //         </table>

    //     </div>
    // );
    return (
        <FixedSizeGrid
            className="Grid"
            columnCount={max}
            columnWidth={50}
            height={300}
            rowCount={max}
            rowHeight={35}
            width={600}
        >
            {makeCell}
        </FixedSizeGrid>

    );
}
