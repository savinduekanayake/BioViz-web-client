import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import {setSimilarityMatrixName} from '../../Redux/Actions/Score';
import DNAMatrixInput from './DNAMatrixInput';


const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 250,
    },
}));

/**
 * Component to input similarity matrix type
 * @param {Object} props
 * @return {React.ReactElement}
 */
export default function SimilarityMatrixInput() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleMatrixNameChange = (event) => {
        dispatch(setSimilarityMatrixName(event.target.value));
    };
    const matrixName = useSelector((state) => state.similarityMatrixName);

    const genomeType = useSelector((state) => state.genomeType);

    // default type is telling backend to choose match score, mismatch penalty
    // as similarity scores

    const proteinMatrices = ['BLOSUM30', 'BLOSUM45',
        'BLOSUM50', 'BLOSUM60', 'BLOSUM90'];
    const menuItems = [];
    menuItems.push(<MenuItem key={'DEFAULT'}
        value={'DEFAULT'}>Default</MenuItem>);
    if (genomeType === 'DNA') {
        menuItems.push(<MenuItem key={'CUSTOM'}
            value={'CUSTOM'}>Custom</MenuItem>);
    } else if (genomeType === 'PROTEIN') {
        proteinMatrices.forEach((matrixName) => {
            menuItems.push(
                <MenuItem key={matrixName}
                    value={matrixName}>{matrixName}</MenuItem>,
            );
        });
    }
    const helperText = matrixName === 'DEFAULT' ? null :
        <> *Note that this matrix will override <br />
    above match score and mismatch penalty</>;
    return (
        <div>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="similarity-matrix-name-input-label">
                    Select Similarity Matrix Type
                </InputLabel>
                <Select
                    labelId="similarity-matrix-name-input-label"
                    id="similarity-matrix-name-input"
                    value={matrixName}
                    onChange={handleMatrixNameChange}
                    label='Select Similarity Matrix Type'
                >
                    {menuItems}
                </Select>
                <FormHelperText>{helperText}</FormHelperText>
            </FormControl>
            {/* DNA similarity matrix input is only displayed when genomeType
            is DNA and similarity matrix type is CUSTOM */}
            {genomeType === 'DNA' && matrixName === 'CUSTOM' ?
                <DNAMatrixInput /> : null}

        </div>
    );
}
