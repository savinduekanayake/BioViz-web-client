import React from 'react';
import Divider from '@material-ui/core/Divider';

// import components
import Services from './Services';
import Steps from './Steps';
import Feedback from './Feedback';
import DialogScreen from './DialogScreen';
import OutlineGame from './OutlineGame';

/**
 * Component to visualize Home page
 * @return {React.ReactElement}
 */

export default function HomeSection() {
    return (
        <div>
            <Services />
            <Divider />
            {/* <DialogScreen /> */}
            
            <Steps />
            <OutlineGame />
            <Feedback />
        </div>
    );
}

