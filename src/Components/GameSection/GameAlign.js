import React , {useState, useEffect} from 'react';
import Base from './Base';
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import DnaIcon from '../../assets/icons/dna.svg';
import { Tooltip , Box } from '@material-ui/core';
import CommonScore from '../CommonScoreSchema/ScoreSchema';
import GameInstruction from './GameInstruction';


export default function GameAlign(props) {

    const initialInput = props.input;
    const [algn , setAlgn ] = useState(props.input);

    useEffect(() => {
        if(props.input !== algn){
            setAlgn(props.input);
        }
    },[props.input]);


    const row1 = [];
    for (let i = 0; i < algn.algnA.length; i++) {
        const index = i;
        const base = algn.algnA.charAt(i) === '-' || algn.algnA.charAt(i) === 'g' ? 'ga' : algn.algnA.charAt(i);
        const title = base === "ga" ? "Remove Gap" : base==='r'? "end" :"Add Gap";
        row1.push({base:<Base index={index} base={base}/>, id:index, title:title});
    }
   
    const row2 = [];
    for (let j = 0; j < algn.algnB.length; j++) {
        const index = j;
        const base = algn.algnB.charAt(j) === '-' || algn.algnB.charAt(j) === 'g' ? 'ga' : algn.algnB.charAt(j);
        const title = base === "ga" ? "Remove Gap" : "Add Gap";
        row2.push({base:<Base index={index} base={base}/>, id:index, title:title});
    }
        
    function changeSeqA(index){
        const lastIndex = algn.algnA.length-1;
        // REMOVE A GAP
        if(algn.algnA.charAt(index)==='g' || algn.algnA.charAt(index) === '-'){
            if(initialInput.algnA.charAt(lastIndex)==='r'){
                setAlgn({
                    algnA : algn.algnA.substring(0,index) + algn.algnA.substring(index+1) + 'r',
                    algnB : algn.algnB
                })
            }else{
                setAlgn({
                    algnA : algn.algnA.substring(0,index) + algn.algnA.substring(index+1),
                    algnB : algn.algnB
                })
            }
            // setAlgn({
            //     algnA : algn.algnA.substring(0,index) + algn.algnA.substring(index+1),
            //     algnB : algn.algnB
            // })
            // remove gap at the given index
            // update this change in alignA in state object
        }
        // ADD A GAP
        else if(algn.algnA.charAt(index)!=='r'){
            if(algn.algnA.charAt(lastIndex)==='r'){
                setAlgn({
                    algnA : algn.algnA.substring(0,index) + 'g' + algn.algnA.substring(index,lastIndex),
                    algnB : algn.algnB
                })
            }else{
                setAlgn({
                    algnA : algn.algnA.substring(0,index) + 'g' + algn.algnA.substring(index),
                    algnB : algn.algnB
                })
            }
            // add a gap next to the base element at the given index
            // update this change in alignA in state object
        }        
    }

    function changeSeqB(index){
        const lastIndex = algn.algnA.length-1;
        // REMOVE A GAP
        if(algn.algnB.charAt(index)==='g' || algn.algnB.charAt(index) === '-'){
            if(initialInput.algnB.charAt(lastIndex)==='r'){
                setAlgn({
                    algnA : algn.algnA,
                    algnB : algn.algnB.substring(0,index) + algn.algnB.substring(index+1) + 'r'
                })
            }else{
                setAlgn({
                    algnA : algn.algnA,
                    algnB : algn.algnB.substring(0,index) + algn.algnB.substring(index+1)
                })
            }
            // setAlgn({
            //     algnA : algn.algnA,
            //     algnB : algn.algnB.substring(0,index) + algn.algnB.substring(index+1)
            // })
            // remove gap at the given index
            // update this change in alignB in state object
        }
        // ADD A GAP
        else if(algn.algnB.charAt(index)!=='r'){
            if(algn.algnB.charAt(lastIndex)==='r'){
                setAlgn({
                    algnA : algn.algnA,
                    algnB : algn.algnB.substring(0,index) + 'g' + algn.algnB.substring(index,lastIndex)
                })
            }else{
                setAlgn({
                    algnA : algn.algnA,
                    algnB : algn.algnB.substring(0,index) + 'g' + algn.algnB.substring(index)
                })
            }
            // add a gap next to the base element at the given index
            // update this change in alignB in state object
        }        
    }

    function reset(){
        setAlgn(initialInput);
    }

    function sendAlign(){
        props.fetchAlign({alignA:algn.algnA,alignB:algn.algnB});
    }

    const align1 = row1.map(ele => <td key={ele.id}><Tooltip title={ele.title} placement="top" arrow><Button id={"A"+ele.id} variant="contained" size="small" style={{minWidth:25, minHeight:25, padding:4, borderRadius:2, backgroundColor:"#0a22536e"}} onClick={() => changeSeqA(ele.id)} >{ele.base}</Button></Tooltip></td>)
    const align2 = row2.map(ele => <td key={ele.id}><Tooltip title={ele.title} placement="bottom" arrow><Button id={"B"+ele.id} variant="contained" size="small" style={{minWidth:25, minHeight:25, padding:4, borderRadius:2, backgroundColor:"#0a22536e"}} onClick={() => changeSeqB(ele.id)} >{ele.base}</Button></Tooltip></td>)
   
    return (
        <Box boxShadow={3} style={{backgroundColor:"#0a22536e" , height:"470px" , borderRadius:"10px" , padding:10}}>
            {/* "#171b32" #3a3f57 #171b32 */}
            <br/>
            <h1 style={{color:"#1e2e51", border:5}}>GamePlay</h1>
            <br/><br/>
            <div style={{marginLeft:55}}>
            <CommonScore/>
            </div>
            <br/>
            <GameInstruction/>
            <br/>
            <table>
                <tbody>
                    <tr>
                        <td style={{minWidth:50}}>
                            <Icon><img src={DnaIcon} alt="seq 1" /></Icon>
                        </td>
                        {align1}
                    </tr>
                </tbody>
            </table>
            <table>
                <tbody>
                    <tr>
                        <td style={{minWidth:50}}>
                            <Icon><img src={DnaIcon} alt="seq 2" /></Icon>
                        </td>
                        {align2}
                    </tr>
                </tbody>
            </table>
            <br/>
            <br/>
            <Button variant="contained" color="secondary" onClick={reset}>Reset</Button>
            <Button variant="contained" color="secondary" onClick={sendAlign} endIcon={<Icon>send</Icon>}
                >
                Submit
            </Button>
        </Box>
    );
}


