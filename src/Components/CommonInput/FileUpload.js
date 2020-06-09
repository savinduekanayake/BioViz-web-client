import React from 'react';
import PropTypes from 'prop-types';
import {Button, Tooltip} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import {parseFASTA} from '../../util/FASTA';

/**
 * Component to upload .txt files in FASTA format
 * @param {Object} props
 * @return {React.ReactElement}
 */
export default function FileUpload(props) {
    let fileReader;
    const dispatch = useDispatch();


    const handleFileRead = async (e) => {
        const content = fileReader.result;
        // validate for FASTA format
        const parsedData = await parseFASTA(content);

        if (props.type === 'MSA') {
            dispatch(props.inputHandler(parsedData.sequence, props.MSAkey));
            dispatch(props.nameInputHandler(parsedData.description,
                props.MSAkey));
        } else {
            dispatch(props.inputHandler(parsedData.sequence));
            dispatch(props.nameInputHandler(parsedData.description));
        }
    };

    const handleError = (error) => {
        fileReader.abort();
        console.log(error);
    };

    const handleFileChosen = (file) => {
        if (file) {
            fileReader = new FileReader();
            fileReader.onerror = handleError;
            fileReader.onloadend = handleFileRead;
            const extension = file.name.split('.').pop().toLowerCase();
            // check for .txt file type
            if (extension === 'txt') {
                fileReader.readAsText(file);
            } else {
                console.log('invalid file type');
            }
        }
    };

    return <div className='upload-expense'>
        <Tooltip
            title=".txt file in single sequence FASTA format"
            interactive arrow>
            <Button variant="contained" color="primary"
                component="label" size="small">
                Upload Text File
            <input type='file'
                    id='file'
                    className='input-file'
                    accept='.txt'
                    onChange={(e) => handleFileChosen(e.target.files[0])}
                    style={{display: 'none'}}
                />
            </Button>
        </Tooltip>
    </div>;
};

// refer <CommonInput/> component for details
FileUpload.propTypes = {
    type: PropTypes.string,
    inputHandler: PropTypes.func,
    nameInputHandler: PropTypes.func,
    MSAkey: PropTypes.number,
};
