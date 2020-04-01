import React from 'react';
import PropTypes from 'prop-types';
import FileUpload from '../CommonInput/FileUpload';
import TextInput from '../CommonInput/TextInput';

export default function CommonInput(props) {
    return (
        <div>
            <h3>{props.title}</h3>
            <FileUpload inputHandler={props.inputHandler} MSAkey={props.MSAkey}
                value={props.value} type={props.type} />
            <TextInput inputHandler={props.inputHandler} MSAkey={props.MSAkey}
                value={props.value} type={props.type} />
        </div>
    );
}

CommonInput.propTypes = {
    inputHandler: PropTypes.func,
    title: PropTypes.string,
    MSAkey: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.string,
};
