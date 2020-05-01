import React from 'react';
React.useLayoutEffect = React.useEffect;
import renderer from 'react-test-renderer';
import GameAlignTable from '../../../Components/GameSection/GameAlignTable';

describe('GameAlignTable Component', ()=>{
    const testProp = {
        align1: ['A', 'G', 'T'],
        align2: ['C', 'G', 'A'],
        indexLine: [1, 2, 3],
    };
    it('matches snapshot', ()=>{
        const tree = renderer.create(<GameAlignTable {...testProp} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
