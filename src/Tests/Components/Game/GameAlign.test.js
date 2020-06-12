import React from 'react';
React.useLayoutEffect = React.useEffect;
import {mount} from 'enzyme';
import {findByAttr} from '../../helper';
import GameAlign from '../../../Components/GameSection/GameAlign';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();

describe('GameAlign Component', () => {
    const store = mockStore({genomeType: 'DNA'});
    const testProp1 = { // trailing gaps('e') in seqA
        input: {
            seqA: 'A-ACGTGGCCAeee',
            seqB: 'CCGA-TG-TTCACG',
        },
    };
    const testProp2 = { // trailing gaps('e') in seqB
        input: {
            seqA: 'A-ACGT-GGCCGGT',
            seqB: 'CCGA-TG-TTeeee',
        },
    };
    const wrapper1 = mount(<Provider store={store}>
        <GameAlign {...testProp1}></GameAlign></Provider>);
    const wrapper2 = mount(<Provider store={store}>
        <GameAlign {...testProp2}></GameAlign></Provider>);

    describe('initialize Component state', () => {
        it('assign input to component state', ()=>{
            const compState = findByAttr(wrapper1, 'testid',
            'checkState').hostNodes();
           expect(compState.prop('value')).toEqual(testProp1.input);
        });
    });

    describe('render correct output', () => {
        it('output seq A should have elements corresponding to input seqA',
        () => {
           const optSeqA = findByAttr(wrapper1, 'testid',
            'outputSeqA').hostNodes();
           expect(optSeqA.length).toBe(testProp1.input.seqA.length);
       });

       it('output seq B should have elements corresponding to input seqB',
        () => {
           const optSeqB = findByAttr(wrapper1, 'testid',
            'outputSeqB').hostNodes();
           expect(optSeqB.length).toBe(testProp1.input.seqB.length);
       });
    });

    describe('update state accurately for both type of inputs', () => {
        // types:- trailing gaps('e') in seqA , trailing gaps('e') in seqB

        it('should add gap when click on an element in seqA', () => {
            // trailing gaps('e') in seqA
            findByAttr(wrapper1, 'testid', 'A6').hostNodes().simulate('click');
                // 7th element-'G' in input seqA is clicked
            const btn1 = findByAttr(wrapper1, 'testid', 'A6').hostNodes();
                // 7th element in the updated seqA is assigned to btn
            expect(btn1.prop('label')).toEqual('-');
                // 7th element in the seqA is expected to change from 'G' to '-'

            // trailing gaps('e') in seqB
            findByAttr(wrapper2, 'testid', 'A10').hostNodes().simulate('click');
                // 11th element-'C' in input seqA is clicked
            const btn2 = findByAttr(wrapper2, 'testid', 'A10').hostNodes();
                // 11th element in the updated seqA is assigned to btn
            expect(btn2.prop('label')).toEqual('-');
            // 11th element in the seqA is expected to change from 'C' to '-'
        });

        it('should remove the gap when click on a gap in seqA', () => {
            // trailing gaps('e') in seqA
            findByAttr(wrapper1, 'testid', 'A1').hostNodes().simulate('click');
                // 2nd element '-' in input seqA is clicked
            const btn1 = findByAttr(wrapper1, 'testid', 'A1').hostNodes();
                // 2nd element in the updated seqA is assigned to btn
            expect(btn1.prop('label')).toEqual('A');
                // 2nd element in the seqA is expected to change
                //  from '-' to 'A'(3rd element of input seqA)

            // trailing gaps('e') in seqB
            findByAttr(wrapper2, 'testid', 'A6').hostNodes().simulate('click');
                // 7th element '-' in input seqA is clicked
            const btn2 = findByAttr(wrapper2, 'testid', 'A6').hostNodes();
                // 7th element in the updated seqA is assigned to btn
            expect(btn2.prop('label')).toEqual('G');
                // 7th element in the seqA is expected to change
                //  from '-' to 'G'(8rd element of input seqA)
        });

        it('should add gap when click on an element in seqB', () => {
            // trailing gaps('e') in seqA
            findByAttr(wrapper1, 'testid', 'B10').hostNodes().simulate('click');
                // 11th element-'C' in input seqB is clicked
            const btn1 = findByAttr(wrapper1, 'testid', 'B10').hostNodes();
                // 11th element in the updated seqB is assigned to btn
            expect(btn1.prop('label')).toEqual('-');
            // 11th element in the seqB is expected to change from 'C' to '-'

            // trailing gaps('e') in seqB
            findByAttr(wrapper2, 'testid', 'B9').hostNodes().simulate('click');
                // 10th element-'T' in input seqB is clicked
            const btn2 = findByAttr(wrapper2, 'testid', 'B9').hostNodes();
                // 10th element in the updated seqB is assigned to btn
            expect(btn2.prop('label')).toEqual('-');
            // 10th element in the seqB is expected to change from 'T' to '-'
        });

        it('should remove the gap when click on a gap in seqB', () => {
            // trailing gaps('e') in seqA
            findByAttr(wrapper1, 'testid', 'B4').hostNodes().simulate('click');
                // 5th element '-' in input seqB is clicked
            const btn1 = findByAttr(wrapper1, 'testid', 'B4').hostNodes();
                // 5th element in the updated seqB is assigned to btn
            expect(btn1.prop('label')).toEqual('T');
                // 5th element in the seqB is expected to change
                //  from '-' to 'T'(6th element of input seqB)

            // trailing gaps('e') in seqB
            findByAttr(wrapper2, 'testid', 'B4').hostNodes().simulate('click');
                // 5th element '-' in input seqB is clicked
            const btn2 = findByAttr(wrapper2, 'testid', 'B4').hostNodes();
                // 5th element in the updated seqB is assigned to btn
            expect(btn2.prop('label')).toEqual('T');
                // 5th element in the seqB is expected to change
                //  from '-' to 'T'(6th element of input seqB)
        });

        it('should set previous state', () => {
            const prevStateValue = {
                seqA: 'AACGT-GGCCAeeee',
                seqB: 'CCGA-TG-TT-CACG',
            };
            // state of the sequences after executing the click events
            //  in the previous test cases on the testProp1
            findByAttr(wrapper1, 'testid',
             'prevBtn').hostNodes().simulate('click');// click back button
            const currentState = findByAttr(wrapper1, 'testid',
            'checkState').hostNodes();
            expect(currentState.prop('value')).toEqual(prevStateValue);
        });

        it('should set best identity state', () => {
            const bestState = {
                seqA: 'A-ACGT-GGCCAee',
                seqB: 'CCGA-TG-TTCACG',
            };
            // state of the sequences with the best identity
            //  after executing the click events
            //  in the previous test cases on the testProp1
            findByAttr(wrapper1, 'testid', 'bestIdentityBtn').
                hostNodes().simulate('click');
                // click 'Go to a best identity state' button
            const currentState = findByAttr(wrapper1, 'testid',
            'checkState').hostNodes();
            expect(currentState.prop('value')).toEqual(bestState);
        });

        it('state should updated to initial input when reset', () => {
            findByAttr(wrapper1, 'testid',
             'resetBtn').hostNodes().simulate('click');// click reset button
            const resetState = findByAttr(wrapper1, 'testid',
            'checkState').hostNodes();
           expect(resetState.prop('value')).toEqual(testProp1.input);
        });
    });

    describe('sendAlign function', ()=>{
        it('should invoke sendAlign function with state values', () => {
            const mockfunc = jest.fn();
            const testProp = {
                input: {
                    seqA: 'A-ACGTGGCCAeee',
                    seqB: 'CCGA-TG-TTCACG',
                },
                fetchAlign: mockfunc,
            };
            const data = {
                alignA: 'A-ACGTGGCCAeee',
                alignB: 'CCGA-TG-TTCACG',
                identity: 0.14285714285714285,
            };
            const wrapper = mount(<Provider store={store}>
                <GameAlign {...testProp}></GameAlign></Provider>);
            findByAttr(wrapper, 'testid',
             'submitBtn').hostNodes().simulate('click');// click submit button
            expect(mockfunc).toBeCalledWith(data);
        });
    });
});
