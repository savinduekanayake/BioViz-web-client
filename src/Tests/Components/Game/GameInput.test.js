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
    const testProp = {
        errMsgA: false,
        errMsgB: true,
    };
    const wrapper = mount(<Provider store={store}>
        <GameInput {...testProp}></GameInput></Provider>);

    it('should not display error when error msg false', () =>{
        const errA = findByAttr(wrapper, 'testid', 'seq1Err');
        expect(errA.length).toBe(0);
    });

    it('should display error when error msg true', () =>{
        const errB = findByAttr(wrapper, 'testid', 'seq2Err');
        expect(errB.length).toBe(1);
    });
});
