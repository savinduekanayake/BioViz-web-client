import React , {useState} from 'react';
import Base from './Base';


export default function GameAlign() {

    const inputAlign = {
        algnA:"AAGTTTTTTTA",
        algnB:"AAAAGTTTTTT",    
    }
    const [algn , setAlgn ] = useState(inputAlign);

    const row1 = [];
    for (let i = 0; i < algn.algnA.length; i++) {
        const index = i;
        const base = algn.algnA.charAt(i) === '-' || algn.algnA.charAt(i) === 'g' ? 'ga' : algn.algnA.charAt(i);
        row1.push({base:<Base index={index} base={base}/>, id:index});
    }
   
    const row2 = [];
    for (let j = 0; j < algn.algnB.length; j++) {
        const index = j;
        const base = algn.algnB.charAt(j) === '-' || algn.algnB.charAt(j) === 'g' ? 'ga' : algn.algnB.charAt(j);
        row2.push({base:<Base index={index} base={base}/>, id:index});
    }
        
    function addGapA(index){

        if(algn.algnA.charAt(index)==='g'){
            setAlgn({
                algnA : algn.algnA.substring(0,index) + algn.algnA.substring(index+1),
                algnB : algn.algnB
            })
        }
        else{
        setAlgn({
            algnA : algn.algnA.substring(0,index) + 'g' + algn.algnA.substring(index),
            algnB : algn.algnB
        })
        }        
    }

    function addGapB(index){

        if(algn.algnB.charAt(index)==='g'){
            setAlgn({
                algnA : algn.algnA,
                algnB : algn.algnB.substring(0,index) + algn.algnB.substring(index+1)
            })
        }
        else{
        setAlgn({
            algnA : algn.algnA,
            algnB : algn.algnB.substring(0,index) + 'g' + algn.algnB.substring(index)
        })
        }        
    }

    const align1 = row1.map(ele => <td key={ele.id}><button onClick={() => addGapA(ele.id)} >{ele.base}</button></td>)
    const align2 = row2.map(ele => <td key={ele.id}><button onClick={() => addGapB(ele.id)} >{ele.base}</button></td>)

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        {align1}
                    </tr>
                </tbody>
            </table>
            <table>
                <tbody>
                    <tr>
                        {align2}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}


