import React from 'react';
React.useLayoutEffect = React.useEffect;
import {mount} from 'enzyme';
import {findByAttr} from '../../helper';
import GameSection from '../../../Components/GameSection/GameSection';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import GameAlign from '../../../Components/GameSection/GameAlign';

const mockStore = configureStore();

describe('GameSection Component', () => {
    describe('input-state', () => {
        it('should assign valid input to state input', () => {
            const store = mockStore({GameSeqA: 'AAACCGT', GameSeqB: 'CCAAGGT'});
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

        it('should adjust input sequences for same length', () => {
            const store = mockStore({GameSeqA: 'AAACC', GameSeqB: 'CCAAGGTTA'});
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

        it('should render error message for invalid inputs', () => {
            const store = mockStore({GameSeqA: 'AACCGQC', GameSeqB: 'CCGGTTA'});
            const wrapper = mount( <Provider store={store}>
                            <GameSection></GameSection></Provider>);
            findByAttr(wrapper, 'testid',
                        'submitBtn').hostNodes().simulate('click');
            const errMsg1 = findByAttr(wrapper, 'testid',
                        'invalidInput').hostNodes();
            expect(errMsg1.length).toBe(1);
        });

        // it('should render error message when one/two input missing', () => {
        //     const store = mockStore({GameSeqA: 'AACCGQC', GameSeqB: ''});
        //     const wrapper = mount( <Provider store={store}>
        //                     <GameSection></GameSection></Provider>);
        //     findByAttr(wrapper, 'testid',
        //                 'submitBtn').hostNodes().simulate('click');
        //     const errMsg2 = findByAttr(wrapper, 'testid',
        //                 'inputmissed').hostNodes();
        //     expect(errMsg2.length).toBe(1);
        // });

        it('should not render Game when input is not set', () => {
            const store = mockStore({});
            const wrapper = mount( <Provider store={store}>
                            <GameSection></GameSection></Provider>);
            const emptydiv = findByAttr(wrapper, 'testid',
                        'inputNotSet').hostNodes();
            expect(emptydiv.length).toBe(1);
        });
    });

    describe('alignment-state', () => {
        it('should not render GameResult when alignment is not set', ()=>{
            const store = mockStore({});
            const wrapper = mount( <Provider store={store}>
                            <GameSection></GameSection></Provider>);
            const emptydiv = findByAttr(wrapper, 'testid',
                        'alignmentNotSet').hostNodes();
            expect(emptydiv.length).toBe(1);
        });
    });
});

