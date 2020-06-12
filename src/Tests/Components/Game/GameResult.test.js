import React from 'react';
React.useLayoutEffect = React.useEffect;
import {mount} from 'enzyme';
import {findByAttr} from '../../helper';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import GameResult from '../../../Components/GameSection/GameResult';

const mockStore = configureStore();

describe('GameResult Component', () => {
    const store = mockStore({genomeType: 'DNA'});
    const testProp1 = { // trailing gaps('e') in seqA
        aligns: {
            alignA: 'AACG---TC-AGeee',
            alignB: 'AA-GCAA-GTACCTG',
            identity: 0.334,
            match: 5,
            mismatch: -1,
            gap: -1,
        },
    };
    const wrapper = mount(<Provider store={store}>
        <GameResult {...testProp1}></GameResult></Provider>);

    it('should calculate and display score correctly', ()=>{
        const score = findByAttr(wrapper, 'testid',
            'score');
        expect(score.prop('value')).toEqual(9);
    });

    it('should calculate and display Matchscore correctly', ()=>{
        const score = findByAttr(wrapper, 'testid',
            'matchSc');
        expect(score.prop('value')).toEqual(20);
    });

    it('should calculate and display Mismatch penalty correctly', ()=>{
        const score = findByAttr(wrapper, 'testid',
            'mismatchSc');
        expect(score.prop('value')).toEqual(-2);
    });

    it('should calculate and display Gap penalty correctly', ()=>{
        const score = findByAttr(wrapper, 'testid',
            'gapSc');
        expect(score.prop('value')).toEqual(-9);
    });
});
