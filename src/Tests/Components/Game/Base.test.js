import React from 'react';
React.useLayoutEffect = React.useEffect;
import renderer from 'react-test-renderer';
import Base from '../../../Components/GameSection/Base';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();

describe('Base Component', ()=>{
    const store = mockStore({genomeType: 'DNA'});
    const testProp = {
        index: 4,
        base: 'G',
    };
    it('matches snapshot', ()=>{
        const tree = renderer.create(<Provider store={store}>
            <Base {...testProp} /></Provider>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
