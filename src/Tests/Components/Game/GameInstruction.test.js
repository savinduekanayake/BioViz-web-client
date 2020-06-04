import React from 'react';
React.useLayoutEffect = React.useEffect;
import {mount} from 'enzyme';
import {findByAttr} from '../../helper';
import GameInstruction from '../../../Components/GameSection/GameInstruction';
import {Dialog} from '@material-ui/core';

describe('GameInstruction Component', () => {
    const wrapper = mount(<GameInstruction/>);

    it('should not diplay dialog when button not clicked', () =>{
        const dialog = findByAttr(wrapper, 'testid', 'dialog').hostNodes();
        expect(dialog.length).toBe(0);
    });

    it('should open with button click', () =>{
        findByAttr(wrapper, 'testid', 'openBtn').hostNodes().simulate('click');
        const btnState = wrapper.find(Dialog);
        expect(btnState.prop('open')).toEqual(true);
    });

    it('should close when ok button clicked', () =>{
        findByAttr(wrapper, 'testid', 'closeBtn').hostNodes().simulate('click');
        const btnState = wrapper.find(Dialog);
        expect(btnState.prop('open')).toEqual(false);
    });
});
