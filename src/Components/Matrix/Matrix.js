import React from 'react';
import Cell from './Cell';

export default function Matrix() {
    const max = 10;
    const tableData=[];
    const tableHeader = [];
    tableHeader.push(<th>...</th>);
    for (let j = 0; j < max; j++) {
        tableHeader.push(<th>A</th>);
    }
    tableData.push(<tr>{tableHeader}</tr>);

    for (let i = 0; i < max; i++) {
        const tableRow=[];
        tableRow.push(<th>G</th>);
        for (let j = 0; j < max; j++) {
            tableRow.push(<td><Cell value={max*i+j}/></td>);
        }
        tableData.push(<tr>{tableRow}</tr>);
    }

    return (
        <div style={{overflowX: 'auto', width: '1000px', height: '500px'}}>
            <table >
                {tableData}
            </table>

        </div>
    );
}
