import {modeReducer} from './Mode'
import {P1Reducer,P2Reducer} from './PairAlign'
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    mode:modeReducer,
    P1:P1Reducer,
    P2:P2Reducer,
})

export default allReducers;
