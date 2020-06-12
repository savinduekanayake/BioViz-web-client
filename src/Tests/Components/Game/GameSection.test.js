import React from 'react';
React.useLayoutEffect = React.useEffect;
import {mount} from 'enzyme';
import {findByAttr} from '../../helper';
import GameSection from '../../../Components/GameSection/GameSection';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import GameAlign from '../../../Components/GameSection/GameAlign';
import GameResult from '../../../Components/GameSection/GameResult';

const mockStore = configureStore();

describe('GameSection Component', () => {
    describe('input-state', () => {
        it('should assign valid input to state input', () => {
            const store = mockStore({GameSeqA: 'AAACCGT', GameSeqB: 'CCAAGGT',
                genomeType: 'DNA'});
            const wrapper = mount( <Provider store={store}>
                            <GameSection></GameSection></Provider>);
            const expectedState = {
                seqA: 'AAACCGT',
                seqB: 'CCAAGGT',
            };
            findByAttr(wrapper, 'testid',
             'submitBtn').hostNodes().simulate('click');
            const game = wrapper.find(GameAlign);
            expect(game.prop('input')).toEqual(expectedState);
        });

        it('should adjust input sequences to same length:adjust seqA', () => {
                // when seqA is short than seqB
            const store = mockStore({GameSeqA: 'AAACC', GameSeqB: 'CCAAGGTTA',
            genomeType: 'DNA'});
            const wrapper = mount( <Provider store={store}>
                            <GameSection></GameSection></Provider>);
            const expectedState = {
                seqA: 'AAACCeeee',
                seqB: 'CCAAGGTTA',
            };
            findByAttr(wrapper, 'testid',
             'submitBtn').hostNodes().simulate('click');
            const game = wrapper.find(GameAlign);
            expect(game.prop('input')).toEqual(expectedState);
        });

        it('should adjust input sequences to same length:adjust seqB', () => {
            // when seqB is short than seqA
        const store = mockStore({GameSeqA: 'AAACCGGT', GameSeqB: 'CCA',
        genomeType: 'DNA'});
        const wrapper = mount( <Provider store={store}>
                        <GameSection></GameSection></Provider>);
        const expectedState = {
            seqA: 'AAACCGGT',
            seqB: 'CCAeeeee',
        };
        findByAttr(wrapper, 'testid',
         'submitBtn').hostNodes().simulate('click');
        const game = wrapper.find(GameAlign);
        expect(game.prop('input')).toEqual(expectedState);
        });

        it('should not render Game when input is not set', () => {
            const store = mockStore({GameSeqA: 'AACCGC', GameSeqB: 'GGATTACC'});
            const wrapper = mount( <Provider store={store}>
                            <GameSection></GameSection></Provider>);
            const emptydiv = findByAttr(wrapper, 'testid',
                        'inputNotSet').hostNodes();
            expect(emptydiv.length).toBe(1);
        });
    });

    describe('alignment-state', () => {
        it('should not render GameResult when alignment is not set', ()=>{
            const store = mockStore({GameSeqA: 'AACCGC', GameSeqB: 'GGATTACC',
        });
            const wrapper = mount( <Provider store={store}>
                            <GameSection></GameSection></Provider>);
            const emptydiv = findByAttr(wrapper, 'testid',
                        'alignmentNotSet').hostNodes();
            expect(emptydiv.length).toBe(1);
        });

        it('should not set alignment-state for error score schema', ()=>{
            const store = mockStore({GameSeqA: 'AACCGC', GameSeqB: 'GGATTACC',
            genomeType: 'DNA', matchScore: 5, mismatchPenalty: -1});
                // gapPenanlty is not assigned
            const wrapper = mount( <Provider store={store}>
                            <GameSection></GameSection></Provider>);
            findByAttr(wrapper, 'testid',
             'testCallback').hostNodes().simulate('click');
            const errMsg = findByAttr(wrapper, 'testid',
                'testscore').hostNodes();
            expect(errMsg.length).toBe(1);
                //  display error msg as gapPenanlty is not assigned
        });

        it('should set alignment-state for correct score schema', ()=>{
            const store = mockStore({GameSeqA: 'AACCGC', GameSeqB: 'GGATTACC',
            genomeType: 'DNA', matchScore: 5, mismatchPenalty: -1,
            gapPenalty: -1});
            const wrapper = mount( <Provider store={store}>
                            <GameSection></GameSection></Provider>);
            const data = {
                alignA: 'AACTA',
                alignB: 'CCGAT',
                identity: 0.200,
            };
            findByAttr(wrapper, 'testid',
             'testCallback').hostNodes().simulate('click', data);
            const expectedState = {
                alignA: data.alignA,
                alignB: data.alignB,
                identity: data.identity,
                match: 5,
                mismatch: -1,
                gap: -1,
            };
            const result = wrapper.find(GameResult);
            expect(result.prop('aligns')).toEqual(expectedState);
        });
    });
});

