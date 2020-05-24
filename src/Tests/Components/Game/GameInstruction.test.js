import React from 'react';
React.useLayoutEffect = React.useEffect;
import {mount} from 'enzyme';
import {findByAttr} from '../../helper';
import GameInstruction from '../../../Components/GameSection/GameInstruction';

describe('GameInstruction Component', () => {
    const wrapper = mount(<GameInstruction/>);

    it('render dialog title', () =>{
        const title = findByAttr(wrapper, 'testid', 'DialogTitle').hostNodes();
        expect(title.length).toBe(0);
    });
});
