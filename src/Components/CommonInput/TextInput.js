import React from 'react'
import TextField from '@material-ui/core/TextField';
import { useSelector,useDispatch } from 'react-redux';


export default function TextInput(props) {
    const dispatch = useDispatch();
    
    const DNAseq = props.value
    

    const onInputChange = (event)=>{
        if(props.type==='MSA'){
            dispatch(props.inputHandler(event.target.value.trim(),props.MSAkey))
        }else{
            dispatch(props.inputHandler(event.target.value.trim().trim()))
        }
    }
    return (
        
        <div>
            <TextField
            multiline
            rowsMax={4} 
            placeholder='DNA Sequence' 
            style={{ width: '100%' }} 
            value={DNAseq}
            onChange={onInputChange}>

            </TextField>
        </div>
    )
}
