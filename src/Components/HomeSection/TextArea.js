import React from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

export default function MinHeightTextarea() {
  return <TextareaAutosize
            aria-label="minimum height"
            rowsMin={3}
            rowsMax={6}
            minLength={20}
            placeholder=""

            />;
}
