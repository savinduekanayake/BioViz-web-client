import React from 'react';
import PropTypes from 'prop-types';
import FileUpload from '../CommonInput/FileUpload';
import TextInput from '../CommonInput/TextInput';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {IconButton, Grid} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import APIinput from './APIinput';


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
            <Grid
                container
                spacing={6}
                justify="center"
                alignItems="center"
            >
                <Grid item>
                    <FileUpload
                        inputHandler={props.inputHandler}
                        MSAkey={props.MSAkey}

                        value={props.value}
                        type={props.type} />
                </Grid>
                <b>or</b>
                <Grid item>
                    <APIinput
                        inputHandler={props.inputHandler}
                        MSAkey={props.MSAkey}

                        type={props.type} />
                </Grid>
                <b>or</b>
                <Grid item xs={6}>
                    <TextInput
                        inputHandler={props.inputHandler}
                        MSAkey={props.MSAkey}
                        value={props.value}
                        type={props.type} />
                </Grid>
            </Grid>


        </div>
    );
}

CommonInput.propTypes = {
    inputHandler: PropTypes.func,
    closeHandler: PropTypes.func,
    title: PropTypes.string,
    MSAkey: PropTypes.number,
    value: PropTypes.string,
    type: PropTypes.string,
};
