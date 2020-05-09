import React from 'react';
React.useLayoutEffect = React.useEffect;
import renderer from 'react-test-renderer';
import Base from '../../../Components/GameSection/Base';

describe('Base Component', ()=>{
    const testProp = {
        index: 4,
        base: 'G',
    };
    it('matches snapshot', ()=>{
        const tree = renderer.create(<Base {...testProp} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
