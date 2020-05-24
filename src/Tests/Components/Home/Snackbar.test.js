/* eslint-disable no-undef */
import React from 'react';
React.useLayoutEffect = React.useEffect;
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {mount} from 'enzyme';
import {findByAttr} from '../../helper';


const mockStore = configureStore();

import Snackbar from '../../../Components/HomeSection/Snackbar';

describe('Testing the SingleService component', () => {
    const store = mockStore({/* any required initial state */ });

    const rigthMessage = {
        message: 'Congrats! your answer is right.',
    };

    const wrongMessage = {
        message: 'Congrats! your answer is right.',
    };

    it('render Snackbar component with default value', () => {
        const wrapper = mount(
            <Provider store={store}><Snackbar /></Provider>,
        );
        expect(wrapper).toBeTruthy();
    });

    it('render Snackbar component with right answer value', () => {
        const wrapper = mount(
            <Provider store={store}><Snackbar {...rigthMessage} /></Provider>,
        );
        expect(wrapper).toBeTruthy();
    });

    it('render Snackbar component with wrong answer value', () => {
        const wrapper = mount(
            <Provider store={store}><Snackbar {...wrongMessage} /></Provider>,
        );
        expect(wrapper).toBeTruthy();
    });

    it('verify pass prop value message to Snackbar component', () => {
        const wrapper = mount(
            <Provider store={store}><Snackbar {...rigthMessage} /></Provider>,
        );
        const text = wrapper.find(Snackbar).prop('message');
        expect(text).toBe(rigthMessage.message);
    });

    it('render SnackBar component correctly', () => {
        const wrapper = mount(
            <Provider store={store}><Snackbar {...rigthMessage} /></Provider>,
        );
        expect(wrapper).toBeTruthy();
        const SnackBarComponent = findByAttr(wrapper,
            'testid',
            'snackbarId').hostNodes();
        expect(SnackBarComponent.length).toBe(1);
    });

    it('render Button component correctly', () => {
        const wrapper = mount(
            <Provider store={store}><Snackbar {...rigthMessage} /></Provider>,
        );
        expect(wrapper).toBeTruthy();
        const ButtonComponent = findByAttr(wrapper,
            'testid',
            'buttonId').hostNodes();
        expect(ButtonComponent.length).toBe(1);
    });

    it('render IconButton component correctly', () => {
        const wrapper = mount(
            <Provider store={store}><Snackbar {...rigthMessage} /></Provider>,
        );
        expect(wrapper).toBeTruthy();
        const IconButtonComponent = findByAttr(wrapper,
            'testid',
            'iconButtonId').hostNodes();
        expect(IconButtonComponent.length).toBe(1);
    });

    it('simulate the Button by clicking', () => {
        const wrapper = mount(
            <Provider store={store}><Snackbar {...rigthMessage} /></Provider>,
        );
        expect(wrapper).toBeTruthy();
        const ButtonComponent = findByAttr(wrapper,
            'testid',
            'buttonId').hostNodes();
        expect(ButtonComponent.length).toBe(1);
        ButtonComponent.simulate('click');
    });

    it('sumulate the IconButton component by clicking', () => {
        const wrapper = mount(
            <Provider store={store}><Snackbar {...rigthMessage} /></Provider>,
        );
        expect(wrapper).toBeTruthy();
        const IconButtonComponent = findByAttr(wrapper,
            'testid',
            'iconButtonId').hostNodes();
        expect(IconButtonComponent.length).toBe(1);
        IconButtonComponent.simulate('click');
    });

    it('render SnackBar component correctly', () => {
        const wrapper = mount(
            <Provider store={store}><Snackbar {...rigthMessage} /></Provider>,
        );
        expect(wrapper).toBeTruthy();
        const SnackBarComponent = findByAttr(wrapper,
            'testid',
            'snackbarId').hostNodes();
        expect(SnackBarComponent.length).toBe(1);
        wrapper.simulate('click');
    });
});
