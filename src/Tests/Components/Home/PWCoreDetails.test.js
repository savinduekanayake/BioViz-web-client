/* eslint-disable max-len */
/* eslint-disable no-undef */
import React from 'react';
React.useLayoutEffect = React.useEffect;
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {mount} from 'enzyme';
import {findByAttr} from '../../helper';

import PWCoreDetails from '../../../Components/HomeSection/Details/PWCoreDetails';


const mockStore = configureStore();

describe('Testing the PWCoreDetails component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(
            <Provider store={store}><PWCoreDetails /></Provider>,
        );
    });

    afterEach(() => {
        wrapper.unmount();
    });

    const store = mockStore({/* any required initial state */ });

    it('check render PairwiseDetails component correctly', () => {
        expect(wrapper).toBeTruthy();
    });

    it('render the insde components(Typography) in PWCoreDetails component', () => {
        expect(wrapper).toBeTruthy();

        const TypographyComponent = findByAttr(wrapper,
            'testid',
            'typographyHeaderId').hostNodes();
        expect(TypographyComponent.length).toBe(1);
    });
});

