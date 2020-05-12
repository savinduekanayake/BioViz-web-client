import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import {Button, Typography} from '@material-ui/core';
import {fetchGenomeById} from '../../GenomeAPI/GenomeAPI';
import {useDispatch} from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

import PropTypes from 'prop-types';


export default function APIinput(props) {
    const dispatch = useDispatch();
    const [inputValue, setinputValue] = useState('ENSG00000248378');
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState(false);

    const onReceiveData = (data) => {
        setloading(false);
        if (data !== undefined) {
            if (props.type === 'MSA') {
                dispatch(props.inputHandler(data.seq.trim(),
                    props.MSAkey));
            } else {
                dispatch(props.inputHandler(data.seq.trim()));
            }


            seterror(false);
        } else {
            seterror(true);
        }
    };

    const onInputChange = (e) => {
        seterror(false);
        setinputValue(e.target.value);
    };

    const onClickSearchButton = () => {
        setloading(true);
        fetchGenomeById(inputValue, onReceiveData);
    };


    return (
        <div>
            <Grid container>
                <Grid item>
                    <TextField
                        label="Ensembl id"
                        variant="outlined"
                        value={inputValue}
                        disabled={loading}
                        error={error}
                        helperText={error ? 'Could not find id' : null}
                        onChange={onInputChange} />
                </Grid>
                <Grid item>
                    <div style={{marginLeft: 3, width: 170}}>
                        {loading ? <CircularProgress thickness={5} /> :
                            <Button onClick={onClickSearchButton}>
                                <Typography variant='button'>
                                Search in Ensembl Database
                                </Typography>

                            </Button>
                        }
                    </div>
                </Grid>
            </Grid>


        </div>
    );
}

APIinput.propTypes = {
    inputHandler: PropTypes.func,
    type: PropTypes.string,
    MSAkey: PropTypes.number,
};
