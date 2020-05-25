import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import {Grid} from '@material-ui/core';
import {useDispatch} from 'react-redux';

const useStyles = makeStyles({
    root: {
        width: 300,
        marginLeft: '50%',
        marginTop: 20,

    },
    input: {
        width: 50,
    },
});

function valuetext(value) {
    return `${value}`;
}

export default function RangeSelector(props) {
    const dispatch = useDispatch();
    const classes = useStyles();
    // const [value, setValue] = React.useState([1, 1000]);
    const rangeValues = props.range;

    const handleChange = (event, newValue) => {
        if (props.type === 'MSA') {
            dispatch(props.rangeInputHandler(newValue,
                props.MSAkey));
        } else {
            dispatch(props.rangeInputHandler(newValue));
        }
    };


    const getInputHandler = (index) => {
        return (event) => {
            const val = event.target.value === '' ? '' :
                Number(event.target.value);
            const newArr = [...rangeValues];
            newArr[index] = val;
            if (props.type === 'MSA') {
                dispatch(props.rangeInputHandler(newArr,
                    props.MSAkey));
            } else {
                dispatch(props.rangeInputHandler(newArr));
            }
        };
    };

    return (
        <div className={classes.root}>
            <b>
                Select required range in the sequence
            </b>

            <Slider
                value={rangeValues}
                min={Math.min(1, props.sequenceLength)}
                max={props.sequenceLength}
                step={1}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
            />
            <Grid container spacing={5} align="center"
                justify="center"
                alignItems="center">
                <Grid item>
                    Left
                    <br />
                    <Input

                        className={classes.input}
                        value={rangeValues[0]}
                        label="Left"
                        onChange={getInputHandler(0)}
                        // onBlur={handleBlur}
                        inputProps={{
                            'min': Math.min(1, props.sequenceLength),
                            'max': props.sequenceLength,
                            'type': 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                </Grid>
                <Grid item>
                    Right
                    <br />
                    <Input

                        className={classes.input}
                        value={rangeValues[1]}
                        label="Right"
                        onChange={getInputHandler(1)}
                        // onBlur={handleBlur}
                        inputProps={{
                            'min': Math.min(1, props.sequenceLength),
                            'max': props.sequenceLength,
                            'type': 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                </Grid>
            </Grid>


        </div>
    );
}


RangeSelector.propTypes = {
    sequenceLength: PropTypes.number,
    rangeInputHandler: PropTypes.func,
    MSAkey: PropTypes.number,
    type: PropTypes.string,
    range: PropTypes.arrayOf(PropTypes.number),
};
