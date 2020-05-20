/* eslint-disable max-len */
/* eslint-disable no-undef */
import React from 'react';
React.useLayoutEffect = React.useEffect;
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {mount} from 'enzyme';
import {findByAttr} from '../../helper';


import MSADetails from '../../../Components/HomeSection/Details/MSADetails';
import MSACoreDetails from '../../../Components/HomeSection/Details/MSACoreDetails';


const mockStore = configureStore();

describe('Testing the PairwiseDetails component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(
            <Provider store={store}><MSADetails /></Provider>,
        );
    });

    afterEach(() => {
        wrapper.unmount();
    });

    const store = mockStore({/* any required initial state */ });

    it('check render MSADetails component correctly', () => {
        expect(wrapper).toBeTruthy();
    });

    it('render the insde components(ExpansionPanel) in MSADetails component', () => {
        expect(wrapper).toBeTruthy();

        const ExpansionPanel = findByAttr(wrapper,
            'testid',
            'expansionPanelId').hostNodes();
        expect(ExpansionPanel.length).toBe(1);
    });

    it('render the insde components(ExpansionPanelSummary) in MSADetails component', () => {
        expect(wrapper).toBeTruthy();

        const ExpansionPanelSummary = findByAttr(wrapper,
            'testid',
            'expansionPanelSummaryId').hostNodes();
        expect(ExpansionPanelSummary.length).toBe(1);
    });

    it('render the insde components(ExpansionPanelDetails) in MSADetails component', () => {
        expect(wrapper).toBeTruthy();

        const ExpansionPanelDetails = findByAttr(wrapper,
            'testid',
            'expansionPanelDetailsId').hostNodes();
        expect(ExpansionPanelDetails.length).toBe(1);
    });

    it('render the PWCoreDetails Component in MSADetails component', () => {
        const MSACoreDetailsComponent = wrapper.find(MSACoreDetails);
        expect(MSACoreDetailsComponent).toBeTruthy();
    });

    it('render the PWCoreDetails Component in PairwiseDetails component', () => {
        const TypographyCompponent = findByAttr(wrapper,
            'testid',
            'typographyId1').hostNodes();
        expect(TypographyCompponent.length).toBe(1);
    });

    it('render the PWCoreDetails Component in MSADetails component', () => {
        const TypographyCompponent = findByAttr(wrapper,
            'testid',
            'typographyId2').hostNodes();
        expect(TypographyCompponent.length).toBe(1);
    });

    it('render the insde components(ExpansionPanelSummary) in MSADetails component', () => {
        expect(wrapper).toBeTruthy();

        const ExpansionPanelSummary = findByAttr(wrapper,
            'testid',
            'expansionPanelSummaryId').hostNodes();
        expect(ExpansionPanelSummary.length).toBe(1);
        expect(ExpansionPanelSummary.text()).toBe('Want to know about MSA alignment? Click here');
    });

    it('simulate onChange of ExpansionPanel in MSADetails component', () => {
        expect(wrapper).toBeTruthy();

        const ExpansionPanel = findByAttr(wrapper,
            'testid',
            'expansionPanelId').hostNodes();
        expect(ExpansionPanel.length).toBe(1);
        ExpansionPanel.simulate('change');
    });
});

