/* eslint-disable no-undef */
import React from 'react';
React.useLayoutEffect = React.useEffect;
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {mount} from 'enzyme';
import {findByAttr} from '../../helper';

import StepByStep from '../../../Components/HomeSection/StepByStep';

const mockStore = configureStore();

describe('Testing the StepByStep component', () => {
    const store = mockStore({/* any required initial state */ });

    it('render StepByStep component with default value', () => {
        const wrapper = mount(
            <Provider store={store}><StepByStep /></Provider>,
        );
        expect(wrapper).toBeTruthy();
        expect(wrapper.find('img').length).toEqual(1);
    });

    it('render PairwiseSteps component with right values', () => {
        const wrapper = mount(
            <Provider store={store}><StepByStep /></Provider>,
        );
        expect(wrapper).toBeTruthy();
        expect(wrapper.find('img').length).toEqual(1);
    });

    it('render one SingleService component', () => {
        const wrapper = mount(
            <Provider store={store}><StepByStep /></Provider>,
        );
        expect(wrapper).toBeTruthy();
        const singleService = wrapper.find(SingleServices).at(1);
        expect(singleService.length).toBe(1);
    });


    it('verify pass prop value title to SingleService component', () => {
        const wrapper = mount(
            <Provider store={store}><StepByStep {...service} /></Provider>,
        );
        const text = wrapper.find(SingleService).prop('title');
        expect(text).toBe(service.title);
    });

});


