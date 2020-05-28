import React from 'react';
React.useLayoutEffect = React.useEffect;
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
// import {createStore} from 'redux';

import {mount} from 'enzyme';
// import allReducers from '../../../Redux/Reducers';
import {editDNASimilarityMatrix} from '../../../Redux/Actions/Score';
import {TextField} from '@material-ui/core';
import {act} from 'react-dom/test-utils';
import DNAMatrixInput from
    '../../../Components/CommonScoreSchema/DNAMatrixInput';

const mockStore = configureStore();

describe('DNA similarity score matrix input', () => {
    const initialState = {
        'AA': 1,
        'CC': 1,
        'GG': 1,
        'TT': 1,
        'CA': -1,
        'GA': -1,
        'TA': -1,
        'GC': -1,
        'TC': -1,
        'TG': -1,
    };

    let store;

    beforeEach(() => {
        store = mockStore({DNASimilarityMatrix: initialState});
    });
    test('initially renders with default value ', () => {
        const wrapper = mount(
            <Provider store={store}>
                <DNAMatrixInput />
            </Provider>,
        );
        const inputs = wrapper.find(TextField);
        expect(inputs.length).toBe(16);
        inputs.forEach((inputElement) => {
            expect(inputElement.props().value).toBe(
                initialState[inputElement.props().id]);
        });
    });

    test('changing input fields invokes redux action', () => {
        const inputs = ['4', '1', '-1', 'asc',
            '3.2', '-2.1', '0', '-0', '2.2.2'];
        const formattedInputs = [4, 1, -1, 'asc', 3,
            -3, 0, -0, '2.2.2'];
        const wrapper = mount(
            <Provider store={store}>
                <DNAMatrixInput />
            </Provider>,
        );
        const inputFields = wrapper.find(TextField);

        inputFields.forEach((element, i) => {
            inputs.forEach((inp, j) => {
                act(() => {
                    element.prop('onChange')(
                        {target: {value: inp, id: element.props().id}},
                    );
                });
                const totalIndex = (i * inputs.length) + j;
                expect(store.getActions().length).toBe(totalIndex + 1);
                expect((store.getActions()[totalIndex])).toMatchObject(
                    editDNASimilarityMatrix(
                        element.props().id, formattedInputs[j]));
            });
        });


        // for (let i = 0; i < inputsFields.length; i++) {
        //     act(() => {
        //         numberInput.last().prop('onChange')(
        //             {target: {value: inputs[i]}},
        //         );
        //     });
        //     expect(store.getActions().length).toBe(i + 1);

        // }
    });

    // test('should display error for incorrect input', async () => {
    //     const incorrectInputs = ['-1', '-2.5', '0', '-0',
    //         '1.23.5', 'abc', '-1ee', '--2'];
    //     let wrapper = mount(
    //         <Provider store={trueStore}>
    //             <NumberInput {...initialProps} />
    //         </Provider>,
    //     );
    //     let numberInput = wrapper.find(TextField);


    //     for (let i = 0; i < incorrectInputs.length; i++) {
    //         act(() => {
    //             numberInput.last().prop('onChange')(
    //                 {target: {value: incorrectInputs[i]}},
    //             );
    //         });
    //         wrapper = await wrapper.update();
    //         numberInput = wrapper.find(TextField);
    //         expect(numberInput.last().props().error).toBe(true);
    //         expect(numberInput.last().props().helperText).toBe(
    //             initialProps.helperText);
    //     }
    // });
});
