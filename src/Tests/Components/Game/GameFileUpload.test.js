import React from 'react';
React.useLayoutEffect = React.useEffect;
import {mount} from 'enzyme';
import {findByAttr} from '../../helper';
import GameFileUpload from '../../../Components/GameSection/GameFileUpload';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {setGameInputA, setGameInputB} from '../../../Redux/Actions/Game';

const mockStore = configureStore();

describe('GameFileUplod Component', () => {
    const store = mockStore({});
    const testProp = { // trailing gaps('e') in seqA
        inputAction: setGameInputA,
    };

    const wrapper = mount(<Provider store={store}>
        <GameFileUpload {...testProp}></GameFileUpload></Provider>);

it('render upload button', ()=>{
    const btn = findByAttr(wrapper, 'testid',
    'uploadbtn').hostNodes();
   expect(btn.length).toBe(1);
});
});
