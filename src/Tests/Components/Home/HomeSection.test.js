/* eslint-disable no-undef */
import React from 'react';
React.useLayoutEffect = React.useEffect;
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {mount} from 'enzyme';
// import {findByAttr} from '../../helper';

import HomeSection from '../../../Components/HomeSection/HomeSection';
import Services from '../../../Components/HomeSection/Services';
import Steps from '../../../Components/HomeSection/Steps';
import DialogScreen from '../../../Components/HomeSection/DialogScreen';


const mockStore = configureStore();

describe('Testing the HomeSection component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(
            <Provider store={store}><HomeSection /></Provider>,
        );
    });

    afterEach(() => {
        wrapper.unmount();
    });

    const store = mockStore({/* any required initial state */ });

    it('check render HomeSection component', () => {
        expect(wrapper).toBeTruthy();
    });

    it('check render Services component', () => {
        expect(wrapper).toBeTruthy();
        const ServicesComponent = wrapper.find(Services);
        expect(ServicesComponent.length).toBe(1);
    });

    it('check render Steps component', () => {
        const wrapper = mount(
            <Provider store={store}><HomeSection /></Provider>,
        );
        expect(wrapper).toBeTruthy();
        const StepsComponent = wrapper.find(Steps);
        expect(StepsComponent.length).toBe(1);
    });

    it('check render DialogScreen component', () => {
        const wrapper = mount(
            <Provider store={store}><HomeSection /></Provider>,
        );
        expect(wrapper).toBeTruthy();
        const DialogScreenComponent = wrapper.find(DialogScreen);
        expect(DialogScreenComponent.length).toBe(1);
    });
});
