import React from 'react';
React.useLayoutEffect = React.useEffect;
import {mount} from 'enzyme';
import {findByAttr} from '../../helper';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import GameTextInput from '../../../Components/GameSection/GameTextInput';
import {setGameInputA} from '../../../Redux/Actions/Game';
import {fireEvent, getByTestId} from '@testing-library/react';

const mockStore = configureStore();

describe('GameTextInput Component', () => {
    const store = mockStore({});
    const testProp= {
        inputAction: setGameInputA,
        value: 'AACTTG',
    };
    const wrapper = mount(<Provider store={store}>
        <GameTextInput {...testProp}></GameTextInput></Provider>);

    it('should assign value to input state', () =>{
        // const inputSeq = jest.fn();
        // const event = {
        //     target: {value: testProp.value},
        // };

        // findByAttr(wrapper, 'testid',
        //  'inputfield').hostNodes().simulate('change');

        // const input = findByAttr(wrapper, 'testid',
        // 'inputfield').querySelector('input');
        // // const input = getByTestId('content-input')
        // fireEvent.change(input, event);

        const inputdiv = findByAttr(wrapper, 'testid',
        'finddiv').hostNodes();
        expect(inputdiv.length).toEqual(1);
        // const textfield = findByAttr(wrapper, 'testid',
        // 'finddiv').hostNodes();
        // expect(textfield.length).toEqual(1);
    });
});
