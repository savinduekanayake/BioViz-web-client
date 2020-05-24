import React from 'react';
import PropTypes from 'prop-types';
import FileUpload from '../CommonInput/FileUpload';
import TextInput from '../CommonInput/TextInput';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {IconButton, Grid} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import APIinput from './APIinput';
import RangeSelector from './RangeSelector';
import NameInput from './NameInput';


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
            <div style={{marginBottom: 30}}>
                <NameInput
                nameInputHandler={props.nameInputHandler}
                MSAkey={props.MSAkey}
                type={props.type}
                sequenceName={props.sequenceName}
                />
            </div>

            <Grid
                container
                spacing={6}
                justify="center"
                alignItems="center"
            >
                <Grid item>
                    <FileUpload
                        inputHandler={props.inputHandler}
                        nameInputHandler={props.nameInputHandler}
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
            <div style={{textAlign: 'center'}}>
                <RangeSelector
                rangeInputHandler={props.rangeInputHandler}
                MSAkey={props.MSAkey}
                range={props.range}
                type={props.type}
                sequenceLength={props.value.length}
                />
            </div>


        </div>
    );
}

CommonInput.propTypes = {
    inputHandler: PropTypes.func,
    rangeInputHandler: PropTypes.func,
    nameInputHandler: PropTypes.func,
    closeHandler: PropTypes.func,
    title: PropTypes.string,
    MSAkey: PropTypes.number,
    value: PropTypes.string,
    type: PropTypes.string,
    sequenceName: PropTypes.string,
    range: PropTypes.arrayOf(PropTypes.number),
};
