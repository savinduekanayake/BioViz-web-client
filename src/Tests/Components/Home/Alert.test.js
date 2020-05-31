/* eslint-disable no-undef */
import React from 'react';
React.useLayoutEffect = React.useEffect;
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {mount} from 'enzyme';
import {findByAttr} from '../../helper';


const mockStore = configureStore();

import Alert from '../../../Components/HomeSection/Alert';

describe('Testing the Alert component', () => {
    const store = mockStore({/* any required initial state */ });

    const message = {
        title: 'Thank you',
        description: `It's helpfull to develop our system.`,
    };

    it('render Alert component with default value', () => {
        const wrapper = mount(
            <Provider store={store}><Alert /></Provider>,
        );
        expect(wrapper).toBeTruthy();
    });

    it('render Alert component with right values', () => {
        const wrapper = mount(
            <Provider store={store}><Alert {...message}/></Provider>,
        );
        expect(wrapper).toBeTruthy();
    });

    it('verify pass prop value title to Alert component', () => {
        const wrapper = mount(
            <Provider store={store}><Alert {...message} /></Provider>,
        );
        const text = wrapper.find(Alert).prop('title');
        expect(text).toBe(message.title);
    });

    it('verify pass prop value description to Alert component', () => {
        const wrapper = mount(
            <Provider store={store}><Alert {...message} /></Provider>,
        );
        const text = wrapper.find(Alert).prop('description');
        expect(text).toBe(message.description);
    });

    it(`render the insde components(Save-button) 
        in Alert component`, () => {
        const wrapper = mount(
            <Provider store={store}><Alert {...message} /></Provider>,
        );
        expect(wrapper).toBeTruthy();

        const SaveButtontComponent = findByAttr(wrapper,
            'testid',
            'saveButtonId').hostNodes();
        expect(SaveButtontComponent.length).toBe(1);
    });

    it(`render the insde components(Dialog) 
        in Alert component befor open dialog`, () => {
        const wrapper = mount(
            <Provider store={store}><Alert {...message} /></Provider>,
        );
        expect(wrapper).toBeTruthy();

        const DialogComponent = findByAttr(wrapper,
            'testid',
            'dialogId').hostNodes();
        expect(DialogComponent.length).toBe(0);
    });

    it(`render the insde components(DialogTitle) 
        in Alert component befor open dialog`, () => {
        const wrapper = mount(
            <Provider store={store}><Alert {...message} /></Provider>,
        );
        expect(wrapper).toBeTruthy();

        const DialogTitleComponent = findByAttr(wrapper,
            'testid',
            'dialogTitleId').hostNodes();
        expect(DialogTitleComponent.length).toBe(0);
    });

    it(`render the insde components(DialogContent) 
        in Alert component befor open dialog`, () => {
        const wrapper = mount(
            <Provider store={store}><Alert {...message} /></Provider>,
        );
        expect(wrapper).toBeTruthy();

        const DialogContentComponent = findByAttr(wrapper,
            'testid',
            'dialogContentId').hostNodes();
        expect(DialogContentComponent.length).toBe(0);
    });

    it(`render the insde components(Typography) 
        in Alert component befor open dialog`, () => {
        const wrapper = mount(
            <Provider store={store}><Alert {...message} /></Provider>,
        );
        expect(wrapper).toBeTruthy();

        const TypographyComponent = findByAttr(wrapper,
            'testid',
            'typographyId').hostNodes();
        expect(TypographyComponent.length).toBe(0);
    });

    it(`render the insde components(DialogActions) 
        in Alert component befor open dialog`, () => {
        const wrapper = mount(
            <Provider store={store}><Alert {...message} /></Provider>,
        );
        expect(wrapper).toBeTruthy();

        const DialogActionsComponent = findByAttr(wrapper,
            'testid',
            'dialogActionsId').hostNodes();
        expect(DialogActionsComponent.length).toBe(0);
    });

    it(`render the insde components(CloseButton) 
        in Alert component befor open dialog`, () => {
        const wrapper = mount(
            <Provider store={store}><Alert {...message} /></Provider>,
        );
        expect(wrapper).toBeTruthy();

        const CloseButtonComponent = findByAttr(wrapper,
            'testid',
            'closeButtonId').hostNodes();
        expect(CloseButtonComponent.length).toBe(0);
    });

    it(`simulate components(Save-button) 
        in Alert component`, () => {
        const wrapper = mount(
            <Provider store={store}><Alert {...message} /></Provider>,
        );
        expect(wrapper).toBeTruthy();

        const SaveButtontComponent = findByAttr(wrapper,
            'testid',
            'saveButtonId').hostNodes();
        expect(SaveButtontComponent.length).toBe(1);
        SaveButtontComponent.simulate('click');
    });

    it(`render the insde components(Dialog) 
        in Alert component after open dialog`, () => {
        const wrapper = mount(
            <Provider store={store}><Alert {...message} /></Provider>,
        );
        expect(wrapper).toBeTruthy();

        const SaveButtontComponent = findByAttr(wrapper,
            'testid',
            'saveButtonId').hostNodes();
        expect(SaveButtontComponent.length).toBe(1);
        SaveButtontComponent.simulate('click');

        const DialogComponent = findByAttr(wrapper,
            'testid',
            'dialogId').hostNodes();
        expect(DialogComponent.length).toBe(1);
    });

    it(`render the insde components(DialogTitle) 
        in Alert component after open dialog`, () => {
        const wrapper = mount(
            <Provider store={store}><Alert {...message} /></Provider>,
        );
        expect(wrapper).toBeTruthy();

        const SaveButtontComponent = findByAttr(wrapper,
            'testid',
            'saveButtonId').hostNodes();
        expect(SaveButtontComponent.length).toBe(1);
        SaveButtontComponent.simulate('click');

        const DialogTitleComponent = findByAttr(wrapper,
            'testid',
            'dialogTitleId').hostNodes();
        expect(DialogTitleComponent.length).toBe(1);
    });

    it(`render the insde components(DialogContent) 
        in Alert component after open dialog`, () => {
        const wrapper = mount(
            <Provider store={store}><Alert {...message} /></Provider>,
        );
        expect(wrapper).toBeTruthy();

        const SaveButtontComponent = findByAttr(wrapper,
            'testid',
            'saveButtonId').hostNodes();
        expect(SaveButtontComponent.length).toBe(1);
        SaveButtontComponent.simulate('click');

        const DialogContentComponent = findByAttr(wrapper,
            'testid',
            'dialogContentId').hostNodes();
        expect(DialogContentComponent.length).toBe(1);
    });

    it(`render the insde components(Typography) 
        in Alert component after open dialog`, () => {
        const wrapper = mount(
            <Provider store={store}><Alert {...message} /></Provider>,
        );
        expect(wrapper).toBeTruthy();

        const SaveButtontComponent = findByAttr(wrapper,
            'testid',
            'saveButtonId').hostNodes();
        expect(SaveButtontComponent.length).toBe(1);
        SaveButtontComponent.simulate('click');

        const TypographyComponent = findByAttr(wrapper,
            'testid',
            'typographyId').hostNodes();
        expect(TypographyComponent.length).toBe(1);
    });

    it(`render the insde components(DialogActions) 
        in Alert component after open dialog`, () => {
        const wrapper = mount(
            <Provider store={store}><Alert {...message} /></Provider>,
        );
        expect(wrapper).toBeTruthy();

        const SaveButtontComponent = findByAttr(wrapper,
            'testid',
            'saveButtonId').hostNodes();
        expect(SaveButtontComponent.length).toBe(1);
        SaveButtontComponent.simulate('click');

        const DialogActionsComponent = findByAttr(wrapper,
            'testid',
            'dialogActionsId').hostNodes();
        expect(DialogActionsComponent.length).toBe(1);
    });

    it(`render the insde components(CloseButton) 
        in Alert component after open dialog`, () => {
        const wrapper = mount(
            <Provider store={store}><Alert {...message} /></Provider>,
        );
        expect(wrapper).toBeTruthy();

        const SaveButtontComponent = findByAttr(wrapper,
            'testid',
            'saveButtonId').hostNodes();
        expect(SaveButtontComponent.length).toBe(1);
        SaveButtontComponent.simulate('click');

        const CloseButtonComponent = findByAttr(wrapper,
            'testid',
            'closeButtonId').hostNodes();
        expect(CloseButtonComponent.length).toBe(1);
    });

    it(`open the dialog box and close the dialog box`, () => {
    const wrapper = mount(
        <Provider store={store}><Alert {...message} /></Provider>,
    );
    expect(wrapper).toBeTruthy();

    const SaveButtontComponent = findByAttr(wrapper,
        'testid',
        'saveButtonId').hostNodes();
    expect(SaveButtontComponent.length).toBe(1);
    SaveButtontComponent.simulate('click');

    const CloseButtonComponent = findByAttr(wrapper,
        'testid',
        'closeButtonId').hostNodes();
    expect(CloseButtonComponent.length).toBe(1);
    CloseButtonComponent.simulate('click');
});
});
