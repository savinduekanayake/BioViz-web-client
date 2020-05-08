/* eslint-disable max-len */
/* eslint-disable no-undef */
import React from 'react';
React.useLayoutEffect = React.useEffect;
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {mount} from 'enzyme';
import {findByAttr} from '../../helper';


import Game from '../../../Components/HomeSection/Game';


const mockStore = configureStore();

describe('Testing the Services component', () => {
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

    it('render the insde components(CheckBox) in Game component', () => {
        expect(wrapper).toBeTruthy();

        const CheckBoxComponent = findByAttr(wrapper,
            'testid',
            'checkBoxId').hostNodes();
        expect(CheckBoxComponent.length).toBe(2);
    });

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
});
