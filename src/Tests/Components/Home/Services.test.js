/* eslint-disable no-undef */
import React from 'react';
React.useLayoutEffect = React.useEffect;
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {mount} from 'enzyme';
// import {findByAttr} from '../../helper';

import Services from '../../../Components/HomeSection/Services';
import SingleServices from '../../../Components/HomeSection/SingleService';

const mockStore = configureStore();

describe('Testing the Services component', () => {
    const store = mockStore({/* any required initial state */ });

    it('render one SingleService component', () => {
        const wrapper = mount(
            <Provider store={store}><Services /></Provider>,
        );
        expect(wrapper).toBeTruthy();
        const singleService = wrapper.find(SingleServices).at(1);
        expect(singleService.length).toBe(1);
    });

    it('render all SingleService component', () => {
        const wrapper = mount(
            <Provider store={store}><Services /></Provider>,
        );
        expect(wrapper).toBeTruthy();
        const singleService = wrapper.find(SingleServices);
        expect(singleService.length).toBe(3);
    });
});
