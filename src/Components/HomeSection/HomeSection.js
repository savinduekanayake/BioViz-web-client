import React from 'react';
import Divider from '@material-ui/core/Divider';

//pages
import Services from './Services';
import SelectionTabs from  './SelectionTabs';
// import Feedback from './Feedback'

export default function HomeSection() {
    return (
        <div>
            <Services />
            <Divider />
            <SelectionTabs />
            {/* <Feedback /> */}
        </div>
    );
}

