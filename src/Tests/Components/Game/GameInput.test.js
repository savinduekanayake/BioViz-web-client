import React from 'react';
React.useLayoutEffect = React.useEffect;
import {mount} from 'enzyme';
import {findByAttr} from '../../helper';
import GameInput from '../../../Components/GameSection/GameInput';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();

describe('GameAlign Component', () => {
    const store = mockStore({});
    const wrapper = mount(<Provider store={store}>
        <GameInput></GameInput></Provider>);

    // it('should not display error when error msg false', () =>{
    //     const errA = findByAttr(wrapper, 'testid', 'seq1Err');
    //     expect(errA.length).toBe(0);
    // });

    // it('should display error when error msg true', () =>{
    //     const errB = findByAttr(wrapper, 'testid', 'seq2Err');
    //     expect(errB.length).toBe(1);
    // });

    it('should display fileupload', ()=>{
        const file = findByAttr(wrapper, 'testid', 'file1');
        expect(file.length).toBe(1);
    });
});
