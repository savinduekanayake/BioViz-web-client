import React from 'react';
React.useLayoutEffect = React.useEffect;
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import GameTextInput from '../../../Components/GameSection/GameTextInput';
import {setGameInputA, setGameInputB} from '../../../Redux/Actions/Game';
import {TextField} from '@material-ui/core';

const mockStore = configureStore();

describe('GameTextInput Component', () => {
    const store = mockStore({});
    const testProp1= { // for input seqA
        inputAction: setGameInputA,
        value: 'AACTTG',
    };
    const testProp2= { // for input seqB
        inputAction: setGameInputB,
        value: 'AACTTG',
    };
    const wrapper = mount(<Provider store={store}>
        <GameTextInput {...testProp1}></GameTextInput></Provider>);

    it('should assign input to text field', () =>{
        expect(wrapper.find(TextField).props().value).toEqual(testProp1.value);
    });

    it('should simulate onchange function on input seqA', ()=>{
        wrapper.find(TextField).at(0).props().
        onChange({target: {value: 'AACCTTTAG'}});
    });

    it('should simulate onchange function on input seqB', ()=>{
        const wrapper2 = mount(<Provider store={store}>
            <GameTextInput {...testProp2}></GameTextInput></Provider>);
        wrapper2.find(TextField).at(0).props().
        onChange({target: {value: 'ACGGGTTAC'}});
    });
});
