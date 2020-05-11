import React from 'react';
React.useLayoutEffect = React.useEffect;
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {createStore} from 'redux';

import {mount} from 'enzyme';
import AlgoSelector from '../../../Components/PairAlign/AlgoSelector';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import {setPAlgo} from '../../../Redux/Actions/PairAlign';
import allReducers from '../../../Redux/Reducers';

const mockStore = configureStore();

describe('PairAlign algorithm selector', () => {
    let store;
    let trueStore;

    beforeEach(() => {
        store = mockStore({pAlgo: 'GLOBAL'});
        trueStore = createStore(allReducers);
    });

    it('initially renders with global algorithm selected ', () => {
        const wrapper = mount(
            <Provider store={store}><AlgoSelector /></Provider>,
        );
        const algoSelector = wrapper.find(RadioGroup);
        expect(algoSelector.length).toBe(1);
        expect(algoSelector.last().props().value).toBe('GLOBAL');
        const radioLabels = wrapper.find(FormControlLabel);
        expect(radioLabels.length).toBe(2);
        const radioButtons = wrapper.find(Radio);
        expect(radioButtons.length).toBe(2);
    });

    test('changing radio button invokes redux action', () => {
        const wrapper = mount(
            <Provider store={store}><AlgoSelector /></Provider>,
        );
        const algoSelector = wrapper.find(RadioGroup);

        algoSelector.last().prop('onChange')({target: {name: 'algorithm', value: 'LOCAL'}});
        expect(store.getActions().length).toBe(1);
        expect((store.getActions()[0])).toMatchObject(setPAlgo('LOCAL'));
        algoSelector.last().prop('onChange')({target: {name: 'algorithm', value: 'GLOBAL'}});
        expect(store.getActions().length).toBe(2);
        expect((store.getActions()[1])).toMatchObject(setPAlgo('GLOBAL'));
    });

    test('active radio button changes on state change', async () => {
        let wrapper = mount(
            <Provider store={trueStore}><AlgoSelector /></Provider>,
        );
        let algoSelector = wrapper.find(RadioGroup);

        algoSelector.last().prop('onChange')({target: {name: 'algorithm', value: 'LOCAL'}});
        wrapper = await wrapper.update();
        algoSelector = wrapper.find(RadioGroup);
        expect(algoSelector.last().props().value).toBe('LOCAL');


        algoSelector.last().prop('onChange')({target: {name: 'algorithm', value: 'GLOBAL'}});
        wrapper = await wrapper.update();
        algoSelector = wrapper.find(RadioGroup);
        expect(algoSelector.last().props().value).toBe('GLOBAL');

        algoSelector.last().prop('onChange')({target: {name: 'algorithm', value: 'GLOBAL'}});
        wrapper =await wrapper.update();
        algoSelector = wrapper.find(RadioGroup);
        expect(algoSelector.last().props().value).toBe('GLOBAL');

        algoSelector.last().prop('onChange')({target: {name: 'algorithm', value: 'LOCAL'}});
        wrapper = await wrapper.update();
        algoSelector = wrapper.find(RadioGroup);
        expect(algoSelector.last().props().value).toBe('LOCAL');
    });
});
