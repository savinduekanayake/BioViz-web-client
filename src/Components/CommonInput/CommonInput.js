import React from 'react';
import PropTypes from 'prop-types';
import FileUpload from '../CommonInput/FileUpload';
import TextInput from '../CommonInput/TextInput';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {IconButton} from '@material-ui/core';
import {useDispatch} from 'react-redux';


export default function CommonInput(props) {
    const dispatch = useDispatch();


    const onclickCancelButton = () => {
        dispatch(props.closeHandler(props.MSAkey));
    };

    const cancelButton = props.type === 'MSA' ?
        <IconButton onClick={onclickCancelButton} testid='MSASeqCloseButton'>
            <HighlightOffIcon color="error" />
        </IconButton> : '';
    return (
        <div>

            <h3>{props.title} {cancelButton}</h3>
            <FileUpload inputHandler={props.inputHandler} MSAkey={props.MSAkey}
                value={props.value} type={props.type} />
            <TextInput inputHandler={props.inputHandler} MSAkey={props.MSAkey}
                value={props.value} type={props.type} />
        </div>
    );
}

CommonInput.propTypes = {
    inputHandler: PropTypes.func,
    closeHandler: PropTypes.func,
    title: PropTypes.string,
    MSAkey: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.string,
};
