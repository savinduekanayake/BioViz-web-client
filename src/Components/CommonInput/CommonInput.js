import React from 'react';
import PropTypes from 'prop-types';
import FileUpload from '../CommonInput/FileUpload';
import TextInput from '../CommonInput/TextInput';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {IconButton, Grid, Tooltip, Divider} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import APIinput from './APIinput';
import RangeSelector from './RangeSelector';
import NameInput from './NameInput';

/**
 * Wrapper component to display sequence input section.
 * Contains file upload, fetching sequence from Ensembl API, text input
 * , range selector and name input for sequence.
 * @param {Object} props
 * @return {React.ReactElement}
 */
export default function CommonInput(props) {
    const dispatch = useDispatch();

    /**
     * removing the input section
     * (for MSA only)
     */
    const onclickCancelButton = () => {
        dispatch(props.closeHandler(props.MSAkey));
    };

    const cancelButton = props.type === 'MSA' ?
        <Tooltip
            title="Remove this sequence"
            interactive arrow
            placement='right'>
            <IconButton
                onClick={onclickCancelButton}
                testid='MSASeqCloseButton'>
                <HighlightOffIcon color="error" />
            </IconButton>
        </Tooltip> : '';


    return (
        <div>

            <h3>{props.title} {cancelButton}</h3>
            <Divider
            variant='fullWidth'
            style={{height: 2, color: 'black'}}/>
            <br/>
            <div style={{marginBottom: 30}}>
                {/* name input */}
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
/**
 * Since this component is reused to input several sequences in both pairalign
 * and MSA mode, dispatch functions for redux store and current value
 * fetched from redux-store should be dynamic. They are passed as props.
 * These props are passed to subsequent child components
 */

CommonInput.propTypes = {
    /**
     * functions to dispatch for each attribute change
     */
    inputHandler: PropTypes.func,
    rangeInputHandler: PropTypes.func,
    nameInputHandler: PropTypes.func,
    closeHandler: PropTypes.func,
    title: PropTypes.string,

    /**
     * identify which MSA sequence
     */
    MSAkey: PropTypes.number,
    value: PropTypes.string,

    /**
     * identify pairalign or MSA sequence
     */
    type: PropTypes.string,
    sequenceName: PropTypes.string,
    range: PropTypes.arrayOf(PropTypes.number),
};
