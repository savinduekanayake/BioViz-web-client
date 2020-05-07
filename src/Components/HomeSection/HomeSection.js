import React from 'react';
import Divider from '@material-ui/core/Divider';

// pages
import Services from './Services';
import Steps from './Steps';
// import Feedback from './Feedback';

import DialogScreen from './DialogScreen';
// import SingleService from './SingleService';

export default function HomeSection() {
    return (
        <div>
            <Services />
            <Divider />
            <Steps />
            {/* <Feedback /> */}
            {/* <Test /> */}
            {/* <Game /> */}
            <DialogScreen />
        </div>
    );
}

