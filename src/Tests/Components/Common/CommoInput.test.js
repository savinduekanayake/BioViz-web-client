/* eslint-disable no-undef */
import React from 'react';
React.useLayoutEffect = React.useEffect;
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {mount} from 'enzyme';
import {findByAttr} from '../../helper';
import CommonInput from '../../../Components/CommonInput/CommonInput';

const mockStore = configureStore();

describe('Common Input', () => {
    const store = mockStore({/* any required initial state */ });
    const testProps1 = {
        title: 'some title',
        MSAkey: 0,
        value: 'AGCATC',
        type: 'MSA',
    };
    const testProps2 = {
        title: 'kjbkjb',
        MSAkey: 0,
        value: 'AGCATC',
    };

    it('Renders as MSA input', () => {
        const wrapper = mount(
            <Provider store={store}><CommonInput {...testProps1} /></Provider>,
        );
        const closeButton = findByAttr(wrapper,
            'testid',
            'MSASeqCloseButton').hostNodes();
        expect(closeButton.length).toBe(1);
    });

    it('Renders as non MSA input', () => {
        const wrapper = mount(
            <Provider store={store}>
                <CommonInput {...testProps2} />
            </Provider>,
        );
        //   console.log(wrapper.debug());
        const closeButton = findByAttr(wrapper,
            'testid',
            'MSASeqCloseButton').hostNodes();
        expect(closeButton.length).toBe(0);
    });
});


