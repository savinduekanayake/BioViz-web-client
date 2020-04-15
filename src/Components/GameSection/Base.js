import React from 'react';
import {Avatar} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const algnA = 'GATA-CTACTCAGTATTCTACCACCA-ACGAT-';
const algnB = 'GACATCTA-T-AG-A--ATACGAATATACGATA';


const useStyles = makeStyles((theme) => ({
    avatar: {
        height: '20px',
        width: '20px',
        fontSize: '12px',

    },
    A: {
        color: 'white',
        backgroundColor: 'red',
    },
    C: {
        color: 'white',
        backgroundColor: 'blue',
    },
    G: {
        color: 'white',
        backgroundColor: 'purple',
    },
    T: {
        color: 'white',
        backgroundColor: 'green',
    },
    ga: {
        height: '20px',
        width: '20px',
        fontSize: '12px',
        color: 'black',
        backgroundColor: 'black',
        display: 'inline',
    },

}));

export default function Base(props) {
    const classes = useStyles();
    const name = props.name;
    const base = props.base;
    const gapid = name + 'gap';

    function onClickHandler() {
        const base = document.getElementById(name);
        const td = document.createElement('td');
        const gap = document.createElement('button');
        gap.setAttribute('class',classes.ga);
        gap.onClick = function() {
            alert("yes");
            gap.style.cssText = 'display:none;';
        }
        td.appendChild(gap);
        base.insertAdjacentElement('afterbegin', td);
    }

    

    return(
        <div id={name}>
            <td>
            <button variant="square" 
            className={`${classes.avatar} ${classes[base]}`} onClick={onClickHandler}>
            {base}</button>
            </td>
        </div>
    );
}