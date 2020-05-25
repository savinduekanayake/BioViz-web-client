import React from 'react';
React.useLayoutEffect = React.useEffect;
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {createStore} from 'redux';

import {mount} from 'enzyme';
import allReducers from '../../../Redux/Reducers';
import NumberInput from '../../../Components/CommonScoreSchema/NumberInput';
import {setMatchScore, setMisMatchPenalty} from '../../../Redux/Actions/Score';
import {TextField} from '@material-ui/core';
import {act} from 'react-dom/test-utils';

const mockStore = configureStore();

describe('Number Input - type 1', () => {
    const initialProps = {
        inputHandler: setMatchScore,
        inputSelector: 'matchScore',
        label: 'Match Score',
        helperText: 'Must be a positive integer',
        acceptedType: '1',
    };

    let store;
    let trueStore;

    beforeEach(() => {
        store = mockStore({matchScore: 1});
        trueStore = createStore(allReducers);
    });
    test('initially renders with default value ', () => {
        const wrapper = mount(
            <Provider store={store}>
                <NumberInput {...initialProps} />
            </Provider>,
        );
        const numberInput = wrapper.find(TextField);
        expect(numberInput.length).toBe(1);
        expect(numberInput.last().props().value).toBe(1);
        expect(numberInput.last().props().error).toBe(false);
        expect(numberInput.last().props().helperText).toBe('');
    });

    test('changing text field invokes redux action', () => {
        const inputs = ['4', '1', '-1', 'asc',
            '3.2', '-2.1', '0', '-0', '2.2.2'];
        const formattedInputs = [4, 1, '-1', 'asc', 3,
            '-2.1', '0', '-0', '2.2.2'];
        const wrapper = mount(
            <Provider store={store}>
                <NumberInput {...initialProps} />
            </Provider>,
        );
        const numberInput = wrapper.find(TextField);

        for (let i = 0; i < inputs.length; i++) {
            act(() => {
                numberInput.last().prop('onChange')(
                    {target: {value: inputs[i]}},
                );
            });
            expect(store.getActions().length).toBe(i + 1);
            expect((store.getActions()[i])).toMatchObject(
                setMatchScore(formattedInputs[i]));
        }
    });

    test('should display error for incorrect input', async () => {
        const incorrectInputs = ['-1', '-2.5', '0', '-0',
            '1.23.5', 'abc', '-1ee', '--2'];
        let wrapper = mount(
            <Provider store={trueStore}>
                <NumberInput {...initialProps} />
            </Provider>,
        );
        let numberInput = wrapper.find(TextField);


        for (let i = 0; i < incorrectInputs.length; i++) {
            act(() => {
                numberInput.last().prop('onChange')(
                    {target: {value: incorrectInputs[i]}},
                );
            });
            wrapper = await wrapper.update();
            numberInput = wrapper.find(TextField);
            expect(numberInput.last().props().error).toBe(true);
            expect(numberInput.last().props().helperText).toBe(
                initialProps.helperText);
        }
    });

    test('should not display error for correct input', async () => {
        const incorrectInputs = ['1', '2', '10', '1.5', '2.25'];
        let wrapper = mount(
            <Provider store={trueStore}>
                <NumberInput {...initialProps} />
            </Provider>,
        );
        let numberInput = wrapper.find(TextField);


        for (let i = 0; i < incorrectInputs.length; i++) {
            act(() => {
                numberInput.last().prop('onChange')(
                    {target: {value: incorrectInputs[i]}},
                );
            });
            wrapper = await wrapper.update();
            numberInput = wrapper.find(TextField);
            expect(numberInput.last().props().value).toBe(
                Math.floor(Number(incorrectInputs[i])));
            expect(numberInput.last().props().error).toBe(false);
            expect(numberInput.last().props().helperText).toBe('');
        }
    });
});
// -------------------------------------------------------

describe('Number Input - type -1', () => {
    const initialProps = {
        inputHandler: setMisMatchPenalty,
        inputSelector: 'mismatchPenalty',
        label: 'Mismatch Penalty',
        helperText: 'Must be a negative integer',
        acceptedType: '-1',
    };

    let store;
    let trueStore;

    beforeEach(() => {
        store = mockStore({mismatchPenalty: -1});
        trueStore = createStore(allReducers);
    });
    test('initially renders with default value ', () => {
        const wrapper = mount(
            <Provider store={store}>
                <NumberInput {...initialProps} />
            </Provider>,
        );
        const numberInput = wrapper.find(TextField);
        expect(numberInput.length).toBe(1);
        expect(numberInput.last().props().value).toBe(-1);
        expect(numberInput.last().props().error).toBe(false);
        expect(numberInput.last().props().helperText).toBe('');
    });

    test('changing text field invokes redux action', () => {
        const inputs = ['-4', '-1', '1', '2.5', 'asc',
            '-3.2', '-2.1', '0', '-0', '-2.2.2'];
        const formattedInputs = [-4, -1, '1', '2.5', 'asc',
            -4, -3, '0', '-0', '-2.2.2'];
        const wrapper = mount(
            <Provider store={store}>
                <NumberInput {...initialProps} />
            </Provider>,
        );
        const numberInput = wrapper.find(TextField);

        for (let i = 0; i < inputs.length; i++) {
            act(() => {
                numberInput.last().prop('onChange')(
                    {target: {value: inputs[i]}},
                );
            });
            expect(store.getActions().length).toBe(i + 1);
            expect((store.getActions()[i])).toMatchObject(
                setMisMatchPenalty(formattedInputs[i]));
        }
    });

    test('should display error for incorrect input', async () => {
        const incorrectInputs = ['1', '2.5', '0', '-0',
            '-1.23.5', '1.2.2', 'abc', '-1ee', '--2'];
        let wrapper = mount(
            <Provider store={trueStore}>
                <NumberInput {...initialProps} />
            </Provider>,
        );
        let numberInput = wrapper.find(TextField);


        for (let i = 0; i < incorrectInputs.length; i++) {
            act(() => {
                numberInput.last().prop('onChange')(
                    {target: {value: incorrectInputs[i]}},
                );
            });
            wrapper = await wrapper.update();
            numberInput = wrapper.find(TextField);
            expect(numberInput.last().props().error).toBe(true);
            expect(numberInput.last().props().helperText).toBe(
                initialProps.helperText);
        }
    });

    test('should not display error for correct input', async () => {
        const incorrectInputs = ['-1', '-2', '-10', '-1.5', '-2.25'];
        let wrapper = mount(
            <Provider store={trueStore}>
                <NumberInput {...initialProps} />
            </Provider>,
        );
        let numberInput = wrapper.find(TextField);


        for (let i = 0; i < incorrectInputs.length; i++) {
            act(() => {
                numberInput.last().prop('onChange')(
                    {target: {value: incorrectInputs[i]}},
                );
            });
            wrapper = await wrapper.update();
            numberInput = wrapper.find(TextField);
            expect(numberInput.last().props().value).toBe(
                Math.floor(Number(incorrectInputs[i])));
            expect(numberInput.last().props().error).toBe(false);
            expect(numberInput.last().props().helperText).toBe('');
        }
    });
});

