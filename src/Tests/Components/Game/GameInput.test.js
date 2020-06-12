import React from 'react';
React.useLayoutEffect = React.useEffect;
import {mount} from 'enzyme';
import {findByAttr} from '../../helper';
import GameInput from '../../../Components/GameSection/GameInput';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();

describe('GameInput Component', () => {
    const store = mockStore({GameSeqA: 'AAACCGT', GameSeqB: 'AGTCCGT',
    genomeType: 'DNA'});
    const wrapper = mount(<Provider store={store}>
        <GameInput></GameInput></Provider>);

    it('should display fileupload', ()=>{
        const file = findByAttr(wrapper, 'testid', 'file1');
        expect(file.length).toBe(1);
    });
});
