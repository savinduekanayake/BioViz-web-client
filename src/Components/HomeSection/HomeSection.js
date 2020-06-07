import React from 'react';
import Divider from '@material-ui/core/Divider';

// import components
import Services from './Services';
import Steps from './Steps';
import Feedback from './Feedback';

/**
 * Component to visualize Home page
 * @return {React.ReactElement}
 */

export default function HomeSection() {
    return (
        <div>
            <Services />
            <Divider />
            <Steps />
            <Feedback />
        </div>
    );
}

