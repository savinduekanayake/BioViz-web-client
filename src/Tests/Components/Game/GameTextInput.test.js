import React from 'react';
React.useLayoutEffect = React.useEffect;
import {mount} from 'enzyme';
// import {findByAttr} from '../../helper';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import GameTextInput from '../../../Components/GameSection/GameTextInput';
import {setGameInputA} from '../../../Redux/Actions/Game';
import {TextField} from '@material-ui/core';
// import {act} from 'react-dom/test-utils';
// import {fireEvent, getByTestId} from '@testing-library/react';

const mockStore = configureStore();

describe('GameTextInput Component', () => {
    const store = mockStore({});
    const testProp= {
        inputAction: setGameInputA,
        value: 'AACTTG',
    };
    const wrapper = mount(<Provider store={store}>
        <GameTextInput {...testProp}></GameTextInput></Provider>);

    it('should assign input to text field', () =>{
        expect(wrapper.find(TextField).props().value).toEqual(testProp.value);
    });

    it('should simulate onchange function', ()=>{
        const wrapper1 = mount(<Provider store={store}><GameTextInput
             {...testProp}></GameTextInput></Provider>);

            wrapper1.find(TextField).at(0).props().
            onChange({target: {value: 'GGA'}});
            // const testdiv = findByAttr(wrapper1,
            //  'testid', 'testfunc').hostNodes();
            // expect(testdiv.length).toBe(1);
    });
});
