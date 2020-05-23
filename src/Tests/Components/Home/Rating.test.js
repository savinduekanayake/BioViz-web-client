/* eslint-disable no-undef */
import React from 'react';
React.useLayoutEffect = React.useEffect;
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {mount} from 'enzyme';
import {findByAttr} from '../../helper';


// page
import Rating from '../../../Components/HomeSection/Rating';

const mockStore = configureStore();

describe('Testing the Steps component', () => {
    const store = mockStore({/* any required initial state */ });
    let wrapper;

    beforeEach(() => {
        wrapper = mount(
            <Provider store={store}><Rating /></Provider>,
        );
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it('try to render rating component', () => {
        expect(wrapper).toBeTruthy();
    });

    it('render the insde components(IOSSlider) in Rating component', () => {
        expect(wrapper).toBeTruthy();

        const TooltipComponent = findByAttr(wrapper,
            'testid',
            'IOSSliderId').hostNodes();
        expect(TooltipComponent.length).toBe(1);
    });
});
