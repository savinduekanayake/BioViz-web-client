/* eslint-disable no-undef */
import React from 'react';
React.useLayoutEffect = React.useEffect;
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {mount} from 'enzyme';
import {findByAttr} from '../../helper';


import Game from '../../../Components/HomeSection/Game';
import Alert from '../../../Components/HomeSection/Alert';


const mockStore = configureStore();

describe('Testing the Game component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(
            <Provider store={store}><Game /></Provider>,
        );
    });

    afterEach(() => {
        wrapper.unmount();
    });

    const store = mockStore({/* any required initial state */ });

    it('check render Game component', () => {
        expect(wrapper).toBeTruthy();
    });

    it('render the insde components(Card) in Game component', () => {
        expect(wrapper).toBeTruthy();

        const CardComponent = findByAttr(wrapper,
            'testid',
            'cardId').hostNodes();
        expect(CardComponent.length).toBe(2);
    });

    it('render the insde components(CardHeader) in Game component', () => {
        expect(wrapper).toBeTruthy();

        const CardHeaderComponent = findByAttr(wrapper,
            'testid',
            'cardHeaderId').hostNodes();
        expect(CardHeaderComponent.length).toBe(2);
    });

    // it('render the insde components(CheckBox) in Game component', () => {
    //     expect(wrapper).toBeTruthy();

    //     const CheckBoxComponent = findByAttr(wrapper,
    //         'testid',
    //         'checkBoxId').hostNodes();
    //     expect(CheckBoxComponent.length).toBe(2);
    // });

    it('render the insde components(List) in Game component', () => {
        expect(wrapper).toBeTruthy();

        const ListComponent = findByAttr(wrapper,
            'testid',
            'listId').hostNodes();
        expect(ListComponent.length).toBe(2);
    });

    it('render the insde components(ListItem) in Game component', () => {
        expect(wrapper).toBeTruthy();

        const ListItemComponent = findByAttr(wrapper,
            'testid',
            'listItemId').hostNodes();
        expect(ListItemComponent.length).toBe(6);
    });

    it('render the insde components(ListItemIcon) in Game component', () => {
        expect(wrapper).toBeTruthy();

        const ListIteIconmComponent = findByAttr(wrapper,
            'testid',
            'listItemIconId').hostNodes();
        expect(ListIteIconmComponent.length).toBe(6);
    });

    it('render the insde components(CheckBox-inside) in Game component', () => {
        expect(wrapper).toBeTruthy();

        const CheckBoxComponent = findByAttr(wrapper,
            'testid',
            'checkBox2Id').hostNodes();
        expect(CheckBoxComponent.length).toBe(6);
    });

    it('render the insde components(Divider) in Game component', () => {
        expect(wrapper).toBeTruthy();

        const DividerComponent = findByAttr(wrapper,
            'testid',
            'dividerId').hostNodes();
        expect(DividerComponent.length).toBe(2);
    });

    it('render the insde components(Grid) in Game component', () => {
        expect(wrapper).toBeTruthy();

        const GridComponent = findByAttr(wrapper,
            'testid',
            'gridId').hostNodes();
        expect(GridComponent.length).toBe(1);
    });

    it('render the insde components(GridItem1) in Game component', () => {
        expect(wrapper).toBeTruthy();

        const GridItemComponent = findByAttr(wrapper,
            'testid',
            'gridItemId1').hostNodes();
        expect(GridItemComponent.length).toBe(1);
    });

    it('render the insde components(GridItem2) in Game component', () => {
        expect(wrapper).toBeTruthy();

        const GridItemComponent = findByAttr(wrapper,
            'testid',
            'gridItemId2').hostNodes();
        expect(GridItemComponent.length).toBe(1);
    });

    it('render the insde components(GridItem3) in Game component', () => {
        expect(wrapper).toBeTruthy();

        const GridItemComponent = findByAttr(wrapper,
            'testid',
            'gridItemId3').hostNodes();
        expect(GridItemComponent.length).toBe(1);
    });

    it('render the insde components(Grid Container) in Game component', () => {
        expect(wrapper).toBeTruthy();

        const GridContainerComponent = findByAttr(wrapper,
            'testid',
            'gridContainerId').hostNodes();
        expect(GridContainerComponent.length).toBe(1);
    });

    it('render the insde components(Button1) in Game component', () => {
        expect(wrapper).toBeTruthy();

        const ButtonComponent = findByAttr(wrapper,
            'testid',
            'buttonId1').hostNodes();
        expect(ButtonComponent.length).toBe(1);
    });

    it('render the insde components(Button3) in Game component', () => {
        expect(wrapper).toBeTruthy();

        const ButtonComponent = findByAttr(wrapper,
            'testid',
            'buttonId3').hostNodes();
        expect(ButtonComponent.length).toBe(1);
    });

    it(`try to render the insde
        components(Snackbar) in Game component`, () => {
        expect(wrapper).toBeTruthy();

        const SnackbarComponent = findByAttr(wrapper,
            'testid',
            'snackbarId').hostNodes();
        expect(SnackbarComponent.length).toBe(1);
    });

    it('try to simulate submit button', () => {
        // remember the jsdom alert
        const jsdomAlert = window.alert;
        // provide an empty implementation for window.alert
        window.alert = () => {};

        expect(wrapper).toBeTruthy();

        const SubmitButtonComponent = findByAttr(wrapper,
            'testid',
            'buttonId2').hostNodes();
        expect(SubmitButtonComponent.length).toBe(1);
        SubmitButtonComponent.simulate('click');

        window.alert = jsdomAlert; // restore the jsdom alert
    });

    // it('select a CheckBox-uper in Game component', () => {
    //     expect(wrapper).toBeTruthy();

    //     const CheckBoxComponent = findByAttr(wrapper,
    //         'testid',
    //         'checkBoxId').hostNodes();
    //     expect(CheckBoxComponent.length).toBe(2);
    //     CheckBoxComponent.at(1).simulate('click');
    // });

    it('select a CheckBox-details in Game component', () => {
        expect(wrapper).toBeTruthy();

        const CheckBoxComponent = findByAttr(wrapper,
            'testid',
            'checkBox2Id').hostNodes();
        expect(CheckBoxComponent.length).toBe(6);
        CheckBoxComponent.at(1).simulate('click');
    });

    it(`simulate components(CheckBox-inside)
        transfer left side to right side in Game component`, () => {
        expect(wrapper).toBeTruthy();

        const CheckBoxComponent = findByAttr(wrapper,
            'testid',
            'checkBox2Id').hostNodes();
        expect(CheckBoxComponent.length).toBe(6);
        CheckBoxComponent.at(1).simulate('click');

        // eslint-disable-next-line camelcase
        const ButtonComponent_TransferRight = findByAttr(wrapper,
            'testid',
            'buttonId1').hostNodes();
        expect(ButtonComponent_TransferRight.length).toBe(1);
        ButtonComponent_TransferRight.simulate('click');
    });

    it(`simulate components(CheckBox-inside)
        transfer right side to left side in Game component`, () => {
        expect(wrapper).toBeTruthy();

        const CheckBoxComponent = findByAttr(wrapper,
            'testid',
            'checkBox2Id').hostNodes();
        expect(CheckBoxComponent.length).toBe(6);
        CheckBoxComponent.at(5).simulate('click');

        // eslint-disable-next-line camelcase
        const ButtonComponent_TransferLeftt = findByAttr(wrapper,
            'testid',
            'buttonId3').hostNodes();
        expect(ButtonComponent_TransferLeftt.length).toBe(1);
        ButtonComponent_TransferLeftt.simulate('click');
    });

    it(`simulate all CheckBox transfer
        left side to right side in Game component`, () => {
        expect(wrapper).toBeTruthy();

        const CheckBoxComponent = findByAttr(wrapper,
            'testid',
            'checkBox2Id').hostNodes();
        expect(CheckBoxComponent.length).toBe(6);
        CheckBoxComponent.at(0).simulate('click');
        CheckBoxComponent.at(1).simulate('click');
        CheckBoxComponent.at(2).simulate('click');
        CheckBoxComponent.at(3).simulate('click');
        CheckBoxComponent.at(4).simulate('click');
        CheckBoxComponent.at(5).simulate('click');

        // eslint-disable-next-line camelcase
        const ButtonComponent_TransferRight = findByAttr(wrapper,
            'testid',
            'buttonId1').hostNodes();
        expect(ButtonComponent_TransferRight.length).toBe(1);
        ButtonComponent_TransferRight.simulate('click');
    });

    // it('select a CheckBox-uper in Game component', () => {
    //     expect(wrapper).toBeTruthy();

    //     const CheckBoxComponent = findByAttr(wrapper,
    //         'testid',
    //         'checkBoxId').hostNodes();
    //     expect(CheckBoxComponent.length).toBe(2);
    //     CheckBoxComponent.at(0).simulate('click');

    //     // eslint-disable-next-line camelcase
    //     const ButtonComponent_TransferRight = findByAttr(wrapper,
    //         'testid',
    //         'buttonId1').hostNodes();
    //     expect(ButtonComponent_TransferRight.length).toBe(1);
    //     ButtonComponent_TransferRight.simulate('click');
    // });

    it('simulate select and unselect', () => {
        expect(wrapper).toBeTruthy();

        const CheckBoxComponent = findByAttr(wrapper,
            'testid',
            'checkBox2Id').hostNodes();
        expect(CheckBoxComponent.length).toBe(6);
        CheckBoxComponent.at(4).simulate('click');
        CheckBoxComponent.at(4).simulate('click');
    });

    it('simulate right answer', () => {
        expect(wrapper).toBeTruthy();
        // remember the jsdom alert
        // const jsdomAlert = window.alert;
        // provide an empty implementation for window.alert
        window.alert = () => {};
        const CheckBoxComponent = findByAttr(wrapper,
            'testid',
            'checkBox2Id').hostNodes();
        expect(CheckBoxComponent.length).toBe(6);
        CheckBoxComponent.at(3).simulate('click');

        // eslint-disable-next-line camelcase
        const ButtonComponent_TransferLeft = findByAttr(wrapper,
            'testid',
            'buttonId3').hostNodes();
        expect(ButtonComponent_TransferLeft.length).toBe(1);
        ButtonComponent_TransferLeft.simulate('click');

        const SubmitButtont = findByAttr(wrapper,
            'testid',
            'buttonId2').hostNodes();
        expect(SubmitButtont.length).toBe(1);
        SubmitButtont.simulate('click');

        const alertComponent = wrapper.find(Alert);
        expect(alertComponent.length).toBe(1);

// remove the alert for now
        // window.alert = jsdomAlert; // restore the jsdom alert
    });
});
