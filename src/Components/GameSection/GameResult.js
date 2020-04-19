import React from 'react'
import { Typography, CardContent, Box } from '@material-ui/core'
import Card from '@material-ui/core/Card'

export default function GameResult(props) {
    const alignA = props.aligns.alignA;
    const alignB = props.aligns.alignB;
    const matchScore = props.aligns.match;
    const mismatchPenanlty = props.aligns.mismatch;
    const gapPenalty = props.aligns.gap;
    const minLength = Math.min(alignA.length,alignB.length);
    const row = [];
    let score = 0;

    for(let i = 0; i<minLength; i++){
        if((alignA.charAt(i)==='-' || alignB.charAt(i)==='-')||(alignA.charAt(i)==='e' || alignB.charAt(i)==='e')) {
            score += gapPenalty;
            row.push({type:"gap", value:gapPenalty});
        } 
        else if(alignA.charAt(i) === alignB.charAt(i)){
            score += matchScore;
            row.push({type:"match", value:matchScore});
        }
        else {
            score += mismatchPenanlty;
            row.push({type:"mismatch", value:mismatchPenanlty});
        }
    }

    const result = row.map(ele => <td>{ele.type}<br/>{ele.value}</td>);

    return (
        <Box style={{backgroundColor:"#d9dee1" , height:"300px" , borderRadius:"10px", padding:10}}>
            <br/>
            <h3>Result</h3>
            <br/>
            <h3>Alignment</h3>
            <table style={{marginLeft:"auto", marginRight:"auto"}}>
                <tbody>
                    <tr>
                        RESULT
                        {result}
                    </tr>
                </tbody>
            </table>
            <div style={{height:100}}>
            <br/><br/>
            <h3 style={{display:"inline"}}>Score</h3>
            <Card variant="outlined" style={{width:60 , height:100 , display:"inline", marginLeft:10 , backgroundColor:"#e5e6e7"}}>
                <CardContent style={{display:"inline"}}>
                    <Typography style={{display:"inline"}}>
                        SCORE{score}
                    </Typography>
                </CardContent>
            </Card>
            </div>
        </Box>

    )
}
