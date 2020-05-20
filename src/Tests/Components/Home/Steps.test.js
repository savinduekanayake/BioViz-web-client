/* eslint-disable no-undef */
import React from 'react';
React.useLayoutEffect = React.useEffect;
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {mount} from 'enzyme';
import {findByAttr} from '../../helper';


// page
import Steps from '../../../Components/HomeSection/Steps';
import StepByStep from '../../../Components/HomeSection/StepByStep';

const mockStore = configureStore();

describe('Testing the Steps component', () => {
    const store = mockStore({/* any required initial state */ });
    let wrapper;

    beforeEach(() => {
        wrapper = mount(
            <Provider store={store}><Steps /></Provider>,
        );
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it('try to render all 3 Steps component', () => {
        expect(wrapper).toBeTruthy();
        const OneStepByStepComponent = wrapper.find(StepByStep);
        const isTrue = OneStepByStepComponent.length === 3;
        // because at a one time one component is only rendering
        expect(!isTrue).toBeTruthy();
    });


    it('render one Steps component', () => {
        expect(wrapper).toBeTruthy();
        const OneStepByStepComponent = wrapper.find(StepByStep);
        expect(OneStepByStepComponent.length).toEqual(1);
    });

    it('render the insde components in Steps component', () => {
        const OneStepByStepComponent = wrapper.find(StepByStep);
        expect(OneStepByStepComponent).toBeTruthy();

        const AppBarComponent = findByAttr(wrapper,
            'testid',
            'appBarId').hostNodes();
        expect(AppBarComponent.length).toBe(1);
    });

    it('render the insde components(Tabs) in Steps component', () => {
        const OneStepByStepComponent = wrapper.find(StepByStep);
        expect(OneStepByStepComponent).toBeTruthy();

        const AppBarComponent = findByAttr(wrapper,
            'testid',
            'tabsId').hostNodes();
        expect(AppBarComponent.length).toBe(1);
    });

    it('render the insde components(Tab) in Steps component', () => {
        const OneStepByStepComponent = wrapper.find(StepByStep);
        expect(OneStepByStepComponent).toBeTruthy();

        const Tab1Component = findByAttr(wrapper,
            'testid',
            'tabsId1').hostNodes();
        expect(Tab1Component.length).toBe(1);

        const Tab2Component = findByAttr(wrapper,
            'testid',
            'tabsId2').hostNodes();
        expect(Tab2Component.length).toBe(1);

        const Tab3Component = findByAttr(wrapper,
            'testid',
            'tabsId3').hostNodes();
        expect(Tab3Component.length).toBe(1);
    });

    it('render the insde components(TabPanel) in Steps component', () => {
        const OneStepByStepComponent = wrapper.find(StepByStep);
        expect(OneStepByStepComponent).toBeTruthy();

        const TabPanel1Component = findByAttr(wrapper,
            'testid',
            'tabPanelId1').hostNodes();
        expect(TabPanel1Component.length).toBe(1);

        const TabPanel2Component = findByAttr(wrapper,
            'testid',
            'tabPanelId2').hostNodes();
        expect(TabPanel2Component.length).toBe(1);

        const TabPanel3Component = findByAttr(wrapper,
            'testid',
            'tabPanelId3').hostNodes();
        expect(TabPanel3Component.length).toBe(1);
    });

    it('render the both div h2 root element in Steps component', () => {
        const OneStepByStepComponent = wrapper.find(StepByStep);
        expect(OneStepByStepComponent).toBeTruthy();

        const h2Tags = wrapper.find('div h2');
        expect(h2Tags.length).toBe(2);
    });

    it('render the both root div p element in Steps component', () => {
        const OneStepByStepComponent = wrapper.find(StepByStep);
        expect(OneStepByStepComponent).toBeTruthy();

        const pTags = wrapper.find('div p');
        expect(pTags.length).toBe(2);
    });

    it(`try to render the hiden insde 
        components(Typography) in Steps component`, () => {
        const OneStepByStepComponent = wrapper.find(StepByStep);
        expect(OneStepByStepComponent).toBeTruthy();

        const TypographyrComponent = findByAttr(wrapper,
            'testid',
            'typography2Id').hostNodes();
        expect(TypographyrComponent.length).toBe(0);
    });

    it('try to render the insde components(Box) in Steps component', () => {
        const OneStepByStepComponent = wrapper.find(StepByStep);
        expect(OneStepByStepComponent).toBeTruthy();

        const BoxComponent = findByAttr(wrapper,
            'testid',
            'boxId').hostNodes();
        expect(BoxComponent.length).toBe(1);
    });

    it('click the Tab components in Steps component', () => {
        const OneStepByStepComponent = wrapper.find(StepByStep);
        expect(OneStepByStepComponent).toBeTruthy();

        const Tab1Component = findByAttr(wrapper,
            'testid',
            'tabsId1').hostNodes();
        expect(Tab1Component.length).toBe(1);

        Tab1Component.simulate('click');
    });
});


