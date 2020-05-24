/* eslint-disable no-undef */
import React from 'react';
React.useLayoutEffect = React.useEffect;
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {mount} from 'enzyme';
import {findByAttr} from '../../helper';

// page
import StepByStep from '../../../Components/HomeSection/StepByStep';
import MSADetails from '../../../Components/HomeSection/Details/MSADetails';

// image
import pwImage from '../../../Components/HomeSection/assets/img/Steps/pw.png';

const mockStore = configureStore();

describe('Testing the StepByStep component', () => {
    const store = mockStore({/* any required initial state */ });

    const TestData = {
        HeadTitle: 'MSA',
        image: pwImage,
        title1: `Select the BioInformatic Alignment`,
        title2: `Enter your DNA sequences`,
        title3: `Enter your variables`,
        title4: `Click enter to results`,
        step1: `First click the menu icon. 
            Then you can see some menu items in leftside. 
            After that click 'PairAlign' to visit Pairwise Alignment.`,
        step2: `There are two inputs.
            You need to enter your two DNA sequences. 
            You can either upload ".txt" file or type the sequence.`,
        step3: `There are default values for 'match' 'mismatch' and 'gap'. 
            If you willing to change the values 
            you can enter new values for relavent variables.`,
        step4: `If you are finished the all above steps just click 
          'Enter' to get the result. This may can get few 
            secounds to visualize the result.`,
    };

    const TestDataWrong = {
        HeadTitle: 'Wrong',
        image: pwImage,
        title1: `Select the BioInformatic Alignment`,
        title2: `Enter your DNA sequences`,
        title3: `Enter your variables`,
        title4: `Click enter to results`,
        step1: `First click the menu icon. 
            Then you can see some menu items in leftside. 
            After that click 'PairAlign' to visit Pairwise Alignment.`,
        step2: `There are two inputs.
            You need to enter your two DNA sequences. 
            You can either upload ".txt" file or type the sequence.`,
        step3: `There are default values for 'match' 'mismatch' and 'gap'. 
            If you willing to change the values 
            you can enter new values for relavent variables.`,
        step4: `If you are finished the all above steps just click 
          'Enter' to get the result. This may can get few 
            secounds to visualize the result.`,
    };

    it('render StepByStep component with default value', () => {
        const wrapper = mount(
            <Provider store={store}><StepByStep /></Provider>,
        );
        expect(wrapper).toBeTruthy();
        expect(wrapper.find('img').length).toEqual(1);
    });

    it('render StepByStep component with right values', () => {
        // should to update in this function
        const wrapper = mount(
            <Provider store={store}>
                <StepByStep {...TestData} />
            </Provider>,
        );
        expect(wrapper).toBeTruthy();
        expect(wrapper.find('img').length).toEqual(1);
    });

    it('render HeadTitle', () => {
        const wrapper = mount(
            <Provider store={store}><StepByStep {...TestData} /></Provider>,
        );
        expect(wrapper).toBeTruthy();
        const text = wrapper.find('h2');
        expect(text).toBeTruthy();
        expect(text.text()).toBe(TestData.HeadTitle);
    });

    it(`verify pass prop value 
        title1,title2,title3,title4 to StepByStep component`, () => {
        const wrapper = mount(
            <Provider store={store}><StepByStep {...TestData} /></Provider>,
        );
        const text1 = wrapper.find(StepByStep).prop('title1');
        const text2 = wrapper.find(StepByStep).prop('title2');
        const text3 = wrapper.find(StepByStep).prop('title3');
        const text4 = wrapper.find(StepByStep).prop('title4');
        expect(text1).toBe(TestData.title1);
        expect(text2).toBe(TestData.title2);
        expect(text3).toBe(TestData.title3);
        expect(text4).toBe(TestData.title4);
    });

    it(`verify pass prop value 
        step1,step2,step3,step4 and HeadTitle to StepByStep component`, () => {
        const wrapper = mount(
            <Provider store={store}><StepByStep {...TestData} /></Provider>,
        );
        const headTitle = wrapper.find(StepByStep).prop('HeadTitle');
        const text1 = wrapper.find(StepByStep).prop('step1');
        const text2 = wrapper.find(StepByStep).prop('step2');
        const text3 = wrapper.find(StepByStep).prop('step3');
        const text4 = wrapper.find(StepByStep).prop('step4');
        expect(text1).toBe(TestData.step1);
        expect(text2).toBe(TestData.step2);
        expect(text3).toBe(TestData.step3);
        expect(text4).toBe(TestData.step4);
        expect(headTitle).toBe(TestData.HeadTitle);
    });

    it('verify pass prop value image to StepByStep component', () => {
        const wrapper = mount(
            <Provider store={store}><StepByStep {...TestData} /></Provider>,
        );
        const imagetUrl = wrapper.find(StepByStep).prop('image');
        expect(imagetUrl).toBe(TestData.image);
    });

    it('render MSA Detail component', () => {
        const wrapper = mount(
            <Provider store={store}>
                <StepByStep {...TestDataWrong} /></Provider>,
        );
        expect(wrapper).toBeTruthy();
        const DetailComponent = wrapper.find(<MSADetails />);
        expect(DetailComponent.length).toBe(0);
    });

    it('try to render Detail not existing component', () => {
        const wrapper = mount(
            <Provider store={store}>
                <StepByStep {...TestDataWrong} /></Provider>,
        );
        expect(wrapper).toBeTruthy();
        const DetailComponent = findByAttr(wrapper,
            'testid',
            'testPWDetails').hostNodes();
        expect(DetailComponent.length).toBe(0);
    });

    it('try to render head not existing component', () => {
        const wrapper = mount(
            <Provider store={store}>
                <StepByStep {...TestDataWrong} /></Provider>,
        );
        expect(wrapper).toBeTruthy();
        const DetailComponent = findByAttr(wrapper,
            'testid',
            'testPWDetails').hostNodes();
        expect(DetailComponent.length).toBe(0);
    });

    it('render the insde components(Stepper) in StepByStep component', () => {
        const wrapper = mount(
            <Provider store={store}><StepByStep {...TestData} /></Provider>,
        );
        expect(wrapper).toBeTruthy();

        const StepperComponent = findByAttr(wrapper,
            'testid',
            'stepperId').hostNodes();
        expect(StepperComponent.length).toBe(1);
    });

    it('render the insde components(Step) in StepByStep component', () => {
        const wrapper = mount(
            <Provider store={store}><StepByStep {...TestData} /></Provider>,
        );
        expect(wrapper).toBeTruthy();

        const StepComponent = findByAttr(wrapper,
            'testid',
            'stepId').hostNodes();
        expect(StepComponent.length).toBe(4);
    });

    it('render the insde components(StepLabel) in StepByStep component', () => {
        const wrapper = mount(
            <Provider store={store}><StepByStep {...TestData} /></Provider>,
        );
        expect(wrapper).toBeTruthy();

        const StepLabelComponent = findByAttr(wrapper,
            'testid',
            'stepLabelId').hostNodes();
        expect(StepLabelComponent.length).toBe(4);
    });

    it(`render the insde components(StepContent) 
        in StepByStep component`, () => {
        const wrapper = mount(
            <Provider store={store}><StepByStep {...TestData} /></Provider>,
        );
        expect(wrapper).toBeTruthy();

        const StepContentComponent = findByAttr(wrapper,
            'testid',
            'stepContentId').hostNodes();
        expect(StepContentComponent.length).toBe(4);
    });

    it(`render the insde components(Typography) 
        in StepByStep component`, () => {
        const wrapper = mount(
            <Provider store={store}><StepByStep {...TestData} /></Provider>,
        );
        expect(wrapper).toBeTruthy();

        const TypographyComponent = findByAttr(wrapper,
            'testid',
            'typographyId').hostNodes();
        expect(TypographyComponent.length).toBe(1);
    });

    it('render the insde components(Button) in StepByStep component', () => {
        const wrapper = mount(
            <Provider store={store}><StepByStep {...TestData} /></Provider>,
        );
        expect(wrapper).toBeTruthy();

        const ButtonComponent = findByAttr(wrapper,
            'testid',
            'nextButtonId').hostNodes();
        expect(ButtonComponent.length).toBe(1);
    });

    it(`render the insde components(Back Button) 
        in StepByStep component`, () => {
        const wrapper = mount(
            <Provider store={store}><StepByStep {...TestData} /></Provider>,
        );
        expect(wrapper).toBeTruthy();

        const ButtonComponent = findByAttr(wrapper,
            'testid',
            'backButtonId').hostNodes();
        expect(ButtonComponent.length).toBe(1);
    });

    it(`try to render the insde components(Next Button) 
        in StepByStep component`, () => {
        const wrapper = mount(
            <Provider store={store}><StepByStep {...TestData} /></Provider>,
        );
        expect(wrapper).toBeTruthy();

        const FinishButtonComponent = findByAttr(wrapper,
            'testid',
            'nextButtonId').hostNodes();
        expect(FinishButtonComponent.length).toBe(1);
    });

    it(`try to render the insde components(Final Button to other page) 
        in StepByStep component`, () => {
        const wrapper = mount(
            <Provider store={store}><StepByStep {...TestData} /></Provider>,
        );
        expect(wrapper).toBeTruthy();

        const FinishButton = findByAttr(wrapper,
            'testid',
            'finalButtonId').hostNodes();
        expect(FinishButton.length).toBe(0);
    });

    it(`try to render the insde components(Paper) 
        in StepByStep component before finish steps`, () => {
        const wrapper = mount(
            <Provider store={store}><StepByStep {...TestData} /></Provider>,
        );
        expect(wrapper).toBeTruthy();

        const PaperComponent = findByAttr(wrapper,
            'testid',
            'paperId').hostNodes();
        expect(PaperComponent.length).toBe(0);
    });

    it(`try to render the insde components(image) 
        in StepByStep component before finish steps`, () => {
        const wrapper = mount(
            <Provider store={store}><StepByStep {...TestData} /></Provider>,
        );
        expect(wrapper).toBeTruthy();

        const image = wrapper.find('img');
        expect(image.length).toBe(1);
    });

    it(`try to render the insde components(Reset Button) 
        in StepByStep component before finish steps`, () => {
        const wrapper = mount(
            <Provider store={store}><StepByStep {...TestData} /></Provider>,
        );
        expect(wrapper).toBeTruthy();

        const ResetButtonComponent = findByAttr(wrapper,
            'testid',
            'resetButtonId').hostNodes();
        expect(ResetButtonComponent.length).toBe(0);
    });

    it(`try to render the insde components(finish Typography) 
        in StepByStep component before finish steps`, () => {
        const wrapper = mount(
            <Provider store={store}><StepByStep {...TestData} /></Provider>,
        );
        expect(wrapper).toBeTruthy();

        const FinishTypographyComponent = findByAttr(wrapper,
            'testid',
            'finishTypographyId').hostNodes();
        expect(FinishTypographyComponent.length).toBe(0);
    });

    it('run the steps by simulating clicking the next button', () => {
        const wrapper = mount(
            <Provider store={store}><StepByStep {...TestData} /></Provider>,
        );
        expect(wrapper).toBeTruthy();

        const ButtonComponent1 = findByAttr(wrapper,
            'testid',
            'nextButtonId').hostNodes();
        ButtonComponent1.simulate('click');
        wrapper.unmount();
    });

    it(`run the steps by simulating clicking next button 
        then clicking the back button`, () => {
        const wrapper = mount(
            <Provider store={store}><StepByStep {...TestData} /></Provider>,
        );
        expect(wrapper).toBeTruthy();

        const ButtonComponent1 = findByAttr(wrapper,
            'testid',
            'nextButtonId').hostNodes();
        ButtonComponent1.simulate('click');

        const ButtonComponent = findByAttr(wrapper,
            'testid',
            'backButtonId').hostNodes();
        expect(ButtonComponent.length).toBe(2);
        ButtonComponent.at(1).simulate('click');
    });

    it(`run the steps by simulating clicking next button and 
        finaly clicking the reset button`, () => {
        const wrapper = mount(
            <Provider store={store}><StepByStep {...TestData} /></Provider>,
        );
        expect(wrapper).toBeTruthy();

        const ButtonComponent1 = findByAttr(wrapper,
            'testid',
            'nextButtonId').hostNodes();
        ButtonComponent1.simulate('click');

        const ButtonComponent2 = findByAttr(wrapper,
            'testid',
            'nextButtonId').hostNodes();
        ButtonComponent2.at(1).simulate('click');

        const ButtonComponent3 = findByAttr(wrapper,
            'testid',
            'nextButtonId').hostNodes();
        ButtonComponent3.at(1).simulate('click');

        const ButtonComponent4 = findByAttr(wrapper,
            'testid',
            'nextButtonId').hostNodes();
        ButtonComponent4.at(1).simulate('click');

        const ResetButtonComponent = findByAttr(wrapper,
            'testid',
            'resetButtonId').hostNodes();
        expect(ResetButtonComponent.length).toBe(1);
        ResetButtonComponent.simulate('click');
    });

    it(`run the steps by simulating clicking next button 
        and finaly clicking the Final button`, () => {
        const wrapper = mount(
            <Provider store={store}><StepByStep {...TestData} /></Provider>,
        );
        expect(wrapper).toBeTruthy();

        const ButtonComponent1 = findByAttr(wrapper,
            'testid',
            'nextButtonId').hostNodes();
        ButtonComponent1.simulate('click');

        const ButtonComponent2 = findByAttr(wrapper,
            'testid',
            'nextButtonId').hostNodes();
        ButtonComponent2.at(1).simulate('click');

        const ButtonComponent3 = findByAttr(wrapper,
            'testid',
            'nextButtonId').hostNodes();
        ButtonComponent3.at(1).simulate('click');

        const ButtonComponent4 = findByAttr(wrapper,
            'testid',
            'nextButtonId').hostNodes();
        ButtonComponent4.at(1).simulate('click');

        const ButtonComponent = findByAttr(wrapper,
            'testid',
            'finalButtonId').hostNodes();
        expect(ButtonComponent.length).toBe(1);
        ButtonComponent.simulate('click');
    });
});
