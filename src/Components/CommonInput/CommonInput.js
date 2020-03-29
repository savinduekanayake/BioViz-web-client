import React from 'react'
import FileUpload from '../CommonInput/FileUpload'
import TextInput from '../CommonInput/TextInput'

export default function CommonInput(props) {
    return (
        <div>
            <FileUpload inputHandler = {props.inputHandler}/>
            <TextInput inputHandler = {props.inputHandler} inputSelector = {props.inputSelector}/>
        </div>
    )
}
