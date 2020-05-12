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

        it('state should updated to initial input when reset', () => {
            findByAttr(wrapper1, 'testid',
             'resetBtn').hostNodes().simulate('click');// click reset button
            const resetState = findByAttr(wrapper1, 'testid',
            'checkState').hostNodes();
           expect(resetState.prop('value')).toEqual(testProp1.input);
        });
    });
});
