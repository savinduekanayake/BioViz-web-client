import React from 'react'
import { Typography, CardContent, Box } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import Base from './Base';

export default function GameResult() {

    const alignment = 'GACATCTA-T-AG-A--ATACGAATATACGATACC';
    const score = 150;
    const row = [];

    for (let i = 0; i < alignment.length; i++) {
        const index = i;
        const base = alignment.charAt(i) === '-' || alignment.charAt(i) === 'g' ? 'ga' : alignment.charAt(i);
        row.push({base:<Base index={index} base={base}/>, id:index});
    }

    const align = row.map(ele => <td key={ele.id}>{ele.base}</td>);

    return (
        <Box style={{backgroundColor:"#d9dee1" , height:"300px" , borderRadius:"10px", padding:10}}>
            <br/>
            <h3 style={{textShadow: "1px 1px 2px #a6a6a7"}}>Result</h3>
            <br/>
            <h3>Alignment</h3>
            <table style={{marginLeft:"auto", marginRight:"auto"}}>
                <tbody>
                    <tr>
                        {align}
                    </tr>
                </tbody>
            </table>
            <div style={{height:100}}>
            <br/><br/>
            <h3 style={{display:"inline"}}>Score</h3>
            <Card variant="outlined" style={{width:60 , height:100 , display:"inline", marginLeft:10 , backgroundColor:"#e5e6e7"}}>
                <CardContent style={{display:"inline"}}>
                    <Typography style={{display:"inline"}}>
                        {score}
                    </Typography>
                </CardContent>
            </Card>
            </div>
        </Box>

    )
}
