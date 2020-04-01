import React from 'react';
import Cell from './Cell';

export default function Matrix() {
    const tableData=[];
    const tableHeader = [];
    tableHeader.push(<th>...</th>);
    for (let j = 0; j < 10; j++) {
        tableHeader.push(<th>A</th>);
    }
    tableData.push(<tr>{tableHeader}</tr>);

    for (let i = 0; i < 10; i++) {
        const tableRow=[];
        tableRow.push(<th>G</th>);
        for (let j = 0; j < 10; j++) {
            tableRow.push(<td><Cell value={10*i+j}/></td>);
        }
        tableData.push(<tr>{tableRow}</tr>);
    }

    return (
        <div style={{overflowX: 'scroll', width: '1000px', height: '500px'}}>
            <table >
                {tableData}
            </table>

        </div>
    );
}
