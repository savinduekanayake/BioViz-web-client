import React from 'react';
import {useSelector} from 'react-redux';
import PairAlignContent from './PairAlign/PairAlignContent';
import MSAContent from './MSA/MSAContent';
import HomeSection from './HomeSection/HomeSection';
import GameSection from './GameSection/GameSection';


export default function MainContent() {
    const modeValue = useSelector((state) => state.mode);
    let content;

    switch (modeValue) {
        case 0:
            content = <HomeSection/>;
            break;
        case 1:
            content = <PairAlignContent/>;
            break;

        case 2:
            content = <MSAContent/>;
            break;

        case 3:
            content = <GameSection/>;
            break;
        default:
            content = 'Other Mode';
            break;
    }

    return (
        <div>
            {content}
        </div>
    );
}
