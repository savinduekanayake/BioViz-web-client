import React from 'react'
import TextField from '@material-ui/core/TextField';
import { useSelector,useDispatch } from 'react-redux';


export default function TextInput(props) {
    const dispatch = useDispatch();
    const DNAseq = useSelector(state => state[props.inputSelector]);

    const onInputChange = (event)=>{
        dispatch(props.inputHandler(event.target.value.trim()))
    }
    console.log(DNAseq)
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
