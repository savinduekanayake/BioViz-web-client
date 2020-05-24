/* eslint-disable no-undef */
import React from 'react';
React.useLayoutEffect = React.useEffect;
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {mount} from 'enzyme';
import {findByAttr} from '../../helper';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
const mockStore = configureStore();

import ViewMore from '../../../Components/HomeSection/ViewMore';

describe('Testing the ViewMore component', () => {
    const store = mockStore({/* any required initial state */ });

    const props = {
        title: 'More details..',
        description: 'Lorem ipsum dolor sit amet consectetur.',
    };

    it('render ViewMore component with default value', () => {
        const wrapper = mount(
            <Provider store={store}><ViewMore /></Provider>,
        );
        expect(wrapper).toBeTruthy();
        expect(wrapper.find('div.view').length).toEqual(1);
    });

    it('render ViewMore component correctly', () => {
        const wrapper = mount(
            <Provider store={store}><ViewMore {...props} /></Provider>,
        );
        expect(wrapper).toBeTruthy();
        const TypographyComponent = findByAttr(wrapper,
            'testid',
            'ViewMore_title').hostNodes();
        expect(wrapper.find('div.view').length).toEqual(1);
        expect(TypographyComponent.length).toBe(1);
    });

    it('verify pass prop value title to ViewMore component', () => {
        const wrapper = mount(
            <Provider store={store}><ViewMore {...props} /></Provider>,
        );
        const text = wrapper.find(ViewMore).prop('title');
        expect(text).toBe(props.title);
    });

    it('verify pass prop value description to ViewMore component', () => {
        const wrapper = mount(
            <Provider store={store}><ViewMore {...props} /></Provider>,
        );
        const text = wrapper.find(ViewMore).prop('description');
        expect(text).toBe(props.description);
    });

    it('render title', () => {
        const wrapper = mount(
            <Provider store={store}><ViewMore {...props} /></Provider>,
        );
        const text = wrapper.find('div.MuiExpansionPanelSummary-content p');
        expect(text.text()).toBe(props.title);
    });

      it('should show hidden text when button is clicked', ()=>{
        const wrapper = mount(
            <Provider store={store}><ViewMore {...props} /></Provider>,
        );
        const expansionPanel = wrapper.find(ExpansionPanel);
        expansionPanel.simulate('click');
        const text = wrapper.find('div.MuiExpansionPanelDetails-root p');
        expect(text.text()).toBe(props.description);
      });
});

