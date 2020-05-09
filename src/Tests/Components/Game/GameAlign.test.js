import React from 'react';
React.useLayoutEffect = React.useEffect;
import {mount} from 'enzyme';
import {findByAttr} from '../../helper';
import GameAlign from '../../../Components/GameSection/GameAlign';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();

describe('GameAlign Component', () => {
    const store = mockStore({});
    const testProp = {
        input: {
            seqA: 'A-ACGTGGCCAeee',
            seqB: 'CCGA-TG-TTCACG',
        },
    };
    const wrapper = mount(<Provider store={store}>
        <GameAlign {...testProp}></GameAlign></Provider>);

    describe('initialize Component state', () => {
        it('assign input to component state', ()=>{
            const compState = findByAttr(wrapper, 'testid',
            'checkState').hostNodes();
           expect(compState.prop('value')).toEqual(testProp.input);
        });
    });

    describe('render correct output', () => {
        it('output seq A should have elements corresponding to input seqA',
        () => {
           const optSeqA = findByAttr(wrapper, 'testid',
            'outputSeqA').hostNodes();
           expect(optSeqA.length).toBe(testProp.input.seqA.length);
       });

       it('output seq B should have elements corresponding to input seqB',
        () => {
           const optSeqB = findByAttr(wrapper, 'testid',
            'outputSeqB').hostNodes();
           expect(optSeqB.length).toBe(testProp.input.seqB.length);
       });
    });

    describe('update state accurately', () => {
        it('should add gap when click on an element in seqA', () => {
            findByAttr(wrapper, 'testid', 'A6').hostNodes().simulate('click');
                // 7th element-'G' in input seqA is clicked
            const btn = findByAttr(wrapper, 'testid', 'A6').hostNodes();
                // 7th element in the updated seqA is assigned to btn
            expect(btn.prop('label')).toEqual('-');
                // 7th element in the seqA is expected to change from 'G' to '-'
        });

        it('should remove the gap when click on a gap in seqA', () => {
            findByAttr(wrapper, 'testid', 'A1').hostNodes().simulate('click');
                // 2nd element '-' in input seqA is clicked
            const btn = findByAttr(wrapper, 'testid', 'A1').hostNodes();
                // 2nd element in the updated seqA is assigned to btn
            expect(btn.prop('label')).toEqual('A');
                // 2nd element in the seqA is expected to change
                //  from '-' to 'A'(3rd element of input seqA)
        });

        it('should add gap when click on an element in seqB', () => {
            findByAttr(wrapper, 'testid', 'B10').hostNodes().simulate('click');
                // 11th element-'C' in input seqB is clicked
            const btn = findByAttr(wrapper, 'testid', 'B10').hostNodes();
                // 11th element in the updated seqB is assigned to btn
            expect(btn.prop('label')).toEqual('-');
            // 11th element in the seqB is expected to change from 'C' to '-'
        });

        it('should remove the gap when click on a gap in seqB', () => {
            findByAttr(wrapper, 'testid', 'B4').hostNodes().simulate('click');
                // 5th element '-' in input seqB is clicked
            const btn = findByAttr(wrapper, 'testid', 'B4').hostNodes();
                // 5th element in the updated seqB is assigned to btn
            expect(btn.prop('label')).toEqual('T');
                // 5th element in the seqB is expected to change
                //  from '-' to 'T'(6th element of input seqB)
        });

        it('state should updated to initial input when reset', () => {
            findByAttr(wrapper, 'testid',
             'resetBtn').hostNodes().simulate('click');// click reset button
            const resetState = findByAttr(wrapper, 'testid',
            'checkState').hostNodes();
           expect(resetState.prop('value')).toEqual(testProp.input);
        });
    });
});
