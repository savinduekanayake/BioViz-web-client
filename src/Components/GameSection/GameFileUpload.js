import React from 'react';
import {Button} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {parseFASTA} from '../../util/FASTA';

/**
 * Component to handle input file upload
 * @param {Object} props - props
 * @return {React.ReactElement}
 */
export default function GameFileUpload(props) {
    let fileReader;
    const dispatch = useDispatch();

    const handleFileRead = async () => {
        const content = fileReader.result;
        const parsedData =
            await parseFASTA(content);
        const sequence = parsedData.sequence.toUpperCase().trim();
        dispatch(props.inputAction(sequence));
    };

    /**
     * handle file error
     * @param {Object} error
     */
    const handleError = (error) => {
        fileReader.abort();
        console.log(error);
    };

    /**
     * read file content
     * @param {File} file - input file
     */
    const handleFileChosen = (file) => {
        if (file) {
            fileReader = new FileReader();
            fileReader.onerror = handleError;
            fileReader.onloadend = handleFileRead;
            const extension = file.name.split('.').pop().toLowerCase();
            if (extension === 'txt') {
                fileReader.readAsText(file);
            } else {
                console.log('invalid file type');
            }
        }
    };

    return (
        <div className='upload-expense'>
            <Button variant="contained" color="primary"
                component="label" size="small" testid={'uploadbtn'}>
                Upload Text File
                    <input
                    type='file'
                    id='file'
                    testid='file'
                    className='input-file'
                    accept='.txt'
                    onChange={(e) => handleFileChosen(e.target.files[0])}
                    style={{display: 'none'}} />
            </Button>
            {/* {inputErr ? <div><br />
                <span style={{color: '#ea0909'}}>invalid input</span>
            </div> : null} */}
            <button style={{display: 'none'}}
                testid={'handleErrorTest'} onClick={() => handleError()} />
        </div>
    );
}

GameFileUpload.propTypes = {
    inputAction: PropTypes.func,
};
