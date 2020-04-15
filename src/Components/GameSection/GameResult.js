import React from 'react'
import Container from '@material-ui/core/Container'
import { CssBaseline, Typography, CardContent } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import Base from './Base';

export default function GameResult() {

    const alignment = 'GACATCTA-T-AG-A--ATACGAATATACGATA';
    const row = [];
    for (let i = 0; i < alignment.length; i++) {
        const index = i;
        const base = alignment.charAt(i) === '-' || alignment.charAt(i) === 'g' ? 'ga' : alignment.charAt(i);
        row.push({base:<Base index={index} base={base}/>, id:index});
    }

    const align = row.map(ele => <td key={ele.id}>{ele.base}</td>);

    return (
        <div>
            <div style={{backgroundColor:"#d9dee1" , height:"300px" , borderRadius:"10px"}}>
                <br/>
            <h3>Result</h3>
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
                        150
                    </Typography>
                </CardContent>
            </Card>
            </div>
            </div>
            {/* <React.Fragment>
                <CssBaseline />
                <Container maxWidth="lg" disableGutters="true">
                    <Typography component="div" style={{ backgroundColor: '#b3c1cc', height: '40vh' , borderRadius:'0.5' }}>
                    <h3>Resultwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww</h3>
                    </Typography>
                </Container>
            </React.Fragment> */}
        </div>
    )
}
