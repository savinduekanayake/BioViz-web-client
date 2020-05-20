/* eslint-disable no-undef */
import React from 'react';
React.useLayoutEffect = React.useEffect;
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {mount} from 'enzyme';
import {findByAttr} from '../../helper';


import DialogScreen from '../../../Components/HomeSection/DialogScreen';
import Game from '../../../Components/HomeSection/Game';

const mockStore = configureStore();

describe('Testing the DialogScreen component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(
            <Provider store={store}><DialogScreen /></Provider>,
        );
    });

    afterEach(() => {
        wrapper.unmount();
    });

    const store = mockStore({/* any required initial state */ });

    it('check render DialogScreen component', () => {
        expect(wrapper).toBeTruthy();
    });

    it('check render button inside DialogScreen component', () => {
        expect(wrapper).toBeTruthy();

        const ButtonComponent = findByAttr(wrapper,
            'testid',
            'buttonId').hostNodes();
        expect(ButtonComponent.length).toBe(1);
    });

    it(`check render AppBar inside 
        DialogScreen component before click the button`, () => {
        expect(wrapper).toBeTruthy();

        const AppBarComponent = findByAttr(wrapper,
            'testid',
            'appBarId').hostNodes();
        expect(AppBarComponent.length).toBe(0);
    });

    it(`check render Typography inside
        DialogScreen component before click the button`, () => {
        expect(wrapper).toBeTruthy();

        const TypographyComponent = findByAttr(wrapper,
            'testid',
            'typographyId').hostNodes();
        expect(TypographyComponent.length).toBe(0);
    });

    it(`check render Dialog inside 
        DialogScreen component before click the button`, () => {
        expect(wrapper).toBeTruthy();

        const DialogComponent = findByAttr(wrapper,
            'testid',
            'dialogId').hostNodes();
        expect(DialogComponent.length).toBe(0);
    });

    it(`check render Toolbar inside
        DialogScreen component before click the button`, () => {
        expect(wrapper).toBeTruthy();

        const ToolbarComponent = findByAttr(wrapper,
            'testid',
            'toolbarId').hostNodes();
        expect(ToolbarComponent.length).toBe(0);
    });

    it(`check render IconButton inside
        DialogScreen component before click the button`, () => {
        expect(wrapper).toBeTruthy();

        const IconButtonComponent = findByAttr(wrapper,
            'testid',
            'iconButtonId').hostNodes();
        expect(IconButtonComponent.length).toBe(0);
    });

    it(`check render CloseButton inside
        DialogScreen component before click the button`, () => {
        expect(wrapper).toBeTruthy();

        const TypographyComponent = findByAttr(wrapper,
            'testid',
            'InnerButtonId').hostNodes();
        expect(TypographyComponent.length).toBe(0);
    });

    it(`check render Dialog inside 
        DialogScreen component after click the button`, () => {
        expect(wrapper).toBeTruthy();

        const ButtonComponent = findByAttr(wrapper,
            'testid',
            'buttonId').hostNodes();
        expect(ButtonComponent.length).toBe(1);
        ButtonComponent.simulate('click');

        const DialogComponent = findByAttr(wrapper,
            'testid',
            'dialogId').hostNodes();
        expect(DialogComponent.length).toBe(1);
    });

    it(`check render Toolbar inside
        DialogScreen component after click the button`, () => {
        expect(wrapper).toBeTruthy();

        const ButtonComponent = findByAttr(wrapper,
            'testid',
            'buttonId').hostNodes();
        expect(ButtonComponent.length).toBe(1);
        ButtonComponent.simulate('click');

        const ToolbarComponent = findByAttr(wrapper,
            'testid',
            'toolbarId').hostNodes();
        expect(ToolbarComponent.length).toBe(1);
    });

    it(`check render AppBar inside
        DialogScreen component after click the button`, () => {
        expect(wrapper).toBeTruthy();

        const ButtonComponent = findByAttr(wrapper,
            'testid',
            'buttonId').hostNodes();
        expect(ButtonComponent.length).toBe(1);
        ButtonComponent.simulate('click');

        const AppBarComponent = findByAttr(wrapper,
            'testid',
            'appBarId').hostNodes();
        expect(AppBarComponent.length).toBe(1);
    });

    it(`check render Typography inside
        DialogScreen component after click the button`, () => {
        expect(wrapper).toBeTruthy();

        const ButtonComponent = findByAttr(wrapper,
            'testid',
            'buttonId').hostNodes();
        expect(ButtonComponent.length).toBe(1);
        ButtonComponent.simulate('click');

        const TypographyComponent = findByAttr(wrapper,
            'testid',
            'typographyId').hostNodes();
        expect(TypographyComponent.length).toBe(1);
    });

    it(`check render InnerButton inside
        DialogScreen component after click the button`, () => {
        expect(wrapper).toBeTruthy();

        const ButtonComponent = findByAttr(wrapper,
            'testid',
            'buttonId').hostNodes();
        expect(ButtonComponent.length).toBe(1);
        ButtonComponent.simulate('click');

        const TypographyComponent = findByAttr(wrapper,
            'testid',
            'InnerButtonId').hostNodes();
        expect(TypographyComponent.length).toBe(1);
    });


    it(`check render IconButton inside
        DialogScreen component after click the button`, () => {
        expect(wrapper).toBeTruthy();

        const ButtonComponent = findByAttr(wrapper,
            'testid',
            'buttonId').hostNodes();
        expect(ButtonComponent.length).toBe(1);
        ButtonComponent.simulate('click');

        const IconButtonComponent = findByAttr(wrapper,
            'testid',
            'iconButtonId').hostNodes();
        expect(IconButtonComponent.length).toBe(1);
    });

    it('Find game component', () => {
        expect(wrapper).toBeTruthy();

        const GameComponent = wrapper.find(<Game />);
        expect(GameComponent).toBeTruthy();
    });

    it('check open and close DialogScreen correctly', () => {
        expect(wrapper).toBeTruthy();

        const ButtonComponent = findByAttr(wrapper,
            'testid',
            'buttonId').hostNodes();
        expect(ButtonComponent.length).toBe(1);
        ButtonComponent.simulate('click');

        const DialogComponent1 = findByAttr(wrapper,
            'testid',
            'dialogId').hostNodes();
        expect(DialogComponent1.length).toBe(1);

        const closeButtonComponent = findByAttr(wrapper,
            'testid',
            'InnerButtonId').hostNodes();
        expect(closeButtonComponent.length).toBe(1);
        closeButtonComponent.simulate('click');

        const DialogComponent2 = findByAttr(wrapper,
            'testid',
            'buttonId').hostNodes();
        expect(DialogComponent2.length).toBe(1);
    });
});
