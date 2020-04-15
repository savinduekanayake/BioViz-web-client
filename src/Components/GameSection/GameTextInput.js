import React from 'react'
import GameFileUpload from './GameFileUpload';
import TextField from '@material-ui/core/TextField';

export default function GameTextInput() {

     const [input , setInput] = React.useState({
        seq1:'',
        seq2:'',
    });

    function inputSeq1(event){
        setInput({
            seq1 : event.target.value,
            seq2 : input.seq2
        })
        
    }

    function inputSeq2(event){
        setInput({
            seq2 : event.target.value,
            seq1 : input.seq1
        })
    }
    return (
        <div>
            <GameFileUpload/>
            <br/>
             <TextField
                multiline
                rowsMax={4}
                placeholder='DNA Sequence'
                style={{width: '100%'}}
                value={input.seq1}
                onChange={inputSeq1} >

            </TextField>
            <br/>
            <br/>
            <GameFileUpload/>
            <br/>
            <TextField
                multiline
                rowsMax={4}
                placeholder='DNA Sequence'
                style={{width: '100%'}} 
                value={input.seq2}
                onChange={inputSeq2} >
                  
            </TextField>
        </div>
    )
}
